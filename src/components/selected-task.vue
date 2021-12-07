<template>
  <section class="selected-menu flex align-center">
    <div class="num-of-selected">
      <span>{{ tasks.length }}</span>
    </div>
    <div class="title-section flex column">
      <div class="title-selected"><span>Task selected</span></div>
      <div class="pulses-dots flex align-center">
        <div v-for="task in tasks" :key="task.id" class="dot-num">
          <span>.</span>
        </div>
      </div>
    </div>
    <div class="duplicate-action">
      <div></div>
      <div class="task-action">
        <span class="icon-selected">
          <font-awesome-icon icon="copy" />
        </span>
        <span class="task-action-name">Duplicate</span>
      </div>
    </div>
    <div class="task-action">
      <span class="icon-selected">
        <font-awesome-icon icon="trash" />
      </span>
      <span class="task-action-name">Delete</span>
    </div>
    <div class="exit-action flex">
      <span class="exit-btn" @click="closeTaskSelected">X</span>
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
  methods: {
    closeTaskSelected() {
      this.$emit('closeTaskSelected');
    },
  },
  components: {},
};
</script>
