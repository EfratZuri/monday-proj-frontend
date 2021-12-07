<template>
	<div class="grid-cell-component-wrapper date-picker-container">
		<div class="col-cell">
			<div class="date-box" @click="toggleCalendar">
				<div class="date-txt-box">
					<span>{{ dateForDisplay }}</span>
				</div>
				<date-picker-table :info="infoToSend" @change="update" />
				<!-- selectedCopy.dueDate" @change="update" /> -->
			</div>
		</div>
	</div>
</template>

<script>
import { utilService } from '../services/util.service.js';
import datePickerTable from './date-picker-table.vue';

export default {
	name: 'datePicker',
	props: ['info'],

	data() {
		return {
			selectedCopy: {},
			showCalendar: false,
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
	},
	methods: {
		toggleCalendar() {
			this.showCalendar = !this.showCalendar;
		},
		update(dueDate) {
			this.$emit('update', { dueDate: +dueDate });
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
	},
	computed: {
		dateForDisplay() {
			if (!this.selectedCopy.dueDate) return '';
			const date = new Date(this.selectedCopy.dueDate);
			const dateMonthStr = utilService.months[date.getMonth()];
			return `${dateMonthStr.substring(0, 3)} ${date.getDate()} `;
		},
		infoToSend() {
			return { date: this.selectedCopy.dueDate, isRangre: false };
		},
	},
	components: {
		datePickerTable,
	},
};
</script>
