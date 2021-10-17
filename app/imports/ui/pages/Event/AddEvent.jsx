import React, { useState } from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import moment from 'moment';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { eventDefineMethod } from '../../../api/event/EventCollection.methods';
// import UploadPhotoModal from '../../components/aws/UploadPhotoModal';
import '@reach/combobox/styles.css';
import mapStyle from '../../components/map/mapStyle';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.500,
  lng: -158.0000,
};

const options = {
  styles: mapStyle,
};

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddEvent = () => {
  // Creating form hooks
  // const [data, setData] = useState(null);
  // const handleCallback = (childData) => {
  //   setData(childData);
  // };
  const [finalType, setFinalType] = useState(() => '');
  const [finalDate, setFinalDate] = useState(new Date());
  const [finalStartTime, setFinalStartTime] = useState('');
  const [finalEndTime, setFinalEndTime] = useState('');
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalName, setFinalName] = useState(() => '');
  const [finalEmail, setFinalEmail] = useState(() => '');
  const [finalDescription, setFinalDescription] = useState(() => '');
  const typeDropdown = [
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Cleanup', label: 'Cleanup' },
  ];
  // Google map
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((event) => {
    setMarkers([{ time: new Date(), lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onSubmit = () => {
    console.log(markers);
    const typeOfEvent = finalType.value;
    const date = finalDate;
    const startTime = moment(finalStartTime).format('hh:mm a');
    const endTime = moment(finalEndTime).format('hh:mm a');
    const title = finalTitle;
    const location = finalLocation;
    const name = finalName;
    const email = finalEmail;
    const participants = 1;
    const lat = markers[0].lat;
    const lng = markers[0].lng;
    const owner = Meteor.user().username;
    const description = finalDescription;
    eventDefineMethod.call({
      typeOfEvent, date, startTime, endTime, participants, title, location, name,
      owner, lat, lng, email, description },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event Added Successfully', 'success');
        setFinalType('');
        setFinalDate(new Date());
        setFinalStartTime('');
        setFinalEndTime('');
        setFinalTitle('');
        setFinalLocation('');
        setFinalName('');
        setFinalEmail('');
        setFinalDescription('');
      }
    });
  };
  return (
    <Container style={{ paddingBottom: '60px' }}>
      <h2>Add Event</h2>
      <Row>
        <Col>
          <Form.Label htmlFor="basic-url">Title of Your Event</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Title' value={finalTitle} onChange={e => setFinalTitle(e.target.value)} />
          </InputGroup>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Type of Event</Form.Label>
          <Select
            options={typeDropdown}
            name='type'
            isSearchable={true}
            onChange={setFinalType}
            defaultValue={finalType}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col>
            <Form.Label htmlFor="basic-url">Date of Event</Form.Label>
            <DatePicker
          name='Date of Event'
          minDate={moment().toDate()}
          selected={finalDate}
          onChange={(date) => setFinalDate(date)}
          />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>
              <Form.Label htmlFor="basic-url">Start Time</Form.Label>
              <DatePicker
              selected={finalStartTime}
              onChange={(date) => setFinalStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="h:mm aa"
              /></Col>
            <Col>
              <Form.Label htmlFor="basic-url">End Time</Form.Label>
              <DatePicker
              selected={finalEndTime}
              onChange={(date) => setFinalEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="h:mm aa"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form.Label htmlFor="basic-url">Name</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Name' value={finalName} onChange={e => setFinalName(e.target.value)} />
          </InputGroup>
        </Col>
        <Col>
          <Form.Label htmlFor="basic-url">Contact Email</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Email' value={finalEmail} onChange={e => setFinalEmail(e.target.value)} />
          </InputGroup>
        </Col>
      </Row>
      <Form.Label htmlFor="basic-url">Description of Event</Form.Label>
      <InputGroup className="mb-3">
        <FormControl placeholder='Description'
                     value={finalDescription} onChange={e => setFinalDescription(e.target.value)} />
      </InputGroup>
        <LoadScript
        googleMapsApiKey=""
        >
          <h2>Location</h2>
          <Col>
            <InputGroup className="mb-3">
              <FormControl placeholder='Address'
                           value={finalLocation} onChange={e => setFinalLocation(e.target.value)} />
            </InputGroup>
          </Col>
          <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={onMapClick}
          onLoad={onMapLoad}
          options={options}
          >
            {markers.map(marker => <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}/>)}

            {selected ? (<InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null); }}>
              <div>
                <h4> Location Of Event </h4>
              </div>
            </InfoWindow>) : null }
          </GoogleMap>
        </LoadScript>
      <br />
      <Button variant="primary" size="lg" onClick={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default (AddEvent);
