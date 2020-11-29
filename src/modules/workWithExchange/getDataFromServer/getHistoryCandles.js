'use strict';

const binance = require('../connectToExchange');
const initData = require('../../config/initData');

const getHistoryCandles = () => {
	return new Promise((resolve) =>
		binance.candlesticks(
			initData.pair,
			initData.intervalCandles,
			(error, ticks, symbol) => {
				resolve(ticks);
			},
			{ limit: initData.quantityCandles, endTime: new Date().getTime() }
		)
	);
};

module.exports = getHistoryCandles;
