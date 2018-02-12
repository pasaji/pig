import { createAction } from 'redux-actions'

// Constants
export const PREFIX = 'bot/';
export const RUN_BACKTEST = PREFIX + 'RUN_BACKTEST'
export const RUN = PREFIX + 'RUN'
export const STOP = PREFIX + 'START'

// Action Creators
export const runBacktest = createAction(RUN_BACKTEST) // run strategy backtest { startIndex:30 }

// Reducer
export const defaultState = {
  
};

export default function(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
