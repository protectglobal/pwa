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
import incomingEventFragment from '../../graphql/incoming-event/fragment/incoming-event';
import incomingEventsQuery from '../../graphql/incoming-event/query/incoming-events';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.div`
  border: 1px solid rgba(224, 224, 224, 1);
  max-height: 400px;
  overflow: auto;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const IncomingEventsList = ({ incomingEventsData }) => {
  const { loading, error, incomingEvents } = incomingEventsData;

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!incomingEvents || incomingEvents.length === 0) {
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
          {incomingEvents.map(({
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

IncomingEventsList.propTypes = {
  incomingEventsData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    incomingEvents: PropTypes.arrayOf(propType(incomingEventFragment)),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

const withData = graphql(incomingEventsQuery, {
  name: 'incomingEventsData',
  options: {
    pollInterval: 1000,
  },
});

export default withData(IncomingEventsList);
