// import { showMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user.service.js';

export const userStore = {
	state: {
		user: userService.getLoggedinUser(),
	},
	getters: {
		user: (state) => state.user,
	},
	mutations: {
		logout(state) {
			state.user = null;
			console.log('state.user', state.user);
		},
		login(state, { user }) {
			state.user = user;
			console.log('state.user', state.user);
		},
	},
	actions: {
		async logout(context) {
			try {
				const loggedOut = await userService.logout();
				context.commit({ type: 'logout' });
				return loggedOut;
			} catch (error) {
				console.log('error', error);
			}
		},
		async login(context, { user }) {
			try {
				await userService.login(user);
				context.commit({ type: 'login', user: userService.getLoggedinUser() });
			} catch (error) {
				console.log('error', error);
				throw error;
			}
		},
		// async addMention(context, { user }) {
		// },
	},
};
