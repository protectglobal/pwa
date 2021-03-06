import gql from 'graphql-tag';

const userFragment = gql`
  fragment userFragment on User {
    _id
    createdAt
    ip
    cannonId
    email
    phone
    pinCodeSet
  }
`;

export default userFragment;
