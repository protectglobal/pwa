import React from 'react';
import { propType } from 'graphql-anywhere';
import { PWABtnProps, FormProps } from '../../render-props';
import userFragment from '../../graphql/user/fragment/user';
import TwilioForm from '../../components/twilio-form';
import SubscribeBtn from '../../components/pwa/subscribe-btn';
import UnsubscribeBtn from '../../components/pwa/unsubscribe-btn';
import PushBtn from '../../components/pwa/push-btn';
import Title from '../../components/common/title';
import Subtitle from '../../components/common/subtitle';
import Feedback from '../../components/common/feedback';
import Alert from '../../components/common/alert';
import Loading from '../../components/common/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SettingsPage = ({ curUser }) => (
  <div>
    <h3>Settings</h3>
    <p>Enable SMS notifications</p>
    <TwilioForm curUser={curUser} />
    <div className="mb2" />
    <PWABtnProps>
      {(pwaBtnProps) => {
        const {
          supported,
          subscribed,
          handleSubscriptionChange,
        } = pwaBtnProps;

        return (
          <FormProps>
            {(formProps) => {
              const {
                disabled,
                errorMsg,
                successMsg,
                handleBefore,
                handleServerError,
                handleSuccess,
              } = formProps;

              // Display loading indicator while checking for push support
              if (supported === 'loading') {
                return <Loading />;
              }

              // Do not render subscribe and push notification buttons in case
              // notifications aren't supported
              if (!supported) {
                return (
                  <Alert
                    type="error"
                    content="Your browser doesn't support service workers"
                  />
                );
              }

              return (
                <React.Fragment>
                  <p>Enable Push notifications</p>
                  {subscribed ? (
                    <UnsubscribeBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        handleSubscriptionChange({ subscribed: false });
                        handleSuccess();
                      }}
                    />
                  ) : (
                    <SubscribeBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        handleSubscriptionChange({ subscribed: true });
                        handleSuccess();
                      }}
                    />
                  )}
                  <div className="my1" />
                  {subscribed && (
                    <PushBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={handleSuccess}
                    />
                  )}
                  <div className="my1" />
                  <Feedback
                    className="mb2"
                    loading={disabled}
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                  />
                </React.Fragment>
              );
            }}
          </FormProps>
        );
      }}
    </PWABtnProps>
  </div>
);

SettingsPage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default SettingsPage;
