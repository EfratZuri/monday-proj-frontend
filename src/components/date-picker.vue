<template>
	<div class="col-cell">
		<span>{{ infoForDisplay }} </span>
	</div>
</template>

<script>
export default {
	name: 'datePicker',
	props: ['info'],

	data() {
		return {
			selectedObj: {},
		};
	},
	created() {
		const selectedName = this.info.selected;
		if (selectedName.name === 'default') {
			this.selectedObj = selectedName;
		} else {
			this.selectedObj = this.info.opts.find(({ name }) => name === selectedName);
		}
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
		infoForDisplay() {
			return this.selectedObj.name === 'default' ? '' : this.selectedObj.name;
		},
	},
};
</script>
