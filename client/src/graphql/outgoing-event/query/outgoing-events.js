import gql from 'graphql-tag';
import outgoingEventFragment from '../fragment/outgoing-event';

const outgoingEventsQuery = gql`
  query {
    outgoingEvents {
      ...outgoingEventFragment
    }
  }
  ${outgoingEventFragment}
`;

export default outgoingEventsQuery;
