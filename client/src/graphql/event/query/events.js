import gql from 'graphql-tag';
import eventFragment from '../fragment/event';

const eventsQuery = gql`
  query {
    events {
      ...eventFragment
    }
  }
  ${eventFragment}
`;

export default eventsQuery;
