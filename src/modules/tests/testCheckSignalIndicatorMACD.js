'use strict';

const initData = require('../config/testInitData');
const placeOrder = require('./testPlaceOrder');

const upperLimitMACD = initData.minLimitSignalMACD;
const lowerLimitMACD = -upperLimitMACD;
const delayBetweenArrayMACDAndServerData = 60;

function testCheckSignalIndicatorMACD(
	valuesIndicatorMACD,
	arrayClosePrice,
	dateMiliSeconds
) {
	const fastValue = valuesIndicatorMACD.outMACD;
	const slowValue = valuesIndicatorMACD.outMACDSignal;

	for (let i = 120; i < fastValue.length - 1; i++) {
		if (
			fastValue[i - 1] > upperLimitMACD &&
			slowValue[i - 1] > upperLimitMACD &&
			fastValue[i - 1] > slowValue[i - 1] &&
			fastValue[i] < slowValue[i]
		) {
			let date = new Date(
				dateMiliSeconds[i + delayBetweenArrayMACDAndServerData]
			);
			placeOrder(
				'short',
				arrayClosePrice[i + delayBetweenArrayMACDAndServerData],
				date.toString()
			);
		} else if (
			slowValue[i - 1] < lowerLimitMACD &&
			slowValue[i - 1] < lowerLimitMACD &&
			fastValue[i - 1] < slowValue[i - 1] &&
			fastValue[i] > slowValue[i]
		) {
			let date = new Date(
				dateMiliSeconds[i + delayBetweenArrayMACDAndServerData]
			);
			placeOrder(
				'long',
				arrayClosePrice[i + delayBetweenArrayMACDAndServerData],
				date.toString()
			);
		}
	}
}

module.exports = testCheckSignalIndicatorMACD;
