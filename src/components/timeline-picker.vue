<template>
  <div
    class="grid-cell-component-wrapper timeline-picker-container"
    :style="{ width: info.data.style.maxWidth }"
  >
    <div class="col-cell" :style="info.data.style">
      <div
        class="date-box timeline-bar-component"
        :class="{ filled: isFilled }"
      >
        <div class="date-txt-box">
          <span
            class="timeline-value"
            :hovercontents="hoverContent"
            :contents="dateForDisplay"
          >
          </span>
        </div>
        <date-picker-table :info="infoToSend" @change="update" />
      </div>
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
          background:
            'linear-gradient(to right, rgb(87, 155, 252) 0%, rgb(28, 31, 59) 0%)',
        },
        notFillCell: { background: 'rgb(171, 171, 171)' },
      },
      isFilled: false,
      hoverContent: 'Set Dates',
    };
  },
  watch: {
    // info: {
    // 	handler() {
    // 		this.selected = JSON.parse(JSON.stringify(this.info.selected));
    // 		const dayCount = this.selected.dayCount;
    // 		this.isFilled = dayCount ? true : false;
    // 		this.hoverContent = !dayCount ? 'Set Dates' : `${dayCount}d`;
    // 	},
    // 	deep: true,
    // 	immediate: true,
    // },
  },
  methods: {
    update(dueDates) {
      const dates = dueDates.map((date) => +date);
      const dayCount = Math.floor(
        Math.abs(dates[0] - dates[1]) / (1000 * 60 * 60 * 24)
      );
      this.$emit('update', { dates, dayCount });
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
  computed: {
    dateForDisplay() {
      if (!this.selected.dates || !this.selected.dates.length) return '-';
      const [date1, date2] = this.selected.dates.map((date) => new Date(date));

      const date1MonthStr = utilService.months[date1.getMonth()];
      const date2MonthStr = utilService.months[date2.getMonth()];
      return `${date1MonthStr.substring(0, 3)} ${date1.getDate()} - ${
        date1.getMonth() === date2.getMonth()
          ? ''
          : date2MonthStr.substring(0, 3)
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
