import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SIZE = 140;
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Button = styled.button`
  /* reset button style */
  background: none !important;
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
`;

Button.propTypes = {
  type: PropTypes.oneOf(['button']).isRequired,
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SquareButton = ({ text, icon: Icon, ...rest }) => (
  <Button
    type="button"
    className="flex items-center justify-center"
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

SquareButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  // Plus all of the native button props
};

export default SquareButton;
