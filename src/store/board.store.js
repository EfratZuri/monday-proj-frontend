// import { showMsg } from '../services/event-bus.service.js';
import { boardService } from '../services/board.service.js';

export const boardStore = {
	state: {
		boards: [],
		boardToEdit: boardService.getEmptyBoard(),
		activeBoard: null,
	},
	getters: {
		boards: (state) => state.boards,
		activeBoard: (state) => state.activeBoard,
		boardToEdit: (state) => state.boardToEdit,
		boardName: (state) => state.boards[0].title,
	},
	mutations: {
		setBoardName(state, { boardName }) {
			state.boardName = boardName;
		},
		addItem(state, { item }) {
			state.board.groups[0].items.unshift(item);
		},
		setBoards(state, { boards }) {
			state.boards = boards;
			state.activeBoard = state.boards[0];
		},
		addBoard(state, { board }) {
			state.boards.unshift(board);
		},
		setActiveBoard(state, { activeBoard }) {
			state.activeBoard = activeBoard;
		},
		saveGroup(state, { group }) {
			const idx = state.activeBoard.groups.findIndex(({ _id }) => _id === group._id);
			// Add a new Group
			if (idx === -1) state.activeBoard.groups.push(group);
			// Update Group
			else state.activeBoard.groups.splice(idx, 1, group);
		},
	},
	actions: {
		async loadBoards({ commit }) {
			commit({ type: 'setLoading', isLoading: true });
			try {
				const boards = await boardService.query();
				if (!boards.length) {
					const board = await boardService.addBoard(boardService.getEmptyBoard());
					boards.push(board);
				}
				commit({ type: 'setBoards', boards });
			} catch (err) {
				return err;
			} finally {
				commit({ type: 'setLoading', isLoading: false });
			}
		},
		async addTask(context, { task }) {
			console.log(context, task);
			try {
				// TODO:
				// const addedTask = await boardService.addTask(task);
				// context.commit({ type: 'addTask', addedTask });
				// return addedTask;
			} catch (e) {
				return e;
			}
		},
		async saveGroup(context, { group }) {
			try {
				const addedGroup = await boardService.saveGroup(group);
				context.commit({ type: 'saveGroup', addedGroup });
				return addedGroup;
			} catch (err) {
				return err;
			}
		},
	},
};
