<template>
	<div class="search-tasks-wrapper" @click="toggleInput" :class="{ 'open-input': isOpenInput }">
		<div class="search-icon-wrapper">
			<ion-icon name="search-outline"></ion-icon>
		</div>
		<input class="search-input" type="search" placeholder="Search" />
	</div>
</template>

<script>
export default {
	name: 'board-header-filter-search',
	data() {
		return {
			isOpenInput: false,
		};
	},
	methods: {
		toggleInput() {
			this.isOpenInput = !this.isOpenInput;
		},
	},
};
</script>

<style></style>
