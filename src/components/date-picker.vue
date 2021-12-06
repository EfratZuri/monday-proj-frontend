<template>
	<div class="grid-cell-component-wrapper date-picker-container">
		<div class="col-cell">
			<div class="date-box" @click="toggleCalendar">
				<div class="date-txt-box">
					<span>{{ dateForDisplay }}</span>
				</div>
				<date-picker-table :date="selectedCopy.dueDate" @change="update" />
			</div>
		</div>
	</div>
</template>

<script>
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
			this.$emit('update', { dueDate });
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
	},
	computed: {
		dateForDisplay() {
			if (!this.selectedCopy.dueDate) return '';
			return this.selectedCopy.dueDate;
		},
	},
	components: {
		datePickerTable,
	},
};
</script>
