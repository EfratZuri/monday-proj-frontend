<template>
  <div class="dashboard flex align-center">
    <div class="charts-container flex align-center">
      <div class="chart-box flex column">
        <h3>Status</h3>
        <chartStatus class="chart" :chartdata="chartdata1" :options="options" />
      </div>
      <div class="chart-box flex column">
        <h3>Tasks in group</h3>
        <chartTask class="chart" :chartdata="chartdata2" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import chartStatus from '@/components/dashboard-cmps/chart-status.vue';
import chartTask from '@/components/dashboard-cmps/chart-task.vue';

export default {
  name: 'dashboard',
  data() {
    return {
      board: null,
      groups: null,
      labelDataVals: null,
      colors: [
        '#eae4e9',
        '#fff1e6',
        '#fde2e4',
        '#fad2e1',
        '#e2ece9',
        '#bee1e6',
      ],
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  mounted() {
    this.board = this.$store.getters.activeBoard;
    this.groups = Object.keys(this.board.groups);
    this.labelDataVals = Object.values(this.labelData);
  },
  computed: {
    chartdata1() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: this.colors,
            data: this.labelDataVals.map(({ count }) => count),
          },
        ],
      };
    },
    chartdata2() {
      console.log(this.labels);
      console.log(this.labelDataVals);
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Price',
            backgroundColor: this.colors,
            data: this.labelDataVals.map((item) => item?.sumPrice),
          },
        ],
      };
    },
    options() {
      return { responsive: true };
    },
    isLoading() {
      console.log(this.$store.getters.isLoading);
      return this.$store.getters.isLoading;
    },
  },
  components: {
    chartStatus,
    chartTask,
  },
};
</script>
<style scoped>
.charts-container {
  height: 95vh;
  width: 100%;
}
.chart-box {
  height: 100%;
  width: 100%;
  /* max-width: 100%; */
}
.chart {
  width: 50%;
  margin: 0 auto;
  height: 50%;
}
</style>
