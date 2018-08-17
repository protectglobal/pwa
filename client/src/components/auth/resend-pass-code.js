import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendPassCodeMutation from '../../graphql/user/mutation/send-pass-code';

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
      sendPassCode,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendPassCode({ variables: { email } });
      this.clearFields();
      onSuccessHook();
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }
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
  sendPassCode: PropTypes.func.isRequired,
};

ResendPassCode.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendPassCodeMutation, { name: 'sendPassCode' });

export default withMutation(ResendPassCode);

