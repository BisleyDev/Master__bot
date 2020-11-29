'use strict';

const talib = require('../../../node_modules/talib/build/Release/obj.target/talib');


function getValuesIndicatorMACD(valueCloseCandles, initData) {
    let valuesIndicatorMACD = talib.execute({
        name: "MACD",
        startIdx: 0,
        endIdx: valueCloseCandles.length - 1,
        inReal: valueCloseCandles,
        optInFastPeriod: initData.fastPeriodMACD,
        optInSlowPeriod: initData.slowPeriodMACD,
        optInSignalPeriod: 10
    });
    return valuesIndicatorMACD.result;
}

module.exports = getValuesIndicatorMACD;