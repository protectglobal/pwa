import gql from 'graphql-tag';

const incomingEventFragment = gql`
  fragment incomingEventFragment on IncomingEvent {
    _id
    createdAt
    cannonId
    eventType
    eventValue
  }
`;

export default incomingEventFragment;
