import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import validatePinCodeMutation from '../../graphql/user/mutation/validate-pin-code';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ValidatePinCode extends React.PureComponent {
  handleValidate = async ({ pinCode }) => {
    const { onValidateError, onValidateSuccess, validatePinCode } = this.props;

    try {
      await validatePinCode({ variables: { pinCode } });
      onValidateSuccess();
    } catch (exc) {
      onValidateError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      validatePinCode: this.handleValidate,
    };

    return children(api);
  }
}

ValidatePinCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onValidateError: PropTypes.func,
  onValidateSuccess: PropTypes.func,
  validatePinCode: PropTypes.func.isRequired,
};

ValidatePinCode.defaultProps = {
  onValidateError: () => {},
  onValidateSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(validatePinCodeMutation, { name: 'validatePinCode' });

export default withMutation(ValidatePinCode);
