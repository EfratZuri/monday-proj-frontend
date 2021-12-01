<template>
	<div class="board-header-view-bar flex-def">
		<button class="btn btn-blue btn-size-small" @click="add">New Item</button>
		<div class="icon-and-input-wrapper" @click="toggleFocusVisible">
			<!-- TODO: add an icon of search -->
			<input type="search" :class="{ focusVisible: isFocusVisible }" placeholder="Search" />
		</div>
		<div class="board-filter-item-component person-filter-component" @click="toggleFocusVisible">
			<button class="btn btn-icon">
				<span>Preson</span>
				<!-- TODO: add an icon of search -->
			</button>
		</div>
		<div class="board-filter-item-component">
			<button class="btn" @click="filter">
				<span>Filter</span>
			</button>
		</div>
		<div class="board-filter-item-component">
			<button class="btn btn-icon"><span>Sort</span></button>
		</div>
		<div class="board-filter-item-component">
			<button class="btn btn-icon">
				<!-- TODO:Should be only an icon -->
				<span>Pin colums</span>
			</button>
		</div>
		<div class="board-filter-item-component">
			<button class="btn btn-icon"><span>Sort</span></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'boardHeaderViewBar',
	data() {
		return {
			isFocusVisible: false,
		};
	},
	created() {},
	methods: {
		filter(e) {
			console.log(e.target.classList.add());
		},
		add() {
			console.log('Add item Function');
			this.$emit('addItem');
		},
		toggleFocusVisible() {
			this.isFocusVisible = !this.isFocusVisible;
		},
	},
	computed: {},
};
</script>
