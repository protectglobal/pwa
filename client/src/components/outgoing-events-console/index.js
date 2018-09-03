import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import ClearOutgoingEventsBtn from '../clear-outgoing-events-btn';

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
const OutgoingEventsConsole = ({
  cannonId,
  eventType,
  eventValue,
  httpRes,
}) => (
  <React.Fragment>
    {/* TERMINAL */}
    <Terminal className="p1">
      {`> cannonId: ${cannonId}`}
      <br />
      {`> eventType: ${eventType}`}
      <br />
      {`> eventValue: ${eventValue}`}
      <br />
      {`> httpRes: ${(httpRes && !isEmpty(httpRes) && JSON.stringify(httpRes, { indent: true })) || ''}`}
    </Terminal>

    {/* CLEAR BUTTON */}
    <div className="mb2" />
    <ClearOutgoingEventsBtn />
  </React.Fragment>
);

OutgoingEventsConsole.propTypes = {
  cannonId: PropTypes.string,
  eventType: PropTypes.oneOf(['panicBtn', '']),
  eventValue: PropTypes.string,
  httpRes: PropTypes.shape({
    status: PropTypes.string,
  }),
};

OutgoingEventsConsole.defaultProps = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};

//------------------------------------------------------------------------------
// REDUX INTEGRATION:
//------------------------------------------------------------------------------
const namespace = 'outgoingEvents';

const mapStateToProps = state => ({ ...state[namespace] });

// Enhancer function
const withRedux = connect(mapStateToProps, null);
//------------------------------------------------------------------------------

export default withRedux(OutgoingEventsConsole);
