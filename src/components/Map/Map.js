import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import styles from './Map.module.css';

import { DEFAULT_CENTER, TILE_LAYER_URL } from '../../constants';
import { ChangeView } from './ChangeView';

const customIcon = new L.Icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [50, 50],
  iconAnchor: [25, -25],
  popupAnchor: [0, 0],
});

export const Map = ({ locationObject }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && locationObject) {
      map.flyTo([locationObject.location.lat, locationObject.location.lng], 13);
    }
  }, [locationObject, map]);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom={false}
        whenCreated={setMap}
        style={{ height: '63vh', width: '100%' }}
        zoomControl={false}
      >
        <ChangeView
          center={
            locationObject
              ? [locationObject.location.lat, locationObject.location.lng]
              : DEFAULT_CENTER
          }
        />
        <TileLayer url={TILE_LAYER_URL} />
        {locationObject && (
          <Marker
            icon={customIcon}
            position={[
              locationObject.location.lat,
              locationObject.location.lng,
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
  locationObject: PropTypes.object,
};
