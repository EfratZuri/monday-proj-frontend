<template>
	<div class="workspace" :class="{ 'control-open': showControlContent }">
		<control-content @toggleOpen="toggleOpenControl" @add="addBoard" />
		<div class="workspace-content">
			<div v-if="isLoading"><p>Loading</p></div>

			<div v-else>
				<boardHeader
					:activeBoard="activeBoard"
					@addTask="saveTask"
					@saveBoard="saveBoard"
					@addGroup="addGroup"
				/>
				<groupList
					:board="activeBoard"
					@addGroup="addGroup"
					@removeGroup="removeGroup"
					@saveTask="saveTask"
					@deleteTask="deleteTask"
					@saveGroup="saveGroup"
					@saveUpdate="saveUpdate"
				/>
				<!-- <task-update
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
import controlContent from '@/components/control-content';
import boardHeader from '@/components/board-header';
import groupList from '@/components/group-list';

export default {
	name: 'workspace',
	data() {
		return {
			showControlContent: false,
		};
	},
	async created() {
		this.$store.dispatch({ type: 'loadBoards' });
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
	},
	methods: {
		saveTask(details = null) {
			this.$store.dispatch({ type: 'saveTask', details });
		},
		addGroup(group) {
			this.$store.dispatch({ type: 'saveGroup', group });
		},
		removeGroup(group) {
			this.$store.dispatch({ type: 'removeGroup', group });
		},
		saveBoard(board) {
			this.$store.dispatch({ type: 'saveBoard', board });
		},
		deleteTask(task, groupId) {
			this.$store.dispatch({ type: 'deleteTask', details: { task, groupId } });
		},
		saveGroup(group) {
			this.$store.dispatch({ type: 'saveGroup', group });
		},
		toggleOpenControl() {
			this.showControlContent = !this.showControlContent;
		},
		addBoard() {
			console.log('add board');
		},
		saveUpdate(details) {
			this.$store.dispatch({ type: 'saveUpdate', details });
		},
	},
	components: {
		groupList,
		boardHeader,
		controlContent,
	},
};
</script>
