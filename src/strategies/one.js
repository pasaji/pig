import { getMarket } from '../modules/markets'

export default function({ state, exchange, market, backtest }, cb) {

  if (!state) { return cb('state undefined') }
  if (!market) { return cb('market undefined') }

  const data = getMarket(state, exchange, market).data

  let index = data.length - 1

  if (backtest) {
    if (!isNaN(backtest.index)) {
      index = backtest.index
    }     
  }

  const item = data[index]

  if (!item) {
    return cb('undefined item')
  }

  const overbought = item.rsi > 70
  const oversold = item.rsi < 30
  const upperBandOverflow = item.high > item.bb.upperBand
  const lowerBandOverflow = item.low < item.bb.lowerBand

  const { USDT, ETH } = state.trader.balances

  if (overbought && upperBandOverflow && ETH > 0.001) {
    cb(null, {
      type: 'sell',
      exchange,
      market,
      amount: ETH,
      price: item.close,
      backtest: backtest,
      message: 'overbought && upper band overflow'
    })
  } else if (oversold && lowerBandOverflow && USDT > 0.1) {
    cb(null, {
      type: 'buy',
      exchange,
      market,
      amount: (0.9985 * USDT) / item.close,
      price: item.close,
      backtest: backtest,
      message: 'oversold && lower band overflow'
    })
  } else {
    cb(null, {
      type: 'wait',
      exchange,
      market,
      message: 'ZZz'
    })
  }
}

// RMI / CCI
// "overbought"
// "overboughtCount"
// "overboughtAvg"
// "oversold"
// "oversoldCount"
// "oversoldAvg"
// Strength
// ADX, +DMI, +DMI https://www.investopedia.com/articles/trading/07/adx-trend-indicator.asp

// EMA9
// EMA21



// Bollinger band
