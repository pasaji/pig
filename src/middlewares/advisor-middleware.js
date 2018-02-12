import {
  RUN_BACKTEST
} from '../modules/bot'

import {
  ANALYZE,
  ADVICE,
  analyze,
  advice
} from '../modules/advisor'

import strategy from '../strategies/one'

export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action
    switch (type) {
      case RUN_BACKTEST:
        next(action)
        for (let i = payload.startIndex; i < store.getState().markets[payload.id].data.length; i++) {
          store.dispatch(analyze({ id: payload.id, index: i }))
        }
        break;

      case ANALYZE:
        next(action)
        strategy({ data: store.getState().markets[payload.id].data, index: payload.index }, (error, result) => {
          if (error) { return }
          store.dispatch( advice( { ...result, id: payload.id } ) )
        })
        break;
        
      default:
        next(action)
    }
  }
}
