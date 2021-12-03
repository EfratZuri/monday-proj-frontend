// import { showMsg } from '../services/event-bus.service.js';
import { boardService } from '../services/board.service.js';
import { utilService } from '../services/util.service.js';

export const boardStore = {
  state: {
    boards: [],
    boardToEdit: boardService.getEmptyBoard(),
    activeBoard: null,
    groupClrs: {
      clrs: [
        'rgb(3, 127, 76)',
        'rgb(0, 200, 117)',
        'rgb(156, 211, 38)',
        'rgb(202, 182, 65)',
        'rgb(255, 203, 0)',
        'rgb(120, 75, 209)',
        'rgb(162, 93, 220)',
        'rgb(0, 134, 192)',
        'rgb(102, 204, 255)',
        'rgb(187, 51, 84)',
        'rgb(226, 68, 92)',
        'rgb(255, 21, 138)',
        'rgb(255, 90, 196)',
        'rgb(255, 100, 46)',
        'rgb(253, 171, 61)',
        'rgb(127, 83, 71)',
        'rgb(196, 196, 196)',
        'rgb(128, 128, 128)',
      ],
      curClrIdx: 0,
    },
    groupToEdit: boardService.getEmptyGroup('#579bfc'),
    taskToEdit: boardService.getEmptyTask(),
  },
  getters: {
    boards: (state) => state.boards,
    activeBoard: (state) => state.activeBoard,
    cmpsOrder: (state) => state.activeBoard.cmpsOrder,
    cols: (state) => state.activeBoard.cols,
    cmps: (state) => state.activeBoard?.cmp,
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

    addTask(state, { boardId, groupId, task }) {
      const board = state.boards.find((board) => board._id === boardId);
      const group = board.groups.find(({ _id }) => _id === groupId);
      const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
      if (!task._id) group.tasks.push(task);
      else group.tasks.splice(idx, 1, task);
    },

    deleteTask(state, { boardId, groupId, task }) {
      const board = state.boards.find((board) => board._id === boardId);
      const group = board.groups.find(({ _id }) => _id === groupId);
      const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
      group.tasks.splice(idx, 1);
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
      console.log('%%%%');
      if (!details) {
        details = {};
        details.groupId = context.state.activeBoard.groups[0]._id;
        details.task = { title: 'New Task' };
      }
      let task = JSON.parse(JSON.stringify(details.task));
      // boardService.getBoardAndGroup(task);
      try {
        const newBoard = await boardService.saveTask(
          context.state.activeBoard._id,
          task,
          details.groupId,
          'add new task'
        );

        context.commit({
          type: 'addTask',
          boardId: context.state.activeBoard._id,
          task,
          groupId: details.groupId,
        });
        return newBoard;
      } catch (err) {
        return err;
      }
    },
    async deleteTask(context, { details }) {
      const task = JSON.parse(JSON.stringify(details.task));
      try {
        const newBoard = await boardService.deleteTask(
          context.state.activeBoard._id,
          task,
          details.groupId,
          'delete task'
        );

        context.commit({
          type: 'deleteTask',
          boardId: context.state.activeBoard._id,
          task,
          groupId: details.groupId,
        });
        return newBoard;
      } catch (err) {
        return err;
      }
    },
    // async saveTaskFromHeader(context,{task}) {
    //   if(!task)
    //   console.log(context);
    // },

    async saveGroup(context, { group }) {
      if (!group) {
        const groupColorId = utilService.getRandomInt(
          0,
          context.state.groupClrs.clrs.length - 1
        );
        group = boardService.getEmptyGroup(
          context.state.groupClrs.clrs[groupColorId]
        );
      }
      try {
        const addedGroup = await boardService.saveGroup(
          group,
          context.state.activeBoard._id
        );
        context.commit({ type: 'saveGroup', group: addedGroup });
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
    removeGroup(context, { group }) {
      const activeBoard = context.getters.activeBoard;
      try {
        boardService.removeGroup(group, activeBoard);
      } catch (error) {
        console.log('error', error);
      }
    },
  },
};
