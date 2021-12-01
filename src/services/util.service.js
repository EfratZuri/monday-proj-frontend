export const utilService = {
	makeId(length = 5) {
		let txt = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < length; i++)
			txt += possible.charAt(Math.floor(Math.random() * possible.length));

		return txt;
	},

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	},

	calcDaysPassed(date1, date2) {
		return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	},

	limitStr(str, limit = 15) {
		return str.length > limit ? str.substr(0, limit) : str;
	},
	// Format Currency
	formatCur(value, currency = 'USD', locale = 'en-Us') {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
		}).format(value);
	},
	getJSON(url, errorMsg = 'Something went wrong') {
		console.log(url);
		return fetch(url).then((response) => {
			if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
			const temp = response.json();
			return temp;
		});
	},
};
