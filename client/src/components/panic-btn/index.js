import React from 'react';
import PropTypes from 'prop-types';
// See: https://material.io/tools/icons/?style=baseline
import WavesIcon from '@material-ui/icons/Waves';
import SquareButton from '../common/square-button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: disable after submit
// TODO: add confirmation?
const PanicBtn = ({ onClick }) => (
  <SquareButton
    text="RELEASE FOG"
    icon={WavesIcon}
    onClick={onClick}
  />
);

PanicBtn.propTypes = {
  onClick: PropTypes.func,
};

PanicBtn.defaultProps = {
  onClick: () => {},
};

export default PanicBtn;
