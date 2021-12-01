// const axios = require('axios');
const Axios = require('axios');
let axios = Axios.create({ withCredentials: true });

const STORAGE_KEY = 'loggedinUser';

export const userService = {
	getLoggedinUser() {
		return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
	},
	logout: () => {
		return axios.post('/logout').then(() => sessionStorage.removeItem(STORAGE_KEY));
	},
	login: async ({ nickname, password }) => _connectUser('login', { nickname, password }),
	signup: async ({ nickname, password }) => _connectUser('signup', { nickname, password }),
};

async function _connectUser(urlType, logData) {
	try {
		const res = await axios.post(_getUrl(`${urlType}`), logData);
		_saveToStorage(res.data.data.user);
		return res.data.data.user;
	} catch (err) {
		console.log(err);
	}
}

function _getUrl(type = '') {
	const BASE_URL = `${
		process.env.NODE_ENV !== 'development' ? '' : '//localhost:8020'
	}/api/v1/users`;
	return `${BASE_URL}/${type}`;
}

function _saveToStorage(user) {
	sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

// Old version
// export const userService = {
// 	getLoggedinUser: () => {
// 		return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
// 	},

// 	login: (nickname) => {
// 		return axios
// 			.post('/login', { nickname })
// 			.then(({ data }) => data)
// 			.then((user) => {
// 				console.log('got user', user);
// 				sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nickname));
// 			});
// 	},
// 	logout: () => {
// 		// TODO: use axios
// 		return axios.post('/logout').then(() => {
// 			sessionStorage.removeItem(STORAGE_KEY);
// 		});
// 	},
// };
