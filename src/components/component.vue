<template>
	<section class="component modal"></section>
</template>

<script>
export default {
	name: 'component',
	props: ['info', 'is'],
	data() {
		return { options: null };
	},
	create() {
		const key = Object.keys(this.info).find((key) => !key.includes('selected'));
		this.options = this.info[key];
	},
	methods: {},
	components: {},
};
</script>
