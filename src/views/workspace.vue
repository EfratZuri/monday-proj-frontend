<template>
	<div class="workspace">
		<div v-if="isLoading"><p>Loading</p></div>
		<div v-else>
			<boardHeader @addItem="addItem" />
			<groupList :boards="boards" @addGroup="addGroup" />
		</div>
	</div>
</template>

<script>
import boardHeader from '@/components/board-header.vue';
import groupList from '@/components/group-list.vue';
export default {
	name: 'workspace',
	created() {
		this.$store.dispatch({ type: 'loadBoards' });
	},
	computed: {
		isLoading() {
			return this.$store.getters.isLoading;
		},
		getGroups() {
			// const boards = this.$store.getters.boards;
			// console.log(boards);
			return [];
		},
		boards() {
			return this.$store.getters.boards;
		},
	},
	methods: {
		addItem() {
			console.log('Add item');
		},
		addGroup(group) {
			console.log('add group');
			// Setting
			group.boardId = this.$store.getters.activeBoard._id;
			// this.$store.commit({ type: 'addGroup', group });
		},
	},
	components: {
		groupList,
		boardHeader,
	},
};
</script>
