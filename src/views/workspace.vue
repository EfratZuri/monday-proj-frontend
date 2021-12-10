<template>
	<div
		class="workspace"
		:class="[{ 'control-open': showControlContent }, { 'dark-app-theme': isDarkMode }]"
	>
		<surface-control />
		<control-content
			@toggleOpen="toggleOpenControl"
			@add="addBoard"
			@showBoard="showBoard"
			@removeBoard="removeBoard"
			@saveBoard="saveBoard"
			:boards="boards"
			:activeBoard="activeBoard"
		/>
		<div class="workspace-content" :class="{ selected: isTaskSelected }">
			<div v-if="isLoading" class="loading-img">
				<img src="https://cdn.monday.com/images/loader/loader.gif" />
			</div>

			<div v-else>
				<boardHeader
					:activeBoard="activeBoard"
					@addTask="saveTask"
					@saveBoard="saveBoard"
					@addGroup="addGroup"
				/>
				<button class="btn" @click="toggleDarkMode">dark mode</button>
				<group-list
					:board="activeBoard"
					:boards="boards"
					@addGroup="addGroup"
					@removeGroup="openModal"
					@moveToBoard="moveGroupToBoard"
					@saveTask="saveTask"
					@deleteTask="openModal"
					@saveGroup="saveGroup"
					@saveComment="saveComment"
					@setSelected="setSelected"
					@addColumn="addColumn"
					@saveBoardCol="saveBoardCol"
				/>
				<user-msg v-if="msg" :msg="msg" @closeUserMsg="closeUserMsg" />
				<selected-task
					v-if="tasks.length"
					:tasks="tasks"
					@close="closeTaskSelected"
					@deleteTaskSelected="deleteTaskSelected"
					@duplicateTaskSelected="duplicateTaskSelected"
				/>
				<confirm-modal
					:modal="modal"
					v-if="modal.isOpen"
					@closeModal="modal.isOpen = false"
					@deleteAction="deleteAction"
				/>

				<dashboard v-if="isDashboard" />
				<!-- <task-update
			<div v-else>
				<boardHeader
					:activeBoard="activeBoard"
					@addTask="saveTask"
					@saveBoard="saveBoard"
					@addGroup="addGroup"
				/>
				<groupList
					:board="activeBoard"
					:boards="boards"
					@addGroup="addGroup"
					@removeGroup="removeGroup"
					@saveTask="saveTask"
					@deleteTask="deleteTask"
					@saveGroup="saveGroup"
					@saveComment="saveComment"
				/>
					v-if="showPostPanel"
					:task="task"
					@closePanel="togglePostPanel"
					@saveUpdate="saveUpdate"
				/> -->
			</div>
		</div>
	</div>
</template>

<script>
import surfaceControl from '@/components/surface-control';
import controlContent from '@/components/control-content';
// import { utilService } from '../services/util.service.js';
import boardHeader from '@/components/board-header';
import groupList from '@/components/group-list';
import selectedTask from '@/components/selected-task.vue';
import userMsg from '@/components/user-msg.vue';
import socketService from '../services/socket.service.js';
import confirmModal from '@/components/confirm-modal.vue';

import dashboard from '@/components/dashboard';

