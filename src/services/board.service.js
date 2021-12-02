// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
const STORAGE_KEY_BOARDS = 'boards';

export const boardService = {
  query,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
  saveGroup,
  saveTask,
  deleteTask,
  saveBoard,
  removeGroup,
};

async function query(filterBy = {}) {
  console.log('', filterBy);
  // let queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`;
  // return httpService.get(`board${queryStr}`)
  let boards = await storageService.query(STORAGE_KEY_BOARDS);
  if (!boards.length) {
    const board = _createBoard();
    boards.push(board);
    saveBoard(board);
  }
  return boards;
}

// BOARD

async function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return await storageService.delete('board', boardId);
}

async function saveBoard(board) {
  // const addedBoard = await httpService.post(`board`, board)
  let savedBoard;
  try {
    if (board._id)
      savedBoard = await storageService.put(STORAGE_KEY_BOARDS, board);
    else savedBoard = await storageService.post(STORAGE_KEY_BOARDS, board);
  } catch (error) {
    console.log('error', error);
  }
  return savedBoard;
}

async function getById(boardId) {
  const boards = await query();
  const board = boards.find(({ _id }) => _id === boardId);
  return board;
}

// Save task

async function saveTask(boardId, task, groupId, activity) {
  const board = await getById(boardId);
  const group = board.groups.find(({ _id }) => _id === groupId);
  if (!task._id) {
    task._id = utilService.makeId();
    group.tasks.push(task);
  } else {
    const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
    group.tasks.splice(idx, 1, task);
  }
  board.activities.unshift(activity);
  saveBoard(board);
  return board;
}

async function deleteTask(boardId, task, groupId, activity) {
  const board = await getById(boardId);
  const group = board.groups.find(({ _id }) => _id === groupId);
  const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
  group.tasks.splice(idx, 1);
  board.activities.unshift(activity);
  saveBoard(board);
  return board;
}

// Save group

async function saveGroup(group, activeBoardId) {
  const board = await getById(activeBoardId);
  // If the group is new
  if (!group._id) {
    group._id = utilService.makeId();
    board.groups.push(group);
    // Update group
  } else {
    const idx = board.groups.findIndex(({ _id }) => _id === group._id);
    board.groups.splice(idx, 1, group);
  }
  saveBoard(board);
  return group;
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balance:13}})
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
  let boards = await storageService.query('board');

  // Dev Helper: Listens to when localStorage changes in OTHER browser
  window.addEventListener('storage', async () => {
    console.log('Storage updated');
    const freshBoards = await storageService.query('board');
    if (freshBoards.length === boards.length + 1) {
      console.log('Board Added - localStorage updated from another browser');
      socketService.emit(
        SOCKET_EVENT_REVIEW_ADDED,
        freshBoards[freshBoards.length - 1]
      );
    }
    boards = freshBoards;
  });
})();

// GET EMPTY

function getEmptyGroup(clr) {
  return { title: 'New Group', _id: '', tasks: [], style: { clr } };
}

function getEmptyTask() {
  return { title: '', _id: '', cmps: {} };
}

function getEmptyActivity() {
  return { txt: '', _id: '', cratedAt: '', byMember: {}, task: {} };
}

function removeGroup(group, activeBoard) {
  try {
    const idx = activeBoard.groups.findIndex(
      (currGroup) => currGroup._id === group._id
    );
    activeBoard.groups.splice(idx, 1);
    saveBoard(activeBoard);
  } catch (error) {
    console.log('error', error);
  }
}

function getEmptyBoard() {
  return {
    title: 'Board',
    createdAt: '',
    _id: '',
    createdBy: {},
    members: [],
    groups: [],
    activities: [],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    cols: [
      { type: 'statusPicker', data: { opts: _getStatusOptions() } },
      {
        type: 'memberPicker',
        data: { opts: [{ name: 'default', display: '', style: {} }] },
      },
      {
        type: 'datePicker',
        data: { opts: [{ name: 'default', display: '', style: {} }] },
      },
    ],

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices lectus vitae lectus accumsan, ac convallis sem ultricies. Aliquam sagittis cursus sollicitudin. Etiam feugiat diam turpis, sit amet finibus ligula malesuada sed. ',
  };
}

// function getEmptyCmp() {
// 	return {};
// }

// Auxiliary functions

function _createBoard() {
  const board = getEmptyBoard();

  board.groups.push(getEmptyGroup('red'));
  board.groups.push(getEmptyGroup('blue'));
  board.groups.push(getEmptyGroup('green'));
  board.groups.forEach((group) => (group._id = utilService.makeId()));
  return board;
}
function _getStatusOptions() {
  return [
    {
      name: 'default',
      display: '',
      style: {
        backgroundColor: 'rgb(196, 196, 196)',
      },
    },
    {
      name: 'stuck',
      display: 'Stuck',
      style: {
        backgroundColor: 'rgb(226, 68, 92)',
      },
    },
    {
      name: 'done',
      display: 'Done',
      style: {
        backgroundColor: 'rgb(0, 200, 117)',
      },
    },
  ];
}
/*
'status-picker': {

},
'member-picker': {
	options: {
		default: {
			display: '',
		},
	},
},
'date-picker': {
	options: {
		default: {
			display: '',
		},
	},
},*/
