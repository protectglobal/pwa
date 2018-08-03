import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userFragment from '../../graphql/user/fragment/user';
import TwilioForm from '../../components/twilio-form';
import EventsList from '../../components/events-list';
import ClearEventsBtn from '../../components/clear-events-btn';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => (
  <div>
    <Title>PWA</Title>
    <div className="mb2" />
    <h3>Current User</h3>
    <Json>
      {JSON.stringify(curUser, null, 2)}
    </Json>
    <div className="mb2" />
    <h3>Set User&apos; Phone</h3>
    <TwilioForm curUser={curUser} />
    <div className="mb2" />
    <h3>Events List - <ClearEventsBtn /></h3>
    <EventsList />
    <div className="mb2" />
  </div>
);

HomePage.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

HomePage.defaultProps = {
  curUser: null,
};

export default HomePage;