export default {
	name: 'workspace',
	data() {
		return {
			showControlContent: false,
			tasks: [],
			task: null,
			group: null,
			groupId: null,
			msg: '',
			isTaskSelected: false,
			modal: { txt: '', isOpen: false },
			isDashboard: false,
			isDarkMode: false,
		};
	},
	async created() {
		await this.$store.dispatch({ type: 'loadBoards' });
		window.socketService.setup();
		window.socketService.emit('board topic', this.activeBoard._id);
		window.socketService.on('board saved', (board) => {
			console.log('hey from socket');
			this.saveBoard(board);
		});
		await this.$store.dispatch({ type: 'loadUsers' });
		// console.log(
		// 	'example',
		// 	this.$store.groupClrs.clrs[utilService.getRandomInt(0, this.$store.groupClrs.clrs.length)]
		// );
	},
	computed: {
		isLoading() {
			return this.$store.getters.isLoading;
		},
		boards() {
			return this.$store.getters.boards;
		},
		activeBoard() {
			return this.$store.getters.activeBoard;
		},
		loggedinUser() {
			return this.$store.getters.user;
		},
	},
	methods: {
		toggleDarkMode() {
			this.isDarkMode = !this.isDarkMode;
		},
		saveBoardCol(details) {
			this.$store.dispatch({ type: 'saveBoardCol', details });
		},
		addColumn(columnType) {
			this.$store.dispatch({ type: 'addColumn', columnType });
		},
		async saveTask(details = null) {
			console.log('savetask from workspace');
			await this.$store.dispatch({ type: 'saveTask', details });
			this.sendSocket(this.activeBoard);
		},
		async addGroup(group) {
			await this.$store.dispatch({ type: 'saveGroup', group });
			this.sendSocket(this.activeBoard);
		},
		removeGroup(group) {
			this.showMsg('We successfully deleted 1 group');
			this.$store.dispatch({ type: 'removeGroup', group });
		},
		saveBoard(board) {
			this.$store.dispatch({ type: 'saveBoard', board });
		},
		async deleteTask(task, groupId) {
			this.showMsg('We successfully deleted task');
			await this.$store.dispatch({
				type: 'deleteTask',
				details: { task, groupId },
			});
		},
		saveGroup(group) {
			this.$store.dispatch({ type: 'saveGroup', group });
		},
		moveGroupToBoard(moveDetails) {
			this.$store.dispatch({ type: 'moveGroupToBoard', moveDetails });
		},
		toggleOpenControl() {
			this.showControlContent = !this.showControlContent;
		},
		addBoard() {
			this.$store.dispatch({ type: 'saveBoard' });
		},
		saveComment(details) {
			this.$store.dispatch({ type: 'saveComment', details });
		},
		showBoard(board) {
			this.$store.commit({ type: 'setActiveBoard', activeBoard: board });
		},
		removeBoard(board) {
			this.$store.dispatch({ type: 'removeBoard', board });
		},
		setSelected(task, boolean) {
			if (boolean) this.tasks.push(task);
			else {
				const idx = this.tasks.findIndex(({ id }) => id === task.id);
				this.tasks.splice(idx, 1);
			}
			if (this.tasks.length) this.isTaskSelected = true;
			else this.isTaskSelected = false;
		},
		closeTaskSelected() {
			this.tasks = [];
		},
		showMsg(msg) {
			this.msg = msg;
			setTimeout(() => {
				this.msg = null;
			}, 8000);
		},
		sendSocket(board) {
			window.socketService.emit('save board', board);
		},

		closeUserMsg() {
			this.msg = null;
		},
		async deleteTaskSelected(tasks) {
			for (let i = 0; i < tasks.length; i++) {
				const group = this.activeBoard.groups.find((group) => {
					return group.tasks.find((task) => task.id === tasks[i].id);
				});
				await this.deleteTask(tasks[i], group.id);
			}
			this.tasks = [];
		},

		async duplicateTaskSelected(tasks) {
			for (let i = 0; i < tasks.length; i++) {
				const group = this.activeBoard.groups.find((group) => {
					return group.tasks.find(({ id }) => id === tasks[i].id);
				});
				let taskCopy = JSON.parse(JSON.stringify(tasks[i]));
				taskCopy.id = '';
				const details = { task: taskCopy, groupId: group.id };
				await this.saveTask(details);
			}
			this.tasks = [];
		},

		openModal(details, groupId = null) {
			this.modal.isOpen = true;
			if (details.tasks) {
				this.modal.txt = 'Delete this group?';
				this.group = details;
			} else {
				this.modal.txt = 'Delete this task?';
				this.task = details;
				this.groupId = groupId;
			}
		},

		deleteAction() {
			if (this.group) this.removeGroup(this.group);
			else this.deleteTask(this.task, this.groupId);
			this.task = null;
			this.groupId = null;
			this.group = null;
			this.modal.isOpen = false;
		},
	},

	destroyed() {
		socketService.off('board saved', this.saveBoard);
		socketService.terminate();
	},
	components: {
		groupList,
		boardHeader,
		controlContent,
		selectedTask,
		userMsg,
		confirmModal,
		surfaceControl,
		dashboard,
	},
};
</script>
