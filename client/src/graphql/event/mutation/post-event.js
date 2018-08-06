import gql from 'graphql-tag';

// TODO: probably return full response from POST request
const postEventMutation = gql`
  mutation postEvent($event: EventInput!) {
    postEvent(event: $event) {
      status
    }
  }
`;

export default postEventMutation;
