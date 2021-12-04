<template>
	<div class="group-task-summary">
		<div
			v-if="!taskLen"
			:style="{ width: '100%', backgroundColor: defaultStyle.backgroundColor }"
		></div>
		<div
			v-else
			v-for="(key, value, idx) in statusPickerLabelCount"
			:key="idx"
			:style="getStyle(key, value)"
		></div>
	</div>
</template>

<script>
export default {
	name: 'groupTaskSummary',
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			// cmps: null,
			opts: null,
			statusPickerLabelCount: null,
			taskLen: this.group.tasks.length,
			defaultStyle: null,
		};
	},

	created() {
		// this.cmps = this.$store.getters.cmpsOrder.map((cmp) => {
		// 	const str = cmp.replace('-picker', '');
		// 	return str.replace(str[0], str[0].toUpperCase());
		// });
		const cols = this.$store.getters.cols;
		this.opts = cols.find(({ type }) => type === 'statusPicker').data.opts;
		this.statusPickerLabelCount = this.group.tasks.reduce((acc, task) => {
			if (task.statusPicker) {
				if (acc[task.statusPicker]) acc[task.statusPicker]++;
				else acc[task.statusPicker] = 1;
			} else {
				if (acc.default) acc.default++;
				else acc.default = 1;
			}
			return acc;
		}, {});
		this.defaultStyle = this.opts.find(({ name }) => name === 'default').style;
	},
	methods: {
		getStyle(key, value) {
			const width = (value * 100) / this.taskLen + '%';
			const backgroundColor = this.opts.find(({ name }) => name === key).style?.backgroundColor;

			return { width, backgroundColor };
		},
	},
	computed: {},
};
</script>
