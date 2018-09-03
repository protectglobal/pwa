import {
  textFieldReducer,
  objectFieldReducer,
} from './common';

/**
  * @summary Given the same arguments, it should calculate the next state and return it.
  * No surprises. No side effects. No API calls. No mutations. Just a calculation.
  */

// Main reducer. Holds state for the whole namespace. Delegates to smaller
// reducers as needed.
const initOutgoingEventsState = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};

const outgoingEventsReducer = (state = Object.assign({}, initOutgoingEventsState), action) => {
  if (action.namespace === 'outgoingEvents') {
    if (action.type === 'SET_INITIAL_STATE') {
      return Object.assign({}, initOutgoingEventsState);
    }

    const { fieldName } = action;

    switch (fieldName) {
    case 'cannonId':
    case 'eventType':
    case 'eventValue':
      return {
        ...state,
        [fieldName]: textFieldReducer(state[fieldName], action),
      };
    case 'httpRes':
      return {
        ...state,
        [fieldName]: objectFieldReducer(state[fieldName], action),
      };
    default:
      return state;
    }
  }
  return state;
};

export default outgoingEventsReducer;
