import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResendPassCode extends React.PureComponent {
  handleClick = async (evt) => {
    evt.preventDefault();

    const {
      email,
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    /* Meteor.sendVerificationCode(email, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        onSuccessHook({ email });
      }
    }); */
  }

  render() {
    const { label, disabled } = this.props;

    const anchor = (
      <a href="" onClick={this.handleClick}>
        {label}
      </a>
    );

    return disabled ? null : anchor;
  }
}

ResendPassCode.propTypes = {
  email: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

ResendPassCode.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default ResendPassCode;
