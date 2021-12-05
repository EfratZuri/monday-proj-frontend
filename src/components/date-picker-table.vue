<template>
	<div class="grid-cell-component-wrapper date-picker-container">
		<date-picker v-model="date" valueType="format"></date-picker>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
	name: 'datePickerTable',
	props: ['date'],
	data() {
		return {
			// date: null,
		};
	},
	watch: {
		date(val) {
			this.$emit('change', val);
		},
	},
	created() {
		// this.date = this.date;
		console.log(this.date);
	},
	components: {
		DatePicker,
	},
};
</script>
