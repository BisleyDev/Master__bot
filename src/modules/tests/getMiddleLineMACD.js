'use strict';

function getMiddleLineMACD(array) {
	array = array.slice(-350);

	let arrayPlusValues = array.filter(item => item > 0);	
	let arrayMinusValues = array.filter(item => item < 0);

	if(arrayPlusValues.length === 0) {
		arrayPlusValues[0] = 0;
	} else if(arrayMinusValues) {
		arrayMinusValues[0] = 0;
	}

	let middleLinePlus = (arrayPlusValues.reduce((max, item) => max + item)) / arrayPlusValues.length;
	let middleLineMinus = (arrayMinusValues.reduce((max, item) => max - item)) / arrayMinusValues.length;
	return {middleLinePlus, middleLineMinus};
}

module.exports = getMiddleLineMACD;


