<template>
  <section class="charts">
    <chart-status class="chart-status" />
    <chart-task class="chart-task" />
  </section>
</template>

<script>
import ChartTask from '../cmps/chart-task.vue';
import chartStatus from '../cmps/chart-status.vue';
export default {
  components: {
    chartStatus,
    ChartTask,
  },
};
</script>
