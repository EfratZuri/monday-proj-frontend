<template>
	<div
		class="grid-cell-component-wrapper timeline-picker-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell" :style="info.data.style">
			<div
				class="date-box timeline-bar-component"
				:class="{ filled: isFilled }"
				:style="timelineStyle"
			>
				<div class="date-txt-box">
					<span class="timeline-value" :hovercontents="hoverContent" :contents="dateForDisplay">
					</span>
				</div>
				<date-picker-table :info="infoToSend" @change="update" />
			</div>
			<button v-if="isFilled" class="btn btn-icon btn-delete" @click="remove">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
import datePickerTable from './date-picker-table.vue';
import { utilService } from '../services/util.service.js';
export default {
	name: 'timelinePicker',
	props: ['info'],

	data() {
		return {
			selected: {},
			styles: {
				fillCell: {
					background: 'linear-gradient(to right, rgb(87, 155, 252) 0%, rgb(28, 31, 59) 0%)',
				},
				notFillCell: { background: 'rgb(171, 171, 171)' },
			},
			timelineStyle: null,
			isFilled: false,
			hoverContent: 'Set Dates',
		};
	},
	// watch: {
	// 	info: {
	// 		handler() {
	// 			this.selected = JSON.parse(JSON.stringify(this.info.selected));
	// 			const dayCount = this.selected.dayCount;
	// 			this.isFilled = dayCount ? true : false;
	// 			this.hoverContent = !dayCount ? 'Set Dates' : `${dayCount}d`;
	// 		},
	// 		deep: true,
	// 		immediate: true,
	// 	},
	// },
	created() {
		this.selected = JSON.parse(JSON.stringify(this.info.selected));
		const dayCount = this.selected.dayCount;
		this.isFilled = dayCount ? true : false;
		this.hoverContent = !dayCount ? 'Set Dates' : `${dayCount}d`;
		if (dayCount) {
			const now = Date.now();
			const earliestDate = Math.min(...this.selected.dates);
			const diff = earliestDate - now;
			if (diff < 0) {
				const daysPassed = Math.floor(Math.abs(diff / (1000 * 60 * 60 * 24)));
				const pers = (daysPassed * 100) / dayCount;
				const groupColor = this.info.groupStyle.clr;
				this.timelineStyle = {
					background: `linear-gradient(to right, ${groupColor} ${pers}%, rgb(28, 31, 59) ${pers}%)`,
				};
			}
		}
		// this.timelineStyle=
	},
	methods: {
		update(dueDates) {
			const dates = dueDates.map((date) => +date);
			const dayCount = Math.floor(Math.abs(dates[0] - dates[1]) / (1000 * 60 * 60 * 24));
			this.$emit('update', { dates, dayCount });
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
		remove() {
			this.$emit('update', null);
		},
	},
	computed: {
		dateForDisplay() {
			if (!this.selected.dates || !this.selected.dates.length) return '-';
			const [date1, date2] = this.selected.dates.map((date) => new Date(date));

			const date1MonthStr = utilService.months[date1.getMonth()];
			const date2MonthStr = utilService.months[date2.getMonth()];
			return `${date1MonthStr.substring(0, 3)} ${date1.getDate()} - ${
				date1.getMonth() === date2.getMonth() ? '' : date2MonthStr.substring(0, 3)
			}${date2.getDate()}`;
		},
		infoToSend() {
			return { date: this.selected.dates, isRangre: true };
		},
	},
	components: {
		datePickerTable,
	},
};
</script>
