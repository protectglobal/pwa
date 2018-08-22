import gql from 'graphql-tag';
import passCodeFragment from '../fragment/pass-code';

const passCodeQuery = gql`
  query {
    user {
      ...passCodeFragment
    }
  }
  ${passCodeFragment}
`;

export default passCodeQuery;
