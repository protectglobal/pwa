import gql from 'graphql-tag';
import incomingEventFragment from '../fragment/incoming-event';

const incomingEventsQuery = gql`
  query {
    incomingEvents {
      ...incomingEventFragment
    }
  }
  ${incomingEventFragment}
`;

export default incomingEventsQuery;
