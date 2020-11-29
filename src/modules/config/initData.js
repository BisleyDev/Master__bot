'use strict';

const initData = {
	//
	firstCoin: 'BNB',
	secondCoin: 'ETH',
	intervalCandles: '5m',
	quantityCandles: 500,
	// Parameters indicator MACD
	minLimitSignalMACD: 0.0005,
	fastPeriodMACD: 26,
	slowPeriodMACD: 52,

	interestRate: 0.15,
};

initData.pair = initData.firstCoin + initData.secondCoin;

module.exports = initData;
