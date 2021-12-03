<template>
	<section class="task-menu-container">
		<div class="menu-item">Open</div>
		<div class="menu-item" @click="remove"><span>Delete</span></div>
	</section>
</template>

<script>
export default {
	name: 'taskMenu',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	created() {},
	computed: {},
	methods: {
		remove() {
			console.log('removw task');
		},
	},
	components: {},
};
</script>
