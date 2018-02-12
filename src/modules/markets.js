import { createAction } from 'redux-actions'

// Constants
const PREFIX = 'markets/'

export const ADD_MARKET = PREFIX + 'ADD_MARKET'
export const REMOVE_MARKET = PREFIX + 'REMOVE_MARKET'
export const UPDATE_MARKET = PREFIX + 'UPDATE_MARKET'
export const PATCH_MARKET = PREFIX + 'PATCH_MARKET'
export const UPTODATE = PREFIX + 'UPTODATE' // fresh data

export const UPDATE_INDICATORS = PREFIX + 'UPDATE_INDICATORS'
export const PATCH_INDICATORS = PREFIX + 'PATCH_INDICATORS' // decorate indicator

export const addMarket = createAction(ADD_MARKET)
export const removeMarket = createAction(REMOVE_MARKET)
export const updateMarket = createAction(UPDATE_MARKET)
export const patchMarket = createAction(PATCH_MARKET)
export const updateIndicators = createAction(UPDATE_INDICATORS)
export const patchIndicators = createAction(PATCH_INDICATORS)
export const uptodate = createAction(UPTODATE)

// Reducer
export const defaultState = {}

export default function(state = defaultState, action) {
  const { type, payload } = action

  if ( type.indexOf(PREFIX) !== 0 ) {
    return state
  }

  const id = createMarketId(payload.exchange, payload.market)

  switch (type) {

    case ADD_MARKET:
    case UPDATE_MARKET:

      return {
        ...state,
        [id]: {
          ...payload,
          uptodate: false
        }
      }

    case REMOVE_MARKET:

      return Object.keys(state).reduce((result, key) => {
        if (key !== id) {
          result[key] = state[key]
        }
        return result
      }, {})

    case PATCH_MARKET:

      return {
        ...state,
        [id]: {
          ...state[id],
          ...payload,
          uptodate: false
        }
      }
      break;

    case UPTODATE:

      return {
        ...state,
        [id]: {
          ...state[id],
          uptodate: true
        }
      }
      break;

    case PATCH_INDICATORS:

      return {
        ...state,
        [id]: {
          ...state[id],
          data: state[id].data.map((item, index) => {
            if (index < payload.startIndex ) {
              return item
            }
            return {
              ...item,
              ...payload.indicators[index - payload.startIndex]
            }
          })
        }
      }
      break;

    default:
      return state;
  }
}

export function createMarketId(exchange, market) {
  if (!exchange || !market) {
    return 'INVALID_MARKET_ID'
  }
  const currencies = market.split('/')
  return (exchange + '_' + currencies[1] + '_' + currencies[0] ).toUpperCase()
}

// Utils
export function getMarket(state, exchange, market) {
  return state.markets[createMarketId(exchange, market)]
}
