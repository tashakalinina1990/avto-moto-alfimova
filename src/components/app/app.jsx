import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../wrapper/wrapper';

const App = ({images}) => {
  return (
    <Wrapper images={images}/>
  );
}

App.propTypes = {
  images: PropTypes.array,
};

App.defaultProps = {
  images: [],
};

export default App;
