import React, { useState } from 'react';
import { Container, Spinner, CardGroup, Row, Tab, Nav, Col, Tabs, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 21.500,
  lng: -158.0000,
};

/** Renders a container containing all of the Events documents. */
const DisplayMap = ({ eventList }) => {
  const filter = eventList.map(({ lat, lng }) => ({ lat, lng }));
  const [markers, setMarkers] = useState(filter);
  console.log(markers);
  const [selected, setSelected] = useState(null);
  // const onMapClick = React.useCallback((event) => {
  //   setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  // }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  return (
  <Container className='py-sm-3'>
    <LoadScript
    googleMapsApiKey=""
    >
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
      >
        {markers.map(marker => <Marker
        key={marker.lat + marker.lng}
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
  </Container>
  );
};

/** Require an array of Event documents in the props. */
DisplayMap.propTypes = {
  eventList: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default DisplayMap;
