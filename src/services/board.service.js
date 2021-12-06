// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
import moment from 'moment';
// import { util } from 'vue/types/umd';
const STORAGE_KEY_BOARDS = 'boards';

export const boardService = {
  query,
  removeBoard,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
  getEmptyComment,
  saveGroup,
  saveTask,
  deleteTask,
  saveComment,
  saveBoard,
  removeGroup,
  getBoardAndGroup,
  duplicateGroup,
  moveGroupToBoard,
};

async function query() {
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

async function removeBoard(boardId) {
  // return httpService.delete(`board/${boardId}`)
  await storageService.remove('boards', boardId);
}

async function saveBoard(board) {
  // const addedBoard = await httpService.post(`board`, board)
  let savedBoard;
  try {
    if (!board) board = getEmptyBoard();
    if (board._id) {
      console.log('board', board);
      savedBoard = await storageService.put(STORAGE_KEY_BOARDS, board);
    } else savedBoard = await storageService.post(STORAGE_KEY_BOARDS, board);
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

async function saveTask(boardId, task, groupId) {
  let activity = getEmptyActivity();
  activity.txt = task._id ? 'Edit task' : 'Add task';
  activity.createdAt = moment().fromNow('LT');
  activity._id = utilService.makeId();
  const board = await getById(boardId);
  const group = board.groups.find(({ _id }) => _id === groupId);
  if (!task._id) {
    task._id = utilService.makeId();
    if (task.title === 'New Task') group.tasks.unshift(task);
    else group.tasks.push(task);
  } else {
    const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
    group.tasks.splice(idx, 1, task);
  }
  board.activities.unshift(activity);
  saveBoard(board);
  return board;
}

async function deleteTask(boardId, task, groupId) {
  const board = await getById(boardId);
  const group = board.groups.find(({ _id }) => _id === groupId);
  const idx = group.tasks.findIndex(({ _id }) => _id === task._id);
  group.tasks.splice(idx, 1);
  let activity = getEmptyActivity();
  activity.txt = 'Delete task';
  activity.createdAt = moment().fromNow('LT');
  activity._id = utilService.makeId();
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
    board.groups.unshift(group);
    // Update group
  } else {
    const idx = board.groups.findIndex(({ _id }) => _id === group._id);
    board.groups.splice(idx, 1, group);
  }
  saveBoard(board);
  return group;
}

async function duplicateGroup(group, activeBoard) {
  const board = await getById(activeBoard._id);
  const groupToAdd = JSON.parse(JSON.stringify(group));
  const currGroupIdx = board.groups.findIndex(currGroup => currGroup._id === group._id);
  board.groups.splice(currGroupIdx, 0, groupToAdd)
  try {
    saveBoard(board);
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function moveGroupToBoard(moveDetails, activeBoard) {
  const toBoard = moveDetails.board;
  const { group } = moveDetails;
  const fromBoard = await getById(activeBoard._id);
  const groupIdx = fromBoard.groups.findIndex(currGroup => currGroup._id === group._id)
  toBoard.groups.push(group);
  fromBoard.groups.splice(groupIdx, 1);
  await saveBoard(fromBoard);
  await saveBoard(toBoard);
}

async function saveComment({ comment, boardId, groupId, taskId }) {
  const board = await getById(boardId);
  const group = board.groups.find(({ _id }) => _id === groupId);
  const task = group.tasks.find(({ _id }) => _id === taskId);
  const copyComment = JSON.parse(JSON.stringify(comment));
  copyComment.id = utilService.makeId();
  copyComment.createdAt = new Date(Date.now()).toLocaleString();

  if (!task.comments) task.comments = [];
  task.comments.unshift(copyComment);
  let activity = getEmptyActivity();
  activity.txt = 'Add comment';
  activity.createdAt = moment().fromNow('LT');
  activity._id = utilService.makeId();

  board.activities.unshift(activity);
  saveBoard(board);
  return board;
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
  return { txt: '', _id: '', createdAt: '', byMember: {} };
}

function getEmptyComment() {
  return { txt: '', id: '', createdAt: '', byMember: {} };
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
    title: 'New Board',
    createdAt: new Date(Date.now()).toLocaleString(),
    _id: '',
    createdBy: {},
    members: [],
    groups: [
      getEmptyGroup('rgb(87, 155, 252)'),
      getEmptyGroup('rgb(162, 93, 220)'),
    ],
    activities: [],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker', 'tag-picker'],
    cols: [
      {
        type: 'statusPicker',
        data: {
          opts: _getStatusOptions(),
          default: {
            display: '',
            style: {
              backgroundColor: 'rgb(196, 196, 196)',
            },
          },
        },
      },
      {
        type: 'memberPicker',
        data: { opts: [], default: { members: [] } },
      },
      {
        type: 'datePicker',
        data: { opts: [], default: { dueDate: null } },
      },
      {
        type: 'tagPicker',
        data: {
          opts: [],
          default: [],
        },
      },
    ],

    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices lectus vitae lectus accumsan, ac convallis sem ultricies. Aliquam sagittis cursus sollicitudin. Etiam feugiat diam turpis, sit amet finibus ligula malesuada sed. ',
  };
}

// Auxiliary functions

function getBoardAndGroup(task) {
  console.log(task);
  const boards = query();
  const board = boards.find(({ board }) =>
    board.groups.find(({ group }) => group.include(task))
  );
  console.log(board);
}

function _createBoard() {
  const board = getEmptyBoard();
  board.groups.forEach((group) => (group._id = utilService.makeId()));
  return board;
}
function _getStatusOptions() {
  return [
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
    {
      name: 'working on it',
      display: 'Working on it',
      style: {
        backgroundColor: 'rgb(253, 171, 61)',
      },
    },
  ];
}
