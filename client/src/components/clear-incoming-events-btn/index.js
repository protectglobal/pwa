import React from 'react';
import PropTypes from 'prop-types';
// import { graphql } from 'react-apollo';
import Button from '@material-ui/core/Button';
// import clearEventsMutation from '../../graphql/event/mutation/clear-events';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: we should probably don't delete event from DB but from browser mem
class ClearIncomingEventsBtn extends React.PureComponent {
  handleClick = async () => {
    // const { clearEvents } = this.props;

    // Clear events list
    try {
      // await clearEvents({});
      console.log('IMPLEMENT THIS!! clear events from Redux store');
    } catch (exc) {
      console.log('exc', exc);
    }
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleClick}
      >
        Clear events
      </Button>
    );
  }
}

ClearIncomingEventsBtn.propTypes = {
  // clearEvents: PropTypes.func.isRequired,
};

// Apollo integration
// const withMutation = graphql(clearEventsMutation, { name: 'clearEvents' });

// export default withMutation(ClearIncomingEventsBtn);
export default ClearIncomingEventsBtn;
