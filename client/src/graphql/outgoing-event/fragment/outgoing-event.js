import gql from 'graphql-tag';

const outgoingEventFragment = gql`
  fragment outgoingEventFragment on OutgoingEvent {
    _id
    createdAt
    userId
    cannonId
    eventType
    eventValue
  }
`;

export default outgoingEventFragment;
