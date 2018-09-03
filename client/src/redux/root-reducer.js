import { combineReducers } from 'redux';
import outgoingEventsReducer from './reducers/outgoing-events';

const rootReducer = combineReducers({
  outgoingEvents: outgoingEventsReducer,
  // ...add all your individual reducers here
});

export default rootReducer;
