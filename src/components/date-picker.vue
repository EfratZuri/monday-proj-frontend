<template>
	<div class="grid-cell-component-wrapper date-picker-container">
		<div class="col-cell">
			<div class="date box">
				<span>{{ dateForDisplay }}</span>
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
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
	},
	methods: {
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
			return '';
		},
	},
	components: {
		datePickerTable,
	},
};
</script>
