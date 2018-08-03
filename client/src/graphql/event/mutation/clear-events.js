import gql from 'graphql-tag';

const clearEventsMutation = gql`
  mutation {
    clearEvents {
      status
    }
  }
`;

export default clearEventsMutation;
