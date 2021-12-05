<template>
	<div class="date-picker-table-container">
		<date-picker v-model="date" valueType="format"></date-picker>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
	name: 'datePickerTable',
	props: ['date'],
	watch: {
		date(val) {
			this.$emit('change', val);
		},
	},
	created() {},
	components: {
		DatePicker,
	},
};
</script>
