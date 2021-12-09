<template>
	<div
		class="grid-cell-component-wrapper status-summary-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell flex summary-container">
			<div class="battery-container flex align-center">
				<div
					class="summary-cell"
					v-if="!taskLen"
					:style="{
						width: '100%',
						backgroundColor: defaultStyle.backgroundColor,
					}"
				></div>
				<custom-tool-tip
					v-else
					v-for="(key, value, idx) in statusPickerLabelCount"
					:key="idx"
					class="summary-cell"
					:style="getStyle(key, value)"
					:info="getToolTipInfo(getContentToolTip(key, value))"
				>
					<div class="summary-cell"></div>
				</custom-tool-tip>
				<!-- <div
					v-else
					class="summary-cell"
					v-for="(key, value, idx) in statusPickerLabelCount"
					:key="idx"
					:style="getStyle(key, value)"
				></div> -->
			</div>
		</div>
	</div>
</template>

<script>
import customToolTip from '../components/custom-components/custom-tool-tip';
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
		getContentToolTip(key, value) {
			console.log(key, value);
			const percentage = (key * 100) / this.taskLen;
			return `${value} ${key}/${this.taskLen} ${percentage}%`;
		},
		getToolTipInfo(content = '', placement = 'top') {
			return { orientation: 'top', content, placement };
		},
	},
	computed: {},
	components: { customToolTip },
};
</script>
