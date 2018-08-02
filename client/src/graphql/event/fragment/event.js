import gql from 'graphql-tag';

const eventFragment = gql`
  fragment eventFragment on Event {
    _id
    createdAt
    cannonId
    eventType
    eventValue
  }
`;

export default eventFragment;
