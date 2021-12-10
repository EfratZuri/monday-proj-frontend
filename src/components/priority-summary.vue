<template>
	<div
		class="grid-cell-component-wrapper priority-summary-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell flex summary-container align-center" :style="info.data.style">
			<div class="battery-container">
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
					v-for="(key, value, idx) in priorityPickerLabelCount"
					:key="idx"
					:style="getStyle(key, value)"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'prioritySummary',
	props: ['info'],
	data() {
		return {
			priorityPickerLabelCount: null,
			taskLen: this.info.group.tasks.length,
			defaultStyle: null,
		};
	},
	watch: {
		info: {
			handler() {
				this.opts = this.info.data.opts;
				this.priorityPickerLabelCount = this.info.group.tasks.reduce((acc, task) => {
					if (task.priorityPicker) {
						if (acc[task.priorityPicker.name]) acc[task.priorityPicker.name]++;
						else acc[task.priorityPicker.name] = 1;
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
	created() {
		// this.opts = this.info.data.opts;
		// this.priorityPickerLabelCount = this.info.group.tasks.reduce((acc, task) => {
		// 	if (task.priorityPicker) {
		// 		if (acc[task.priorityPicker.name]) acc[task.priorityPicker.name]++;
		// 		else acc[task.priorityPicker.name] = 1;
		// 	} else {
		// 		if (acc.default) acc.default++;
		// 		else acc.default = 1;
		// 	}
		// 	return acc;
		// }, {});
		// this.defaultStyle = this.info.data.default.style;
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
