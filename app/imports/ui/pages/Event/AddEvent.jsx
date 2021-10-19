import React, { useState } from 'react';
import Select from 'react-select';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import moment from 'moment';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { eventDefineMethod } from '../../../api/event/EventCollection.methods';
import '@reach/combobox/styles.css';
import mapStyle from '../../components/map/mapStyle';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxPopover } from '@reach/combobox';

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

const libraries = ['places'];

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddEvent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAH_N3x9evBavZrOJAb2RWdBquCoonshcE',
    libraries,
  });
  // d
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
    <Container id="page-container">
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
                     value={finalDescription} as="textarea"
                     rows={5} onChange={e => setFinalDescription(e.target.value)} />
      </InputGroup>
          <h2>Location</h2>
          <Col>
            <InputGroup className="mb-3">
              <FormControl placeholder='Address of Event'
                           value={finalLocation} onChange={e => setFinalLocation(e.target.value)} />
            </InputGroup>
          </Col>
          <p>Please Place a Marker For Where Your Event Will Be Held</p>
      <br />
      { isLoaded ?
      <div>
        <Search />
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
      </div>
      : ' '}
      <Button variant="primary" size="lg" onClick={onSubmit}>
        Submit
      </Button>
    </Container>
  );
};

function Search() {
  const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 21.500, lng: () => -158.0000 },
      radius: 200 * 1000,
    },
  });

  return (
  <div className={'search'}>
    <Combobox onSelect={async (address) => {
      try {
        const results = await getGeocode({ address });
        console.log(results[0]);
      } catch (error) {
        console.log('error!');
      }
      console.log(address);
    }
    } >
      <ComboboxInput value={value} onChange={(e) => {
        setValue(e.target.value);
      }}
                     disabled={!ready}
                     placeholder='Enter An Address'
      />
      <ComboboxPopover>
        { status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
      </ComboboxPopover>
    </Combobox>
  </div>
  );
}

export default (AddEvent);
