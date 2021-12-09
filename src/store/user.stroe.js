// import { showMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user.service.js';

export const userStore = {
	state: {
		user: userService.getLoggedinUser(),
	},
	getters: {
		user: () => userService.getLoggedinUser(),
	},
	mutations: {
		logout(state) {
			state.user = null;
		},
		login(state) {
			state.user = userService.getLoggedinUser();
		}
	},
	actions: {
		async logout(context) {
			try {
				const loggedOut = await userService.logout()
				context.commit({ type: 'logout' });
				return loggedOut;
			} catch (error) {
				console.log('error', error);
			}
		},
		async login(context, { user }) {
			try {
				await userService.login(user)
				context.commit({ type: 'login', user });
			} catch (error) {
				console.log('error', error);
				throw error;
			}

		}
		// async addMention(context, { user }) {
		// },
	},
};
