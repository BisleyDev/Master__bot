'use strict';

const getLastCompliteTrades = require('./getLastCompliteTrade');

const { firstCoin } = require('../config/initData');

async function checktradeHistory() {
	const tradeHistory = await getLastCompliteTrades();
	let summCoinsBeforeOrders = 0;
	for (
		let i = 0;
		tradeHistory[i].isBuyer === tradeHistory[i + 1].isBuyer;
		i++
	) {
		isBuyerBeforeOrders += +tradeHistory[i].qty;
	}
	console.info(`summCoins ${firstCoin}:  ${summCoinsBeforeOrders}`);
	return summCoinsBeforeOrders;

	// const tradeHistory = await getLastCompliteTrades();
	// const lastTrade = tradeHistory[0];
	// let summCoins = 0;

	// if (active === firstCoin) {
	// 	if (lastTrade.isBuyer) {
	// 		for (let i = 0; i < tradeHistory.length; i++) {
	// 			let tradeBefore = tradeHistory[i - 1];
	// 			let trade = tradeHistory[i];
	// 			if (trade.isBuyer) {
	// 				summCoins += +trade.qty;
	// 			} else {
	// 				summCoins -= +tradeBefore.qty;
	// 				break;
	// 			}
	// 		}
	// 		console.info(`summCoins ${firstCoin}:  ${summCoins}`);
	// 		return summCoins;
	// 	} else {
	// 		return 0;
	// 	}
	// } else if (!lastTrade.isBuyer) {
	// 	for (let i = 0; i < tradeHistory.length; i++) {
	// 		let tradeBefore = tradeHistory[i - 1];
	// 		let trade = tradeHistory[i];
	// 		if (!trade.isBuyer) {
	// 			summCoins += +trade.qty;
	// 		} else {
	// 			summCoins -= +tradeBefore.qty;
	// 			break;
	// 		}
	// 	}
	// 	console.info(`summCoins ${secondCoin}:  ${summCoins}`);
	// 	return summCoins;
	// } else {
	// 	return 0;
	// }
}

module.exports = checktradeHistory;
