export default function({ data, index }, cb) {
  const item = data[index]
  if (!item) {
    return cb('undefined item')
  }

  const overbought = item.rsi > 70
  const oversold = item.rsi < 30

  if (overbought) {
    cb(null, { action: 'sell', index: index })
  } else if (oversold) {
    cb(null, { action: 'buy', index: index })
  } else {
    cb(null, {})
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
