import ccxt from 'ccxt'
import async from 'async'

import {
  ADD_MARKET,
  REMOVE_MARKET,
  updateMarket,
  patchMarket,
  updateIndicators,
  uptodate
} from '../modules/markets'

const MINUTE  = 1000 * 60 // ms
const HOUR    = 1000 * 60 * 60 // ms
const DAY     = 1000 * 60 * 60 * 24 // ms
const HALF_DAY     = 1000 * 60 * 60 * 12 // ms
const WEEK    = 1000 * 60 * 60 * 24 * 7 // ms

// const exchange = new ccxt.poloniex({'timeout': 30000})
let exchanges = {}

const sleep = ( ms ) => new Promise ( resolve => setTimeout ( resolve, ms ) );

export function createMiddleware() {
  return store => next => action => {

    const { type, payload } = action
    const { id, exchange, market } = payload || {}

    switch (type) {

      case ADD_MARKET:
        next(action)
        // check if exchange exists
        if (!exchanges.hasOwnProperty(exchange)) {
          exchanges[exchange] = new ccxt[exchange]({ 'timeout': 30000 })
        }
        async.series([
          cb => {
            exchanges[exchange].loadMarkets().then(function(result) {
              cb()
            }, function(err) {
              cb(err)
            });
          }, cb => {
            store.dispatch(patchMarket({
              id: id,
              taker: exchanges[exchange].market(market).taker,
              maker: exchanges[exchange].market(market).maker
            }))
            cb()
          }, cb => {
            if (!exchanges[exchange].has.fetchOHLCV) {
              return cb('fetchOHLCV not supported')
            }
            const since = new Date().getTime() - 1 * WEEK
            const limit = Math.floor(WEEK / (5 * MINUTE))
            exchanges[exchange].fetchOHLCV(market, '5m', since, limit).then(function(result) {
              const data = result.map(function(d) {
                return {
                  date: d[0],
                  open: d[1],
                  high: d[2],
                  low: d[3],
                  close: d[4],
                  volume: d[5]
                }
              })
              store.dispatch(patchMarket({ id: id, data: data }))
              cb()
            }, cb);
          }, cb => {
            exchanges[exchange].fetchOrderBook(market, 20).then(function(result) {
              store.dispatch(patchMarket({ id: id, orderBook: result }))
              cb()
            }, cb);
          }, cb => {
            const since = new Date().getTime() - 1 * MINUTE
            exchanges[exchange].fetchTrades(market, since).then(function(result) {
              store.dispatch(patchMarket({ id: id, trades: result }))
              cb()
            }, cb);
          }, cb => {
            exchanges[exchange].fetchTicker(market).then(function(result) {
              store.dispatch(patchMarket({ id: id, ticker: result }))
              cb()
            }, cb);
          }
        ], (err, results) => {
          if (err) {
            console.log(err);
            return
          }
          store.dispatch(updateIndicators({ id: id }))
        })
        break

      default:
        next(action)
    }
  }
}
