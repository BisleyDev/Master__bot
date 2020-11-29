'use strict';

const binance = require('../connectToExchange');
const initData = require('../../config/initData');
const sendInTelegram = require('../../utils/sendInTelegram');
const writeLog = require('../../utils/writeLog');

const buy = (quantity, price, text) => {
	return new Promise(() => {
		binance.marketBuy(initData.pair, quantity);
		let message = `Buy ${text}: ${initData.pair} \n Quantity: ${quantity} \n	Price: ${price}`;
		sendInTelegram(message);
		writeLog('log.txt', message);
	});
};

const sell = (quantity, price, text) => {
	return new Promise(() => {
		binance.marketSell(initData.pair, quantity);
		let message = `Sell ${text}: ${initData.pair} \n Quantity: ${quantity} \n	Price: ${price}`;
		sendInTelegram(message);
		writeLog('log.txt', message);
	});
};

module.exports = { buy, sell };
