import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// See: https://material.io/tools/icons/?style=baseline
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SquareButton from '../common/square-button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ConsoleBtn = ({ history, disabled }) => (
  <SquareButton
    text="EVENTS"
    icon={SwapHorizIcon}
    disabled={disabled}
    onClick={() => { history.push('/console'); }}
  />
);

ConsoleBtn.propTypes = {
  disabled: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ConsoleBtn.defaultProps = {
  disabled: false,
};

export default withRouter(ConsoleBtn);
