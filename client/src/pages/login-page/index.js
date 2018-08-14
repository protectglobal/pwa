import React from 'react';
import { FormProps } from '../../components/render-props';
// import SEO from '../../components/smart/seo';
import {
  LoginAuthView,
  LoginTokenAuthView,
  ResendVerificationCode,
} from '../../components/auth';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/common/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After LoginAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the LoginPage component)
// which will result in redirecting the user to home page automatically.
class LoginPage extends React.PureComponent {
  state = {
    view: 'loginToken',
    email: '',
  }

  render() {
    const { view, email } = this.state;

    return (
      <FormProps>
        {({
          disabled,
          errorMsg,
          successMsg,
          setSuccessMessage,
          handleBefore,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <AuthPageLayout
            title={view === 'loginToken' ? 'Login' : 'Enter Pass Code'}
            subtitle={view === 'login' ? 'Haven\'t received the pass code?' : ''}
            link={view === 'login'
              ? (
                <ResendVerificationCode
                  email={email}
                  label="Resend it"
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onServerErrorHook={handleServerError}
                  onSuccessHook={() => {
                    // Extend formProps.handleSuccess' default functionality
                    handleSuccess(() => {
                      // Show success message after action is completed
                      setSuccessMessage('A new email has been sent to your inbox!');
                    });
                  }}
                />
              )
              : null
            }
          >
            {view === 'loginToken' && (
              <LoginTokenAuthView
                btnLabel="Send Pass Code"
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onServerErrorHook={handleServerError}
                onSuccessHook={(obj) => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    if (obj && obj.email) {
                      // Show success message after action is completed
                      setSuccessMessage('A new email has been sent to your inbox!');
                      // Switch to login view and store current user's email
                      this.setState({ view: 'login', email: obj.email });
                    }
                  });
                }}
              />
            )}
            {view === 'login' && (
              <LoginAuthView
                btnLabel="Enter"
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onServerErrorHook={handleServerError}
                onSuccessHook={handleSuccess}
              />
            )}
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
  }
}

export default LoginPage;
