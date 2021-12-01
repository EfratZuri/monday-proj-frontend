// import { showMsg } from '../services/event-bus.service.js';
import { groupService } from '../services/group.service.js';

export const groupStore = {
	state: {
		groups: [],
		groupColors: {
			colors: ['#579bfc', '#a25ddc', '#66ccff', '#ff642e', '#bb3354'],
			curColorIdx: 0,
		},
		groupToEdit: groupService.getEmptyGroup('#579bfc'),
	},
	getters: {
		groups: (state) => state.groups,
		groupToEdit: (state) => state.groupToEdit,
	},
	mutations: {
		setGroups(state, { groups }) {
			state.groups = groups;
		},
		addGroup(state, { group }) {
			state.board.groups.unshift(group);
			state.groupColors.curColorIdx++;
			if (state.groupColors.curColorIdx >= state.groupColors.colors.length)
				state.groupColors.curColorIdx = 0;
			const curIdx = state.groupColors.curColorIdx;
			state.groupToEdit = groupService.getEmptyGroup(state.groupColors.colors[curIdx]);
		},
	},
	actions: {
		async loadGroups(context, { boardId }) {
			try {
				const groups = await groupService.query(boardId);
				context.commit({ type: 'setGroups', groups });
				return groups;
			} catch (err) {
				return err;
			}
		},
		async addGroup(context, { group }) {
			try {
				const addedGroup = await groupService.add(group);
				context.commit({ type: addedGroup, addedGroup });
				return addedGroup;
			} catch (err) {
				return err;
			}
		},
	},
};
