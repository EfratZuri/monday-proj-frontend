// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';
const STORAGE_KEY_GROUPS = 'groups';
export const groupService = {
	addGroup,
	query,
	update,
	remove,
	getEmptyGroup(color = '#111') {
		return { name: 'New Group', color, tasks: [], boardId: '', _id: '' };
	},
};

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})
async function addGroup(group) {
	const addedGroup = await storageService.post(STORAGE_KEY_GROUPS, group);
	return addedGroup;
}
async function update(group) {
	const updatedGroup = await storageService.put(STORAGE_KEY_GROUPS, group);
	return updatedGroup;
}

async function query(boardId) {
	// let queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`;
	// return httpService.get(`group${queryStr}`)

	const groups = await storageService.query(STORAGE_KEY_GROUPS);
	return groups.filter((group) => group.boardId === boardId);
}

function remove(groupId) {
	// return httpService.delete(`group/${groupId}`)
	return storageService.delete('group', groupId);
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
	let groups = await storageService.query('group');

	// Dev Helper: Listens to when localStorage changes in OTHER browser
	window.addEventListener('storage', async () => {
		console.log('Storage updated');
		const freshGroups = await storageService.query('group');
		if (freshGroups.length === groups.length + 1) {
			console.log('Group Added - localStorage updated from another browser');
			socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshGroups[freshGroups.length - 1]);
		}
		groups = freshGroups;
	});
})();
