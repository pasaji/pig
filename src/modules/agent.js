import { createAction } from 'redux-actions'

// Constants
const PREFIX = 'agent/';

export const CREATE_ORDER = PREFIX + 'CREATE_ORDER' // decorate indicator
export const CANCEL_ORDER = PREFIX + 'CANCEL_ORDER' // decorate indicator

export const createOrder = createAction(CREATE_ORDER) //
export const cancelOrder = createAction(CANCEL_ORDER) //

// Action Creators

// export const actions = { };

// Reducer
export const defaultState = {
  openOrders: []
}

export default function(state = defaultState, action) {
  const { type, payload } = action
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        openOrders: [
          ...state.openOrders,
          payload
        ]
      }
      break
    default:
      return state;
  }
}
