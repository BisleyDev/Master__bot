'use strict';

const binance = require('../workWithExchange/connectToExchange');
const initData = require('../config/testInitData');

const limitPriceChangePercentMax = 12;
const limitPriceChangePercentMin = 6;

const getValuePairs = () => {
	return new Promise((resolve) =>
		binance.prevDay(false, (error, prevDay) => {
			// console.info(prevDay); // view all data
			resolve(prevDay);
		})
	);
};

async function sortPriceChagnePairs() {
	const prevDay = await getValuePairs();
	let theMostTradesPair = [];
	let i = 0;
	for (let obj of prevDay) {
		if (
			(+obj.priceChangePercent < -limitPriceChangePercentMin &&
				+obj.priceChangePercent > -limitPriceChangePercentMax) ||
			(+obj.priceChangePercent > limitPriceChangePercentMin &&
				+obj.priceChangePercent < limitPriceChangePercentMax)
		) {
			theMostTradesPair[i] = obj;
			++i;
			// console.info(" volume:"+obj.volume+" change: "+obj.priceChangePercent+"%");
		}
	}
	theMostTradesPair.sort((a, b) => b.count - a.count);
	//   console.log("theMostTradesPair", theMostTradesPair);

	theMostTradesPair.forEach((block) => {
		if (block.symbol.indexOf('BTC') > 0) {
			console.log(
				`${block.symbol} count: ${block.count} change: ${block.priceChangePercent}%`
			);
		}
	});
}
sortPriceChagnePairs();
