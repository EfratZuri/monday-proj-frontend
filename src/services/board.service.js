// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
const STORAGE_KEY_BOARDS = 'boards';

export const boardService = {
    query,
    async remove(boardId) {
        // return httpService.delete(`board/${boardId}`)
        return await storageService.delete('board', boardId);
    },
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask() {
        return { title: '', _id: '', cmps: {} };
    },
    getEmptyActivity() {
        return { txt: '', _id: '', cratedAt: '', byMember: {}, task: {} };
    },
    saveGroup(group, activeBoardId) {
        const board = getById(activeBoardId);
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
    },
    saveTask(boardId, groupId, task, activity) {
        const board = getById(boardId);
        const group = board.groups.find(({ _id }) => _id == groupId);
        if (!task._id) {
            task._id = utilService.makeId();
            group.push(task);
        } else {
            const idx = group.findIndex(({ _id }) => _id === task._id);
            group.splice(idx, 1, task);
        }
        board.activities.unshift(activity);
        saveBoard(board);
        return board;
    },
    updateTask(cmpType, data) {
        console.log(cmpType, data);
        // Switch
        // task.members = data;
        // task.status = data;
    },
    saveBoard,
};

function getEmptyBoard() {
    return {
        title: '',
        createdAt: '',
        _id: '',
        createdBy: {},
        members: [],
        groups: [],
        activities: [],
        cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    };
}
async function query(filterBy = {}) {
    console.log('', filterBy);
    // let queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`;
    // return httpService.get(`board${queryStr}`)
    let boards = await storageService.query(STORAGE_KEY_BOARDS);
    console.log(boards);
    if (!boards.length) {
        const board = _createBoard();
        boards.push(board);
        saveBoard(board);
    }
    return boards;
}
async function saveBoard(board) {
    // const addedBoard = await httpService.post(`board`, board)
    const addedBoard = await storageService.post(STORAGE_KEY_BOARDS, board);
    return addedBoard;
}

function getById(boardId) {
    const boards = query();
    const board = boards.find(({ _id }) => _id === boardId);
    return board;
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balance:13}})
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
(async() => {
    let boards = await storageService.query('board');

    // Dev Helper: Listens to when localStorage changes in OTHER browser
    window.addEventListener('storage', async() => {
        console.log('Storage updated');
        const freshBoards = await storageService.query('board');
        if (freshBoards.length === boards.length + 1) {
            console.log('Board Added - localStorage updated from another browser');
            socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshBoards[freshBoards.length - 1]);
        }
        boards = freshBoards;
    });
})();

function getEmptyGroup(clr) {
    return { title: 'New Group', _id: '', tasks: [], style: { clr } };
}

function _createBoard() {
    const board = getEmptyBoard();

    board.groups.push(getEmptyGroup());
    board.groups.push(getEmptyGroup());
    board.groups.push(getEmptyGroup());
    board.groups.forEach((group) => (group._id = utilService.makeId()));
    return board;
}