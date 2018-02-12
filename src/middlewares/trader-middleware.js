import {
  ADVICE,
} from '../modules/advisor'

import {
  createOrder,
} from '../modules/agent'


import strategy from '../strategies/one'

export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action
    switch (type) {

      case ADVICE:
        next(action)
        if (payload.type === 'buy' || payload.type === 'sell') {
          store.dispatch( createOrder( payload ) )
        }
        break;

      default:
        next(action)
    }
  }
}
