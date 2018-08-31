import gql from 'graphql-tag';

const incoimingEventFragment = gql`
  fragment incoimingEventFragment on IncomingEvent {
    _id
    createdAt
    cannonId
    eventType
    eventValue
  }
`;

export default incoimingEventFragment;
