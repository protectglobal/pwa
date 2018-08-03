import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import eventFragment from '../../graphql/event/fragment/event';
import eventsQuery from '../../graphql/event/query/events';

class TwilioForm extends React.PureComponent {
  state = {
    phone: '+34722184802',
    // TODO: add errors field
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { phone } = this.state;
    // TODO: disable btn on submit
    // TODO: validate fields
    // Pass event up to parent component

  }

  render() {
    const { phone } = this.state;

    return (
      <form autoComplete="off">
        <TextField
          name="phone"
          type="text"
          label="Phone"
          value={phone}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Save phone
        </Button>
      </form>
    );
  }
}
