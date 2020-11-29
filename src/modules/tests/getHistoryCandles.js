'use strict';

const binance = require('../workWithExchange/connectToExchange');
const initData = require('../config/testInitData');

const getHistoryCandles = (obj) => {
	return new Promise((resolve) =>
		binance.candlesticks(
			initData.pair,
			initData.intervalCandles,
			(error, ticks, symbol) => {
				resolve(ticks);
			},
			obj
		)
	);
};

module.exports = getHistoryCandles;
