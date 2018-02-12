export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action
    console.log('ACTION:', type, payload.id);
    next(action)
  }
}
