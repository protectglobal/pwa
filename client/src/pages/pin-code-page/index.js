import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { FormProps } from '../../render-props';
// import { FormProps } from 'react-state-helpers-via-render-props';
// import SEO from '../../components/smart/seo';
import PinCodeForm from '../../components/auth/pin-code-form';
import SavePinCode from '../../components/auth/save-pin-code';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/common/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PinCodePage = ({ client }) => (
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
      <AuthPageLayout
        title="Choose a Pin Code"
        subtitle="Please, choose a 4-digit pin code that you will remember"
      >
        <SavePinCode
          onSaveError={handleServerError}
          onSaveSuccess={() => {
            // Extend formProps.handleSuccess' default functionality
            handleSuccess(() => {
              // Reset store to update client data
              client.resetStore();
            });
          }}
        >
          {({ savePinCode }) => (
            <PinCodeForm
              btnLabel="Save Pin Code"
              disabled={disabled}
              onBeforeHook={handleBefore}
              onClientErrorHook={handleClientError}
              onSuccessHook={({ pinCode }) => {
                savePinCode({ pinCode });
              }}
            />
          )}
        </SavePinCode>
        <div className="mb2" />
        <Feedback
          loading={disabled}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
      </AuthPageLayout>
    )}
  </FormProps>
);

PinCodePage.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(PinCodePage);
