import talib from 'talib'

function getValuesByProperty(data, name) {
  return data.map((d) => d[name])
}

export default function decorate(data, { startIdx = 0, optInTimePeriod = 20, optInNbDevUp = 2, optInNbDevDn = 2, optInMAType = 2 }, cb) {
  if (!data) return data
  talib.execute({
    name: "BBANDS",
    inReal: getValuesByProperty(data, 'close'),
    startIdx,
    endIdx: data.length - 1,
    optInTimePeriod,
    optInNbDevUp,
    optInNbDevDn,
    optInMAType
  }, function (err, { begIndex, nbElement, result }) {
    if (err) { return cb(err) }
    cb(null, data.map((item, index) => {
      if (index < begIndex) {
        return {
          bb: null
        }
      }
      return {
        bb: {
          upperBand: result.outRealUpperBand[index - begIndex],
          middleBand: result.outRealMiddleBand[index - begIndex],
          lowerBand: result.outRealLowerBand[index - begIndex]
        }
      }
    }))
  })
}
