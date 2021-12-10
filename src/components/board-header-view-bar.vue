<template>
	<section class="board-header-view-bar flex-def">
		<board-header-add-task @addTask="addTask" @addGroup="addGroup" />
		<section class="filter-tasks-wrapper flex">
			<board-header-filter-search />
			<board-header-filter-person />
			<board-header-filter-filter />
			<board-header-filter-sort />
			<board-header-filter-pin />
		</section>
	</section>
</template>

<script>
import boardHeaderAddTask from '@/components/board-header-add-task';
import boardHeaderFilterSearch from '@/components/board-header-filter-search';
import boardHeaderFilterPerson from '@/components/board-header-filter-person';
import boardHeaderFilterFilter from '@/components/board-header-filter-filter';
import boardHeaderFilterSort from '@/components/board-header-filter-sort';
import boardHeaderFilterPin from '@/components/board-header-filter-pin';
export default {
	name: 'boardHeaderViewBar',
	data() {
		return {
			isOpenInput: false,
		};
	},
	created() {},
	methods: {
		filter(e) {
			console.log(e.target.classList.add());
		},
		addTask() {
			this.$emit('addTask');
		},
		addGroup() {
			this.$emit('addGroup');
		},
	},
	computed: {},
	components: {
		boardHeaderAddTask,
		boardHeaderFilterSearch,
		boardHeaderFilterPerson,
		boardHeaderFilterFilter,
		boardHeaderFilterSort,
		boardHeaderFilterPin,
	},
};
</script>
