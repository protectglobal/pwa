import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Terminal = styled.div`
  background-color: black;
  color: green;
  font-size: 16px;
  line-height: 30px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Console = ({
  cannonId,
  eventType,
  eventValue,
  httpRes,
}) => (
  <Terminal className="p1">
    {`>> cannonId: ${cannonId}`}
    <br />
    {`>> eventType: ${eventType}`}
    <br />
    {`>> eventValue: ${eventValue}`}
    <br />
    {`>> httpRes: ${(httpRes && !isEmpty(httpRes) && JSON.stringify(httpRes, { indent: true })) || ''}`}
  </Terminal>
);

Console.propTypes = {
  cannonId: PropTypes.string,
  eventType: PropTypes.oneOf(['faultCode', 'cannonInput', '']),
  eventValue: PropTypes.string,
  httpRes: PropTypes.shape({
    status: PropTypes.string,
  }),
};

Console.defaultProps = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};

export default Console;
