import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// CONSTANT:
//------------------------------------------------------------------------------
const SIZE = 140;
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Button = styled.button`
background-color: ${({ theme, active }) => (active ? theme.color.primary20 : theme.color.white)};
  border: 3px solid ${({ disabled, theme }) => (
    (!disabled || disabled === false) ? theme.color.primary : theme.color.default
  )};
  border-radius: 15px;
  height: ${SIZE}px;
  width: ${SIZE}px;
  font: 'inherit';
  color: ${({ disabled, theme }) => (
    (!disabled || disabled === false) ? theme.color.primary : theme.color.default
  )};
  cursor: ${({ disabled }) => (
    (!disabled || disabled === false) ? 'pointer' : 'not-allowed'
  )};
  :focus {
    outline: none;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['button']).isRequired,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SquareButton extends React.PureComponent {
  state = {
    active: false,
  }

  activate = () => {
    this.setState({ active: true });
  }

  deactivate = () => {
    this.setState({ active: false });
  }

  render() {
    const {
      text,
      icon: Icon,
      onClick,
      ...rest
    } = this.props;
    const { active } = this.state;

    return (
      <Button
        type="button"
        active={active}
        className="flex items-center justify-center m1"
        onClick={() => {
          // Highlight button
          this.activate();
          // Remove highlight after 1 sec
          const handle = setTimeout(() => {
            this.deactivate();
            clearTimeout(handle);
          }, 1000);
          // Pass event up to parent component
          onClick();
        }}
        {...rest}
      >
        <div className="flex-column">
          <Icon
            className="flex-auto"
            style={{ fontSize: '60px' }}
          />
          <div className="mb1" />
          <div className="bold">
            {text.toUpperCase()}
          </div>
        </div>
      </Button>
    );
  }
}

SquareButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  // Plus all of the native button props
};

SquareButton.defaultProps = {
  onClick: () => {},
};

export default SquareButton;
