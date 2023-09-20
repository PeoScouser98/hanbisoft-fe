String.prototype.capitalize = function () {
	let _this = this;
	_this = _this.trim().replace(/\s+/g, ' ');
	const subString = _this.split(' ');
	const result = subString.map((str) => str.at(0)?.toUpperCase() + str.slice(1).toLowerCase()).join(' ');
	return result;
};
