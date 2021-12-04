<template>
	<section class="board-header-subset-toolbar">
		<div class="monday-board-subsets-tabs">
			<div class="monday-board-subset-item">
				<button class="btn" @click="move">Main Table</button>
				<div class="board-subset-item__active-strip transition-enter-done"></div>
			</div>
			<div class="monday-board-subset-item">
				<button class="btn" @click="showNewTableOptions">+ Add new</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'boardHeaderSubsetToolbar',
	data() {
		return {};
	},
	created() {},
	methods: {
		move() {
			console.log('Move Function is not ready yet');
		},
		showNewTableOptions() {
			console.log('MoveTableOptions Function is not ready yet');
		},
	},
	components: {},
};
</script>
