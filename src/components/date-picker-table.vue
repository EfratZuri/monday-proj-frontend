<template>
	<div class="date-picker-table-container">
		<date-picker v-if="!info.isRangre" v-model="date" valueType="format"></date-picker>
		<date-picker v-else v-model="date" range></date-picker>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
	name: 'datePickerTable',
	props: ['info'],
	data() {
		return {
			date: null,
		};
	},
	watch: {
		info: {
			handler() {
				this.date = this.info.date;
			},
			deep: true,
			immediate: true,
		},
		date(val) {
			console.log(val);
			this.$emit('change', val);
		},
	},

	components: {
		DatePicker,
	},
};
</script>
