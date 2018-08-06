import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PanicBtn = ({ onClick }) => (
  <Button
    variant="contained"
    color="secondary"
    onClick={onClick}
  >
    Panic Button
  </Button>
);

PanicBtn.propTypes = {
  onClick: PropTypes.func,
};

PanicBtn.defaultProps = {
  onClick: () => {},
};

export default PanicBtn;
