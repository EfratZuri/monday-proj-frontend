<template>
	<div class="grid-cell-component-wrapper">
		<div class="col-cell">
			<!-- <date-picker v-model="time" range></date-picker> -->
			<span>{{ dateForDisplay }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'datePicker',
	props: ['info'],

	data() {
		return {
			selectedObj: {},
			time: null,
		};
	},
	created() {
		const selectedName = this.info.selected;
		if (selectedName.name === 'default') {
			this.selectedObj = selectedName;
		} else this.selectedObj = this.info.opts.find(({ name }) => name === selectedName);
	},
	methods: {
		update(curType, event) {
			this.$emit(curType, event);
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
	},
	computed: {
		dateForDisplay() {
			if (this.selectedObj.name === 'default') return '';
			return '';
		},
	},
};
</script>
