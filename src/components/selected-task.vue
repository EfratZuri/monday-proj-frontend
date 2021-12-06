<template>
  <section class="selected-menu flex align-center">
    <div class="num-of-selected">
      <span>{{ tasks.length }}</span>
    </div>
    <div class="title-section flex column">
      <div class="title-selected"><span>Task selected</span></div>
      <div class="pulses-dots flex align-center">
        <div v-for="task in tasks" :key="task._id" class="dot-num">
          <span>.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import moveToOpts from '../components/move-to-opts.vue';
export default {
  name: 'selectedTask',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showMoveToOptions: false,
    };
  },
  methods: {},
  components: {},
};
</script>
