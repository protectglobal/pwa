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
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => (
  <div>
    <Title>PWA</Title>
    <div>{JSON.stringify(curUser, { indent: true })}</div>
    <TwilioForm curUser={curUser} />
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
