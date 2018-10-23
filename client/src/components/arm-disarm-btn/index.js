import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
// See: https://material.io/tools/icons/?style=baseline
import VisibilityIcon from '@material-ui/icons/Visibility';
import userFragment from '../../graphql/user/fragment/user';
import ModalProps from '../../render-props/modal-props';
import SquareButton from '../common/square-button';
import EnterPinCodeModal from '../auth/enter-pin-code-modal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: add confirmation?
class ArmDisarmBtn extends React.PureComponent {
  handleClick = () => {
    const { curUser, onClick } = this.props;

    const event = {
      eventType: 'armCannon', // 'armCannon'
      eventValue: 'on',
      cannonId: curUser.cannonId,
    };

    // Pass event up to parent component
    onClick(event);
  }

  render() {
    // TODO: we need cannon state in order to display either arm or disarm action
    const { curUser, disabled } = this.props;

    /* if (!curUser.cannonId) {
      return null;
    } */

    return (
      <ModalProps>
        {({ visible, openModal, closeModal }) => [
          <SquareButton
            key="button"
            text="ARM / DISARM CANNON"
            icon={VisibilityIcon}
            disabled={disabled}
            onClick={openModal}
          />,
          visible && (
            <EnterPinCodeModal
              key="modal"
              visible={visible}
              closeModal={closeModal}
              onValidPinCode={() => {
                closeModal(() => {
                  this.handleClick();
                });
              }}
            />
          ),
        ]}
      </ModalProps>
    );
  }
}

ArmDisarmBtn.propTypes = {
  curUser: propType(userFragment).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

ArmDisarmBtn.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default ArmDisarmBtn;
