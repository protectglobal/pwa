import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PinCodeForm extends React.Component {
  state = {
    pinCode: '',
    errors: { pinCode: [] },
  }

  handleChange = ({ target }) => {
    const { errors } = this.state;
    const { id: field, value } = target;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields = ({ pinCode }) => {
    // Initialize errors
    const errors = {
      pinCode: [],
    };

    const PASS_CODE_LENGTH = 4;

    // Sanitize input
    const _pinCode = pinCode && pinCode.trim(); // eslint-disable-line no-underscore-dangle

    if (!_pinCode) {
      errors.pinCode.push('Pass code is required!');
    } else if (_pinCode.length !== PASS_CODE_LENGTH) {
      errors.pinCode.push(`Pass code must be ${PASS_CODE_LENGTH} characters long`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ pinCode: '' });
  }

  clearErrors = () => {
    this.setState({ errors: { pinCode: [] } });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const { onBeforeHook, onClientErrorHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { pinCode } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ pinCode });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      onClientErrorHook(errors);
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ pinCode });
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { pinCode, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="pinCode"
          type="text"
          label="Pin Code"
          value={pinCode}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={ErrorHandling.getFieldErrors(errors, 'pinCode').length > 0}
          helperText={
            ErrorHandling.getFieldErrors(errors, 'pinCode').length > 0
              ? ErrorHandling.getFieldErrors(errors, 'pinCode')
              : ''
          }
        />
        <div className="mb2" />
        <Button
          type="submit"
          variant="raised"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          {btnLabel}
        </Button>
      </form>
    );
  }
}

PinCodeForm.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PinCodeForm.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default PinCodeForm;
