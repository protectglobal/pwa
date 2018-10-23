import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
// See: https://material.io/tools/icons/?style=baseline
import WavesIcon from '@material-ui/icons/Waves';
import userFragment from '../../graphql/user/fragment/user';
import ModalProps from '../../render-props/modal-props';
import SquareButton from '../common/square-button';
import EnterPinCodeModal from '../auth/enter-pin-code-modal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: add confirmation?
class PanicBtn extends React.PureComponent {
  handleClick = () => {
    const { curUser, onClick } = this.props;

    const event = {
      eventType: 'panicBtn',
      eventValue: 'on',
      cannonId: curUser.cannonId,
    };

    // Pass event up to parent component
    onClick(event);
  }

  render() {
    const { curUser, disabled } = this.props;

    /* if (!curUser.cannonId) {
      return null;
    } */

    return (
      <ModalProps>
        {({ visible, openModal, closeModal }) => [
          <SquareButton
            key="button"
            text="RELEASE FOG"
            icon={WavesIcon}
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

PanicBtn.propTypes = {
  curUser: propType(userFragment).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

PanicBtn.defaultProps = {
  disabled: false,
  onClick: () => {},
};


export default PanicBtn;
