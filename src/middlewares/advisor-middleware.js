import {
  RUN_BACKTEST
} from '../modules/bot'

import {
  ANALYZE,
  ADVICE,
  analyze,
  advice
} from '../modules/advisor'

import {
  getMarket
} from '../modules/markets'

import strategy from '../strategies/one'

export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action
    const { exchange, market } = payload || {}

    switch (type) {
      case RUN_BACKTEST:
        next(action)
        for (let i = payload.startIndex; i < getMarket(store.getState(), exchange, market ).data.length; i++) {
          store.dispatch(analyze({ exchange, market, index: i }))
        }
        break;

      case ANALYZE:
        next(action)
        strategy({ state: store.getState(), exchange, market, backtest: { index: payload.index  } }, (error, result) => {
          if (error) { return }
          store.dispatch( advice( result ) )
        })
        break;

      default:
        next(action)
    }
  }
}
