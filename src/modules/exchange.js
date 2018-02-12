import { createAction } from 'redux-actions'

// Constants
export const PREFIX = 'exchange/';

export const ADD_MARKET = PREFIX + 'ADD_MARKET'
export const LOAD_MARKETS = PREFIX + 'LOAD_MARKETS'
export const LOAD_HISTORY = PREFIX + 'LOAD_HISTORY'
export const FETCH_TRADES = PREFIX + 'FETCH_TRADES'

// Action Creators
export const addMarket = createAction(ADD_MARKET)
export const loadMarkets = createAction(LOAD_MARKETS)
export const loadHistory = createAction(LOAD_HISTORY)
export const fetchTrades = createAction(FETCH_TRADES)

// Reducer
export const defaultState = {}

export default function(state = defaultState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_MARKET:
      return {
        ...state,
        markets: {
          ...(state.markets || {}),
          [payload.market]: { symbol: payload.market }
        }
      }
    default:
      return state;
  }
}
