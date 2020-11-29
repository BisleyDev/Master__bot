'use strict';

const initData = require('../config/testInitData');

/* Средства, которые на данный момент выполнились в сделке  */
let activeFundsFirstCoin = 0;
let activeFundsSecondCoin = 0;

let quantityFirstCoinInWallet = initData.testValueFirstCoinOnWallet;
let quantitySecondCoinInWallet = initData.testValueSecondCoinOnWallet;

function testPlaceOrder(signal, price, date) {
	const interestRate = initData.interestRate; /*Процент ставки  */

	if (signal == 'short') {
		console.log('short', price, date);

		if (activeFundsFirstCoin > 0) {
			// quantityFirstCoinInWallet -= activeFundsFirstCoin;
			quantitySecondCoinInWallet += activeFundsFirstCoin * price;
			// console.log(
			// 	`activeFundsFirstCoin coins: ${initData.firstCoin} ${activeFundsFirstCoin}`
			// );
			// console.log(
			// 	`activeFundsSecondCoin coins: ${initData.secondCoin} ${activeFundsSecondCoin}`
			// );
			activeFundsFirstCoin = 0;
		}
		let rate = +(quantityFirstCoinInWallet * interestRate).toFixed(7);
		quantityFirstCoinInWallet -= rate;
		// quantitySecondCoinInWallet += rate * price;
		activeFundsSecondCoin += rate * price;
		// console.log(
		// 	`           ${initData.firstCoin} ${quantityFirstCoinInWallet}`
		// );
		// console.log(
		// 	`           ${initData.secondCoin} ${quantitySecondCoinInWallet}`
		// );
	} else if (signal == 'long') {
		console.log('long', price, date);

		if (activeFundsSecondCoin > 0) {
			quantityFirstCoinInWallet += activeFundsSecondCoin / price;
			// quantitySecondCoinInWallet -= activeFundsSecondCoin;
			// console.log(
			// 	`activeFundsFirstCoin coins: ${initData.firstCoin} ${activeFundsFirstCoin}`
			// );
			// console.log(
			// 	`activeFundsSecondCoin coins: ${initData.secondCoin} ${activeFundsSecondCoin}`
			// );
			activeFundsSecondCoin = 0;
		}
		let rate = +((quantitySecondCoinInWallet * interestRate) / price).toFixed(
			7
		);
		// quantityFirstCoinInWallet += rate;
		quantitySecondCoinInWallet -= rate * price;
		activeFundsFirstCoin += rate;
		// console.log(
		// 	`           ${initData.firstCoin} ${quantityFirstCoinInWallet}`
		// );
		// console.log(
		// 	`           ${initData.secondCoin} ${quantitySecondCoinInWallet}`
		// );
	}
	let results = {
		qCoin1: quantityFirstCoinInWallet,
		qCoin2: quantitySecondCoinInWallet,
		aCoin1: activeFundsFirstCoin,
		aCoin2: activeFundsSecondCoin,
	};

	return results;
}

module.exports = testPlaceOrder;
