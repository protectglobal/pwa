import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import eventFragment from '../../graphql/event/fragment/event';
import eventsQuery from '../../graphql/event/query/events';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const EventsList = ({ eventsData }) => {
  const { loading, error, events } = eventsData;

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!events || events.length === 0) {
    return <p>No events</p>;
  }

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>eventType</TableCell>
            <TableCell>eventValue</TableCell>
            <TableCell>createdAt</TableCell>
            <TableCell>cannonId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(({
            _id,
            createdAt,
            cannonId,
            eventType,
            eventValue,
          }) => (
            <TableRow key={_id}>
              <TableCell>{eventType}</TableCell>
              <TableCell>{eventValue.toString()}</TableCell>
              <TableCell>{createdAt}</TableCell>
              <TableCell>{cannonId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

EventsList.propTypes = {
  eventsData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(propType(eventFragment)),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

const withData = graphql(eventsQuery, {
  name: 'eventsData',
  options: {
    pollInterval: 1000,
  },
});

export default withData(EventsList);
