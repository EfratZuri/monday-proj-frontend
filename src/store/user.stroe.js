// import { showMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user-service.js';

export const userStore = {
	state: {
		user: userService.getLoggedinUser(),
	},
	getters: {
		user: (state) => state.user,
	},
	mutations: {},
	actions: {
		async addMention(context, { user }) {

		},
	},
};
