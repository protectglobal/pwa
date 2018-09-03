import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// See: https://material.io/tools/icons/?style=baseline
import SettingsIcon from '@material-ui/icons/Settings';
import SquareButton from '../common/square-button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SettingsBtn = ({ history, disabled }) => (
  <SquareButton
    text="SETTINGS"
    icon={SettingsIcon}
    disabled={disabled}
    onClick={() => { history.push('/settings'); }}
  />
);

SettingsBtn.propTypes = {
  disabled: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

SettingsBtn.defaultProps = {
  disabled: false,
};

export default withRouter(SettingsBtn);
