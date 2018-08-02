import React from 'react';
import styled from 'styled-components';
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
const HomePage = () => (
  <div>
    <Title>PWA</Title>
    <h3>Events List - <ClearEventsBtn /></h3>
    <EventsList />
    <div className="mb2" />
  </div>
);

export default HomePage;
