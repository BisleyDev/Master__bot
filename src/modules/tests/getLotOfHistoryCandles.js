'use strict';

const getHistoryCandles = require('./getHistoryCandles');
const initData = require('../config/testInitData');
const timeInterval = require('../utils/timeInterval');

//  Что бы получить к-ство свечей в дней, посчитал сколько секунд в сутках
//  и разделил на секунды в 1 свече
const quantityCandlesInOneDay =
	(24 * 60 * 60) / (timeInterval.timeOneCandleMiliseconds / 1000);

let needCycle = Math.floor(
	(quantityCandlesInOneDay * initData.testDayHistoryCandles) /
		initData.quantityCandles
);
let obj = { limit: initData.quantityCandles, endTime: new Date().getTime() };

async function test(summ, i, timeFinishOneCycle) {
	let summArray = summ;
	if (i == 0) {
		return summArray;
	} else {
		let history = await getHistoryCandles(timeFinishOneCycle);
		summArray = history.concat(summ);

		let time = history[0][0] - timeInterval.timeOneCandleMiliseconds;
		let obj = { limit: initData.quantityCandles, endTime: time };
		--i;
		return test(summArray, i, obj);
	}
}

async function getLotOfHistoryCandles() {
	let LotOfHistoryCandles = await test([], needCycle, obj);
	return LotOfHistoryCandles;
}

module.exports = getLotOfHistoryCandles;
