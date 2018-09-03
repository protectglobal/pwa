import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Actions from '../../redux/actions';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ClearOutgoingEventsBtn extends React.PureComponent {
  handleClick = () => {
    const { clearOutgoingEvents } = this.props;

    try {
      clearOutgoingEvents();
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
        Clear console
      </Button>
    );
  }
}

ClearOutgoingEventsBtn.propTypes = {
  clearOutgoingEvents: PropTypes.func.isRequired,
};

//------------------------------------------------------------------------------
// REDUX INTEGRATION:
//------------------------------------------------------------------------------
const namespace = 'outgoingEvents';

const mapDispatchToProps = dispatch => ({
  clearOutgoingEvents: () => (
    dispatch(Actions.setInitialState(namespace))
  ),
});

// Enhancer function
const withRedux = connect(null, mapDispatchToProps);
//------------------------------------------------------------------------------

export default withRedux(ClearOutgoingEventsBtn);
