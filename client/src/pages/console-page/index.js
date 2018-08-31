import React from 'react';
// import PropTypes from 'prop-types';
// import { graphql } from 'react-apollo';
// import { propType } from 'graphql-anywhere';
import Button from '@material-ui/core/Button';
// import Console from '../../components/console';
import EventsList from '../../components/events-list';
import ClearEventsBtn from '../../components/clear-events-btn';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: use redux to keep track of outcoming requests
const ConsolePage = () => (
  <div>
    <h3>Console</h3>

    <p>Outcomming HTTP requests</p>
    {/* <Console
      cannonId={cannonId}
      eventType={eventType}
      eventValue={eventValue}
      httpRes={httpRes}
    /> */}
    <div className="mb2" />
    <Button
      variant="contained"
      color="primary"
      // onClick={this.handleClearConsoleClick}
    >
      Clear console
    </Button>

    <div className="mb2" />
    <p>Incomming HTTP requests - <ClearEventsBtn /></p>
    <EventsList />
  </div>
);

ConsolePage.propTypes = {
  // curUser: propType(userFragment).isRequired,
};

export default ConsolePage;
