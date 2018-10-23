import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import savePinCodeMutation from '../../graphql/user/mutation/save-pin-code';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SavePinCode extends React.PureComponent {
  handleSave = async ({ pinCode }) => {
    const { onSaveError, onSaveSuccess, savePinCode } = this.props;

    try {
      await savePinCode({ variables: { pinCode } });
      onSaveSuccess();
    } catch (exc) {
      onSaveError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      savePinCode: this.handleSave,
    };

    return children(api);
  }
}

SavePinCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSaveError: PropTypes.func,
  onSaveSuccess: PropTypes.func,
  savePinCode: PropTypes.func.isRequired,
};

SavePinCode.defaultProps = {
  onSaveError: () => {},
  onSaveSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(savePinCodeMutation, { name: 'savePinCode' });

export default withMutation(SavePinCode);
