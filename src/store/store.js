import Vue from 'vue';
import Vuex from 'vuex';
import { groupStore } from './group.store.js';
import { boardStore } from './board.store.js';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: false,
	},
	getters: {
		isLoading: (state) => state.isLoading,
	},
	mutations: {
		setLoading(state, { isLoading }) {
			state.isLoading = isLoading;
		},
	},
	actions: {},
	modules: {
		groupStore,
		boardStore,
	},
});
