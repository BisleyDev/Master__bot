'use strict';

const { interestRate, firstCoin, secondCoin } = require('../config/initData');
const getBalance = require('../../modules/workWithExchange/getDataFromServer/getBalanceCoin');
const getPrice = require('../workWithExchange/getDataFromServer/getPriceNow');
const checkTradeHistory = require('./checkTradeHistory');
const {
	buy,
	sell,
} = require('../workWithExchange/getDataFromServer/MarketBuySell');
const getLastCompliteTrades = require('./getLastCompliteTrade');

async function placeOrder(signal) {
	const price = await getPrice();
	/* Средства, которые на данный момент выполнились в сделке  */
	const summCoinsBeforeOrders = await checkTradeHistory();
	const tradesHistory = await getLastCompliteTrades();
	const isBuyerBeforeOrders = tradesHistory[0].isBuyer;
	const valueLastOrder = tradesHistory[0].qty;

	if (signal === 'short') {
		console.log('short', price);
		if (summCoinsBeforeOrders && isBuyerBeforeOrders) {
			const quantity = summCoinsBeforeOrders.toFixed(7);
			sell(quantity, price, 'active Founds');
		} else if (summCoinsBeforeOrders && !isBuyerBeforeOrders) {
			const rate = (valueLastOrder * 1.1).toFixed(7);
			sell(rate, price, 'new deal');
			return;
		}
		const quantityCoinInWallet = await getBalance(firstCoin);
		const rate = +(quantityCoinInWallet * interestRate).toFixed(7);
		sell(rate, price, 'new trend');
	}

	if (signal === 'long') {
		console.log('long', price);
		if (summCoinsBeforeOrders && !isBuyerBeforeOrders) {
			const quantity = summCoinsBeforeOrders.toFixed(7);
			buy(quantity, price, 'active Founds');
		} else if (summCoinsBeforeOrders && isBuyerBeforeOrders) {
			const rate = (valueLastOrder * 1.1).toFixed(7);
			buy(rate, price, 'new deal');
			return;
		}
		const quantityCoinInWallet = await getBalance(firstCoin);
		const rate = +(quantityCoinInWallet * interestRate).toFixed(7);
		buy(rate, price, 'new trend');
	}

	// if (signal === 'short') {
	// 	console.log('short', price);

	// 	if (activeFundsFirstCoin > 0) {
	// 		const quantity = +activeFundsFirstCoin.toFixed(7);
	// 		await sell(quantity, price, 'active Founds');

	// 		const quantityCoinInWallet = await getBalance(firstCoin);
	// 		console.info(`Total coins: ${firstCoin} ${quantityCoinInWallet}`);
	// 		const rate = +(quantityCoinInWallet * interestRate).toFixed(7);
	// 		sell(rate, price, 'new trend');
	// 		return;
	// 	} else if (valueLastOrder) {
	// 		const rate = (valueLastOrder * 1.1).toFixed(7);
	// 		sell(rate, price, 'new deal');
	// 	} else {
	// 		const rate = rateCoinForWallet(secondCoin);
	// 		sell(rate, price, 'first order');
	// 	}
	// } else if (signal === 'long') {
	// 	console.log('long', price);

	// 	if (activeFundsSecondCoin > 0) {
	// 		const quantity = (+activeFundsSecondCoin / price).toFixed(7);
	// 		await buy(quantity, price, 'active Founds');
	// 		const rate = await rateCoinForWallet(secondCoin);
	// 		buy(rate, price, 'new trend');
	// 	} else if (valueLastOrder) {
	// 		const rate = (valueLastOrder * 1.1).toFixed(7);
	// 		buy(rate, price, 'new deal');
	// 	} else {
	// 		const rate = await rateCoinForWallet(secondCoin);
	// 		buy(rate, price, 'first order');
	// 	}
	// }

	// async function rateCoinForWallet(coin) {
	// 	const quantityCoinInWallet = await getBalance(coin);
	// 	const price = await getPrice();

	// 	console.info(`Total coins: ${coin} ${quantityCoinInWallet}`);

	// 	const rate = +((quantityCoinInWallet * interestRate) / price).toFixed(7);
	// 	return rate;
	// }
}
module.exports = placeOrder;
