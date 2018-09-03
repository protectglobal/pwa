import gql from 'graphql-tag';

const postEventMutation = gql`
  mutation postEvent($event: OutgoingEventInput!) {
    postEvent(event: $event) {
      status
    }
  }
`;

export default postEventMutation;
