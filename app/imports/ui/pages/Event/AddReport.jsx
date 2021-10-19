import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import { reportDefineMethod } from '../../../api/report/ReportCollection.methods';
import UploadPhotoModal from '../../components/aws/UploadPhotoModal';
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
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddReport = () => {
  // Creating form hooks
  const [data, setData] = useState(null);
  const handleCallback = (childData) => {
    setData(childData);
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAH_N3x9evBavZrOJAb2RWdBquCoonshcE',
    libraries,
  });
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalDescription, setFinalDescription] = useState(() => '');
  // Google map
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((report) => {
    setMarkers([{ time: new Date(), lat: report.latLng.lat(), lng: report.latLng.lng() }]);
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onSubmit = () => {
    const date = new Date();
    const title = finalTitle;
    const location = finalLocation;
    const lat = markers[0].lat;
    const lng = markers[0].lng;
    const accessKey = data;
    const owner = Meteor.user()?.username;
    const description = finalDescription;
    reportDefineMethod.call({
      date, title, location,
      owner, lat, lng, accessKey, description },
    error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Report Added Successfully', 'success');
        setFinalTitle('');
        setFinalLocation('');
        setFinalDescription('');
      }
    });
  };
  return (
    <Container id="page-container">
      <h2>Report Trash/Assistance</h2>
      <Row>
        <Col>
          <Form.Label htmlFor="basic-url">Title of Your Report</Form.Label>
          <InputGroup className="mb-3">
            <FormControl placeholder='Title' value={finalTitle} onChange={e => setFinalTitle(e.target.value)} />
          </InputGroup>
        </Col>
      </Row>
      <Form.Label htmlFor="basic-url">Description of Your Report</Form.Label>
      <InputGroup className="mb-3">
        <FormControl placeholder='Description'
                     value={finalDescription} as="textarea"
                     rows={5} onChange={e => setFinalDescription(e.target.value)} />
      </InputGroup>
          <h2>Location</h2>
          <Col>
            <InputGroup className="mb-3">
              <FormControl placeholder='Address of the Trash/Needed Assistance'
                           value={finalLocation} onChange={e => setFinalLocation(e.target.value)} />
            </InputGroup>
          </Col>
          <p>Please Place a Marker For Where You Found The Trash/Needed Assistance</p>
          <Search />

      {loadError ? <div>error</div> : ''}
      { isLoaded ? <GoogleMap
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
            <h4> Location Of Trash/Needed Assistance </h4>
          </div>
        </InfoWindow>) : null }
      </GoogleMap> : <Spinner />}
      <br />
      <Row>
        <p>Please Upload a Picture of the Trash/Needed Assistance</p>
        <UploadPhotoModal parentCallback={handleCallback}/>
      </Row>
      <br />
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
    <Combobox onSelect={(address) => { console.log(address); }} >
      <ComboboxInput value={value} onChange={(e) => {
        setValue(e.target.value);
      }}
                     disable={!ready}
                     placeholder='Enter An Address'
      />
      <ComboboxPopover>
        { status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
      </ComboboxPopover>
    </Combobox>
  </div>
  );
}

export default (AddReport);
