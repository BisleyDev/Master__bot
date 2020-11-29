'use strict';

const binance = require('../connectToExchange');


const getBalanceCoin = (coin) => {
	return new Promise(resolve => {
		binance.balance((error, balances) => {
			const balanceOneCoin = balances[coin];
			resolve(balanceOneCoin.available);
		});
	});
};

module.exports = getBalanceCoin;