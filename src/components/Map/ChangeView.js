// This function updates the map center
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';

export const ChangeView = ({ center }) => {
  const map = useMap();

  map.setView(center, map.getZoom());

  return null;
};

ChangeView.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
};
