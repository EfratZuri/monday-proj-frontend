<template>
	<div class="date-picker-table-container">
		<date-picker v-if="!info.isRangre" v-model="info.date" valueType="format"></date-picker>
		<date-picker v-else v-model="info.date" range></date-picker>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
	name: 'datePickerTable',
	props: ['info'],
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
