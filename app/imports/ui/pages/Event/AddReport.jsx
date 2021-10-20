import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import swal from 'sweetalert';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from '@reach/combobox';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { reportDefineMethod } from '../../../api/report/ReportCollection.methods';
import UploadPhotoModal from '../../components/aws/UploadPhotoModal';
import '@reach/combobox/styles.css';
import mapStyle from '../../components/map/mapStyle';
import { Users } from '../../../api/user/UserCollection';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';

const containerStyle = {
  width: '100%',
  height: '500px',
};

// const center = {
//   lat: 21.500,
//   lng: -158.0000,
// };

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const AddReport = ({ ready1, currentUser }) => {
  const [center, setCenter] = useState({ lat: 21.500, lng: -158.0000 });
  const [zoom, setZoom] = useState(10);
  const panTo = (lat, lng) => {
    setCenter({ lat: lat, lng: lng });
    setZoom(14);
  };
  const Search = () => {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 21.500, lng: () => -158.0000 },
        radius: 200 * 1000,
      },
    });

    return (
    <div className={'search'}>
      <Combobox onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo(lat, lng);
      }
      } >
        <ComboboxInput value={value} onChange={(e) => {
          setValue(e.target.value);
        }}
                       disabled={!ready}
                       placeholder='Search Location'
        />
        <ComboboxPopover>
          { status === 'OK' && data.map(({ description }) => <ComboboxOption
          key={description} value={description} />)}
        </ComboboxPopover>
      </Combobox>
    </div>
    );
  };
  // Loading Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAH_N3x9evBavZrOJAb2RWdBquCoonshcE',
    libraries,
  });
  // Google Map Hooks
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((report) => {
    setMarkers([{ time: new Date(), lat: report.latLng.lat(), lng: report.latLng.lng() }]);
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  // Image Hosting Methods
  const [data, setData] = useState(null);
  const handleCallback = (childData) => {
    setData(childData);
  };
  // Form Hooks
  const [finalTitle, setFinalTitle] = useState(() => '');
  const [finalLocation, setFinalLocation] = useState(() => '');
  const [finalDescription, setFinalDescription] = useState(() => '');
  // On Submit
  const onSubmit = () => {
    const date = new Date();
    const title = finalTitle;
    const location = finalLocation;
    const lat = markers[0].lat;
    const lng = markers[0].lng;
    const accessKey = data;
    const owner = Meteor.user()?.username;
    const description = finalDescription;
    let updateData = {};
    updateData = currentUser;
    updateData.points = currentUser.points + 3;
    if (ready1) {
      userUpdateMethod.call(updateData, (error) => (error ?
          swal('Error', error.message, 'error') :
          swal('Success', 'Data edited successfully', 'success')));
    }
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
    {loadError ? <div>error</div> : ''}
    { isLoaded ? <Search panTo={panTo}/> : ''}
    { isLoaded ? <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={zoom}
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

AddReport.propTypes = {
  currentUser: PropTypes.object,
  ready1: PropTypes.bool,
};

export default withTracker(() => {
  const username = Meteor.user()?.username;
  const ready1 = Users.subscribeUser().ready();
  const currentUser = Users.getUserDetails(username);
  console.log(currentUser);
  console.log(username);
  return {
    currentUser,
    ready1,
  };
})(AddReport);
