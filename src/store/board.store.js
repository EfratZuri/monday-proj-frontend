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
    taskToEdit: boardService.getEmptyTask(),
  },
  getters: {
    boards: (state) => state.boards,
    activeBoard: (state) => state.activeBoard,
    cmps: (state) => state.activeBoard.cmps,
    // cmps: (state) => state.activeBoard ? .cmp,
    boardToEdit: (state) => state.boardToEdit,
    groupToEdit: (state) => state.groupToEdit,
    taskToEdit: (state) => state.taskToEdit,
    boardName: (state) => state.activeBoard.title,
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

    addTask(state, { newBoard }) {
      const idx = state.boards.findIndex(({ _id }) => _id === newBoard._id);
      state.boards.splice(idx, 1, newBoard);
    },
  },
  actions: {
    async loadBoards(context) {
      context.commit({ type: 'setLoading', isLoading: true });
      try {
        const boards = await boardService.query();
        if (!context.state.activeBoard)
          context.commit({ type: 'setActiveBoard', board: boards[0] });

        context.commit({ type: 'setBoards', boards });
      } catch (err) {
        return err;
      } finally {
        context.commit({ type: 'setLoading', isLoading: false });
      }
    },
    async addTask(context, { details }) {
      try {
        const copyTask = JSON.parse(JSON.stringify(details.task));
        const newBoard = await boardService.saveTask(
          context.state.activeBoard._id,
          copyTask,
          details.groupId,
          'add new task'
        );

        console.log(newBoard);

        context.commit({ type: 'addTask', newBoard });
        return newBoard;
      } catch (err) {
        return err;
      }
    },
    async saveGroup(context, { group }) {
      try {
        const addedGroup = await boardService.saveGroup(
          group,
          context.state.activeBoard._id
        );
        context.commit({ type: 'saveGroup', addedGroup });
        return addedGroup;
      } catch (err) {
        return err;
      }
    },
    async saveBoard(context, { board }) {
      console.log('board', board);
      try {
        const addedBoard = await boardService.saveBoard(board);
        return addedBoard;
      } catch (err) {
        return err;
      }
    },
  },
};
