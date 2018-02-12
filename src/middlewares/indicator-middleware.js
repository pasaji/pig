import talib from 'talib'
import async from 'async'

import {
  UPDATE_INDICATORS,
  patchMarket,
  patchIndicators
} from '../modules/markets'

import {
  runBacktest
} from '../modules/bot'

import adx from '../indicators/adx'
import rsi from '../indicators/rsi'
import bb from '../indicators/bb'
import ema from '../indicators/ema'

export function createMiddleware() {
  return store => next => action => {
    const { type, payload } = action
    switch (type) {
      case UPDATE_INDICATORS:
        next(action)

        const data = store.getState().markets[payload.id].data

        // TODO: define indicatrors at store ???
        async.series([

          (cb) => adx(data, {}, cb),
          (cb) => rsi(data, {}, cb),
          (cb) => bb(data, {}, cb),
          (cb) => ema(data, { optInTimePeriod: 9 }, cb),
          (cb) => ema(data, { optInTimePeriod: 21 }, cb)

        ], (err, results) => {
          if (err) { return }
          let indicators = []

          for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].length; j++) {
              if (!indicators[j]) {
                indicators[j] = {}
              }
              indicators[j] = {
                ...indicators[j],
                ...results[i][j]
              }
            }
          }
          store.dispatch(patchIndicators({ id: payload.id, startIndex: 0, indicators: indicators }))
          store.dispatch(runBacktest({ id: payload.id, startIndex: 21 }))
        })
        break;
        
      default:
        next(action)
    }
  }
}
