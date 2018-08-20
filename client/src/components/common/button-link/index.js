import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Button = styled.button`
  /* reset button style */
  background: none !important;
  border: none; 
  padding: 0 !important;
  font: 'inherit';
  text-decoration: ${({ disabled, underline }) => (disabled === false && underline && 'underline') || 'none'};
  color: ${({ disabled, theme }) => (disabled === false && theme.color.link)
  || 'inherit'};
  cursor: ${({ disabled }) => (disabled === false && 'pointer')
  || 'not-allowed'};
`;

Button.propTypes = {
  type: PropTypes.oneOf(['button']).isRequired,
  disabled: PropTypes.bool.isRequired,
  underline: PropTypes.bool.isRequired,
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ButtonLink = ({
  children,
  disabled,
  underline,
  ...rest
}) => (
  <Button
    type="button"
    disabled={disabled}
    underline={underline}
    {...rest}
  >
    {children}
  </Button>
);

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  disabled: PropTypes.bool,
  underline: PropTypes.bool,
};

ButtonLink.defaultProps = {
  disabled: false,
  underline: true,
};

export default ButtonLink;
