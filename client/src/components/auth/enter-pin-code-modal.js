import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import FormProps from '../../render-props/form-props';
import Feedback from '../common/feedback';
import ValidatePinCode from './validate-pin-code';
import PinCodeForm from './pin-code-form';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  width: 300px;
  background-color: white;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const EnterPinCodeModal = ({ visible, closeModal, onValidPinCode }) => (
  <FormProps>
    {({
      disabled,
      errorMsg,
      successMsg,
      handleBefore,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <Modal
        aria-labelledby="Enter Pin Code"
        aria-describedby="Need validation to perform action"
        open={visible}
        onClose={closeModal}
      >
        <Container
          style={getModalStyle()}
          className="absolute p2"
        >
          <p>Validate Action</p>
          <ValidatePinCode
            onValidateError={handleServerError}
            onValidateSuccess={() => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                // Pass event up to parent component
                onValidPinCode();
              });
            }}
          >
            {({ validatePinCode }) => (
              <PinCodeForm
                btnLabel="Validate"
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onSuccessHook={({ pinCode }) => {
                  validatePinCode({ pinCode });
                }}
              />
            )}
          </ValidatePinCode>
          <div className="mb2" />
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
        </Container>
      </Modal>
    )}
  </FormProps>
);

EnterPinCodeModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  onValidPinCode: PropTypes.func,
};

EnterPinCodeModal.defaultProps = {
  visible: () => {},
  closeModal: () => {},
  onValidPinCode: () => {},
};

export default EnterPinCodeModal;
