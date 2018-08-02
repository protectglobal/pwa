import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import EventsList from '../../components/events-list';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Half = styled.div`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Spacer = styled.div`
  width: 20px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = () => (
  <div>
    <Title>PWA</Title>
    <h3>Events List</h3>
    <EventsList />
  </div>
);

export default HomePage;
