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
const SquareButton = ({ children, ...rest }) => (
  <Button
    type="button"
    className="flex items-center justify-center"
    {...rest}
  >
    {children}
  </Button>
);

SquareButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  // Plus all of the native button props
};

export default SquareButton;
