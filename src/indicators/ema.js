import talib from 'talib'

// var function_desc = talib.explain("RSI");
// console.dir(function_desc);

function getValuesByProperty(data, name) {
  return data.map((d) => d[name])
}

export default function decorate(data, { startIdx = 0, optInTimePeriod = 9}, cb) {
  if (!data) return data
  talib.execute({
    name: "EMA",
    inReal: getValuesByProperty(data, 'close'),
    startIdx,
    endIdx: data.length - 1,
    optInTimePeriod
  }, function (err, { begIndex, nbElement, result }) {
    if (err) { return cb(err) }
    cb(null, data.map((item, index) => {
      if (index < begIndex) {
        return {
          ['ema' + optInTimePeriod]: null
        }
      }
      return {
        ['ema' + optInTimePeriod]: result.outReal[index - begIndex]
      }
    }))
  })
}
