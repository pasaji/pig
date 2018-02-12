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

        const { USDT, ETH } = store.getState().trader.balances
        const item = store.getState().markets[payload.id].data[payload.index]

        if (payload.action === 'buy') {
          if (USDT > 0.1) {
            store.dispatch( createOrder( { id: payload.id, type: payload.action, price: item.close, amount: ((0.9985 * USDT) / item.close), index: payload.index } ) )
          }
        }
        if (payload.action === 'sell') {
          if (ETH > 0.0001) {
            store.dispatch( createOrder( { id: payload.id, type: payload.action, price: item.close, amount: ETH, index: payload.index } ) )
          }
        }
        break;

      default:
        next(action)
    }
  }
}
