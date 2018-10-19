import gql from 'graphql-tag';
import userFragment from '../fragment/user';

const validatePinCodeMutation = gql`
  mutation validatePinCode($pinCode: String!) {
    validatePinCode(pinCode: $pinCode) {
      ...userFragment
    }
  }
  ${userFragment}
`;

export default validatePinCodeMutation;
