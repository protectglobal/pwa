import gql from 'graphql-tag';
import userFragment from '../fragment/user';

const savePinCodeMutation = gql`
  mutation savePinCode($pinCode: String!) {
    savePinCode(pinCode: $pinCode) {
      ...userFragment
    }
  }
  ${userFragment}
`;

export default savePinCodeMutation;
