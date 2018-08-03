import gql from 'graphql-tag';
import userFragment from '../fragment/user';

const setPhoneMutation = gql`
  mutation setPhone($phone: String!) {
    setPhone(phone: $phone) {
      ...userFragment
    }
  }
  ${userFragment}
`;

export default setPhoneMutation;
