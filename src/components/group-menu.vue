<template>
	<section class="group-menu-container dropdown-modal">
		<div class="menu-item">Open</div>
		<div class="menu-item" @click="remove"><span>Delete</span></div>
	</section>
</template>

<script>
export default {
	name: 'groupMenu',
	created() {},
	computed: {},
	methods: {
		remove() {
			console.log('removw group');
		},
	},
};
</script>
