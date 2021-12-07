<template>
	<div class="grid-cell-component-wrapper status-summary-container" :style="{ padding: '6px 8px' }">
		<div class="col-cell flex">
			<div
				class="summary-cell"
				v-if="!taskLen"
				:style="{
					width: '100%',
					backgroundColor: defaultStyle.backgroundColor,
				}"
			></div>
			<div
				v-else
				class="summary-cell"
				v-for="(key, value, idx) in statusPickerLabelCount"
				:key="idx"
				:style="getStyle(key, value)"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'statusSummary',
	props: ['info'],
	data() {
		return {
			statusPickerLabelCount: null,
			taskLen: this.info.group.tasks.length,
			defaultStyle: null,
		};
	},
	watch: {
		info: {
			handler() {
				this.opts = this.info.data.opts;
				this.statusPickerLabelCount = this.info.group.tasks.reduce((acc, task) => {
					if (task.statusPicker) {
						if (acc[task.statusPicker.name]) acc[task.statusPicker.name]++;
						else acc[task.statusPicker.name] = 1;
					} else {
						if (acc.default) acc.default++;
						else acc.default = 1;
					}
					return acc;
				}, {});
				this.defaultStyle = this.info.data.default.style;
			},
			deep: true,
			immediate: true,
		},
	},
	methods: {
		getStyle(key, value) {
			const width = (key * 100) / this.taskLen + '%';
			let backgroundColor;
			if (value === 'default') backgroundColor = this.defaultStyle.backgroundColor;
			else backgroundColor = this.opts.find(({ name }) => name === value)?.style?.backgroundColor;
			return { width, backgroundColor };
		},
	},
	computed: {},
};
</script>
