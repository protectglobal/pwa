import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userFragment from '../../graphql/user/fragment/user';
import setPhoneMutation from '../../graphql/user/mutation/set-phone';

class TwilioForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { curUser } = this.props;
    this.state = {
      phone: (curUser && curUser.phone) || '+34722184802',
      // TODO: add errors field, disable btn
    };
  }

  handleChange = ({ target }) => {
    this.setState({ phone: target.value });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { phone } = this.state;
    // TODO: disable btn on submit
    // TODO: validate fields
    // Pass event up to parent component
    const { setPhone } = this.props;

    try {
      const res = await setPhone({
        variables: { phone },
      });
      console.log('res', res);
    } catch (exc) {
      console.log('exc', exc);
    }
  }

  render() {
    const { phone } = this.state;

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <TextField
          type="text"
          label="Phone"
          value={phone}
          onChange={this.handleChange}
          margin="normal"
        />
        &nbsp;
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Save phone
        </Button>
      </form>
    );
  }
}

TwilioForm.propTypes = {
  curUser: propType(userFragment).isRequired,
  setPhone: PropTypes.func.isRequired,
};

// Apollo integration
const withMutation = graphql(setPhoneMutation, { name: 'setPhone' });

export default withMutation(TwilioForm);
