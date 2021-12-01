// import { showMsg } from '../services/event-bus.service.js';
import { boardService } from '../services/board.service.js';

export const boardStore = {
    state: {
        boards: [],
        boardToEdit: boardService.getEmptyBoard(),
        activeBoard: null,
        groupClrs: {
            clrs: ['#579bfc', '#a25ddc', '#66ccff', '#ff642e', '#bb3354'],
            curClrIdx: 0,
        },
        groupToEdit: boardService.getEmptyGroup('#579bfc'),
    },
    getters: {
        boards: (state) => state.boards,
        activeBoard: (state) => state.activeBoard,
        boardToEdit: (state) => state.boardToEdit,
        groupToEdit: (state) => state.groupToEdit,
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
            const idx = state.activeBoard.groups.findIndex(
                ({ _id }) => _id === group._id
            );
            // Add a new Group
            if (idx === -1) {
                state.activeBoard.groups.push(group);
                state.groupClrs.curClrIdx++;
                if (state.groupClrs.curClrIdx >= state.groupClrs.clrs.length)
                    state.groupClrs.curClrIdx = 0;

                state.groupToEdit = boardService.getEmptyGroup(
                    state.groupClrs.clrs[state.groupClrs.curClrIdx]
                );
            }
            // Update Group
            else state.activeBoard.groups.splice(idx, 1, group);
        },
    },
    actions: {
        async loadBoards({ commit }) {
            commit({ type: 'setLoading', isLoading: true });
            try {
                const boards = await boardService.query();
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
                const newTask = await boardService.saveTask(task);
                context.commit({ type: 'addTask', newTask });
                return newTask;
            } catch (err) {
                return err;
            }
        },
        async saveGroup(context, { group }) {
            try {
                const addedGroup = await boardService.saveGroup(
                    group,
                    context.activeBoard._id
                );
                context.commit({ type: 'saveGroup', addedGroup });
                return addedGroup;
            } catch (err) {
                return err;
            }
        },
    },
};