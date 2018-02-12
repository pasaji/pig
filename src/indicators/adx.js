import talib from 'talib'

function getValuesByProperty(data, name) {
  return data.map((d) => d[name])
}

export default function decorate(data, { startIdx = 0, optInTimePeriod = 9 }, cb) {
  if (!data) return data
  talib.execute({
    name: "ADX",
    startIdx,
    endIdx: data.length - 1,
    high: getValuesByProperty(data, 'high'),
    low: getValuesByProperty(data, 'low'),
    close: getValuesByProperty(data, 'close'),
    optInTimePeriod
  }, function (err, { begIndex, nbElement, result }) {
    if (err) { return cb(err) }
    cb(null, data.map((item, index) => {
      if (index < begIndex) {
        return {
          adx: null
        }
      }
      return {
        adx: result.outReal[index - begIndex]
      }
    }))
  })
}
