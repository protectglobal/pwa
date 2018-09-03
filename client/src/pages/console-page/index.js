import React from 'react';
import Divider from '../../components/common/divider';
import OutgoingEventsConsole from '../../components/outgoing-events-console';
import IncomingEventsList from '../../components/incoming-events-list';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ConsolePage = () => (
  <div>
    <h3>Console</h3>

    <p>Outgoing HTTP requests</p>
    <OutgoingEventsConsole />

    <div className="mb3" />
    <Divider />
    <div className="mb3" />

    <p>Incoming HTTP requests</p>
    <IncomingEventsList />
  </div>
);

export default ConsolePage;
