import { createAction } from 'redux-actions'
import exchangeReducer, { PREFIX as EXCHANGE_PREFIX } from './exchange'

// Constants
const PREFIX = 'exchanges/';

export const ADD_EXCHANGE = PREFIX + 'ADD_EXCHANGE'

// Action Creators
export const addExchange = createAction(ADD_EXCHANGE)

// Reducer
export const defaultState = {}

export default function(state = defaultState, action) {
  const { type, payload } = action

  if ( type.indexOf(EXCHANGE_PREFIX) === 0 && payload ) {
    if ( state.hasOwnProperty(payload.exchange) ) {
      return {
        ...state,
        [payload.exchange]: exchangeReducer(state[payload.exchange], action)
      }
    }
  }

  switch (type) {
    case ADD_EXCHANGE:
      return {
        ...state,
        [payload.id]: payload
      }
    default:
      return state;
  }
}
