import { CREATE_ORDER } from '../modules/agent'

export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action

    // console.log('ACTION:', type, ', exchange:', payload.exchange, ', market:', payload.market);
    next(action)
    if (type === CREATE_ORDER) {
      console.log(payload);
    }
  }
}
