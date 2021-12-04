<template>
	<section class="board-header-subset-toolbar">
		<div class="monday-board-subsets-tabs">
			<div class="monday-board-subset-item">
				<button class="btn" @click="move">Main Table</button>
				<div class="board-subset-item__active-strip transition-enter-done"></div>
			</div>
			<div class="add-board-subset-picker-wrapper">
				<button class="btn" @click="showNewTableOptions">+ Add View</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'boardHeaderSubsetToolbar',
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
