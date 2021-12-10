// import { showMsg } from '../services/event-bus.service.js';
import { userService } from '../services/user.service.js';

export const userStore = {
	state: {
		user: userService.getLoggedinUser(),
		users: null
	},
	getters: {
		user: (state) => state.user,
		users: (state) => state.users,
	},
	mutations: {
		setUsers(state, { users }) {
			state.users = users;
		},
		logout(state) {
			state.user = null;
		},
		login(state, { user }) {
			state.user = user;
		},
	},
	actions: {
		async loadUsers(context) {
			try {
				const users = await userService.getUsers();
				context.commit({ type: 'setUsers', users });
				return users;
			} catch (err) {
				return err;
			}
		},
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
