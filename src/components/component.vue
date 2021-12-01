<template>
	<section class="component modal">
		<ul v-if="options && options.length" class="clean-list">
			<li v-for="(option, idx) in options" :key="idx">
				<span @click="update(option, $event)">{{ option }}</span>
			</li>
		</ul>
	</section>
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
	methods: {
		update(curType, event) {
			this.$emit(curType, event);
		},
	},
};
</script>
