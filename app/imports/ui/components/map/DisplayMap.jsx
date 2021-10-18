import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import mapStyle from './mapStyle';
import EventItem from '../event/EventItem';
import ReportItem from '../report/ReportItem';

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

/** Renders a container containing all of the Events documents. */
const DisplayMap = ({ eventList, userEvents, reports }) => {
  const cleanUps = eventList.filter(event => event.typeOfEvent === 'Cleanup');
  const workshops = eventList.filter(event => event.typeOfEvent === 'Workshop');
  const [selected, setSelected] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  return (
  <Container className='py-sm-3'>
    <LoadScript
    googleMapsApiKey="AIzaSyAH_N3x9evBavZrOJAb2RWdBquCoonshcE"
    >
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={options}
      onLoad={onMapLoad}
      >
        {cleanUps.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: '/images/greenM.png',
          scale: 2,
        }}
        onClick={() => {
          setSelected(marker);
        }}/>)}

        {workshops.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: '/images/orangeM.png',
          scale: 2,
        }}
        onClick={() => {
          setSelected(marker);
        }}/>)}

        {reports.map(marker => <Marker
        key={marker.lat + marker.lng}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{
          url: '/images/redM.png',
          scale: 2,
        }}
        onClick={() => {
          setSelectedReport(marker);
        }}/>)}

        {selectedReport ? (<InfoWindow
        position={{ lat: selectedReport.lat, lng: selectedReport.lng }}
        onCloseClick={() => { setSelectedReport(null); }}>
          <div>
            <ReportItem key={selectedReport._id}
                        report={selectedReport} />
          </div>
        </InfoWindow>) : null }
        {selected ? (<InfoWindow
        position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => { setSelected(null); }}>
          <div>
            <EventItem key={selected._id}
                       event={selected} userEvents={userEvents} />
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
  userEvents: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default DisplayMap;
