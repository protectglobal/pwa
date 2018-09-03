import gql from 'graphql-tag';

const userFragment = gql`
  fragment userFragment on User {
    _id
    createdAt
    ip
    cannonId
    email
    phone
  }
`;

export default userFragment;
