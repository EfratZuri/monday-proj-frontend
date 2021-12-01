<template>
	<section class="component">
		<div :class="[is]" :style="styleObj">
			<span>{{ selectedToDisplay }}</span>
		</div>

		<!-- <ul v-if="options && options.length" class="clean-list">
			<li v-for="(option, idx) in options" :key="idx">
				<span @click="update(option, $event)">{{ option }}</span>
			</li>
		</ul> -->
	</section>
</template>

<script>
export default {
	name: 'component',
	props: ['info', 'is'],
	data() {
		return { options: null, selected: null, styleObj: {} };
	},
	created() {
		if (!this.info) {
		} else {
			const keys = Object.keys(this.info);
			const { optionKey, selectedKey } = keys.reduce((acc, key) => {
				acc[`${key.includes('selected') ? 'selected' : 'option'}Key`] = key;
				return acc;
			}, {});
			// this.options = this.info[optionKey];
			console.log(optionKey);
			this.selected = this.info[selectedKey];
		}
	},
	methods: {
		update(curType, event) {
			this.$emit(curType, event);
		},
	},
	computed: {
		selectedToDisplay() {
			// return `${}`
			return this.selected || '';
		},
	},
};
</script>
