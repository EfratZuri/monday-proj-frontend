<template>
	<div class="group-task-summary grid-row-component flex align-center">
		<div class="grid-cell-row-component-header" style="flex-basis: 267px"></div>
		<div v-if="cmps" class="grid-cells-row-component">
			<component v-for="(cmp, idx) in cmps" :key="idx" :is="cmp.type" :info="getCmpInfo(cmp)" />
		</div>
	</div>
</template>

<script>
import statusSummary from '../components/status-summary';
import prioritySummary from '../components/priority-summary';
import dateSummary from '../components/date-summary';
import timelineSummary from '../components/timeline-summary';
import memberSummary from '../components/member-summary';
import tagSummary from '../components/tag-summary';
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
			cmps: null,
		};
	},

	created() {
		const cols = JSON.parse(JSON.stringify(this.$store.getters.cols));
		this.cmps = cols.map((cur) => {
			const prevType = cur.type;
			cur.type = prevType.replace('Picker', 'Summary');
			return cur;
		});
	},
	methods: {
		getCmpInfo(cmp) {
			return { group: this.group, data: cmp.data };
		},
	},
	components: {
		statusSummary,
		memberSummary,
		dateSummary,
		tagSummary,
		prioritySummary,
		timelineSummary,
	},
};
</script>
