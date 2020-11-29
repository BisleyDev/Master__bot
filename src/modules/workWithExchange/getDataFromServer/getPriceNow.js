'use strict';

const binance = require('../connectToExchange');
const initData = require('../../config/initData');

const getPriceNow = () => {
	return new Promise((resolve) => {
		binance.bookTickers(initData.pair, (error, ticker) => {
			resolve(+ticker.bidPrice);
		});
	});
};

module.exports = getPriceNow;
