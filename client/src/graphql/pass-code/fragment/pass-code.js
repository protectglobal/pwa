import gql from 'graphql-tag';

const passCodeFragment = gql`
  fragment passCodeFragment on User {
    _id
    email
    passCode
  }
`;

export default passCodeFragment;
