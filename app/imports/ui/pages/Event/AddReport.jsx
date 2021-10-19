import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxOption } from '@reach/combobox';
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAH_N3x9evBavZrOJAb2RWdBquCoonshcE',
    libraries,
  });
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
  return (
  <Container id="page-container">
    <p>Please Place a Marker For Where You Found The Trash/Needed Assistance</p>
    {loadError ? <div>error</div> : ''}
    { isLoaded ? <Search /> : ''}
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

export default (AddReport);
