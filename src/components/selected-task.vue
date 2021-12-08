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
      <div class="task-action" @click="duplicateTaskSelected">
        <button class="btn btn-icon icon-selected">
          <font-awesome-icon icon="copy" />
          <span class="task-action-name">Duplicate</span>
        </button>
      </div>
    </div>
    <div class="task-action">
      <button class="btn btn-icon icon-selected" @click="deleteTaskSelected">
        <font-awesome-icon icon="trash" />
        <span class="task-action-name">Delete</span>
      </button>
    </div>
    <div class="exit-action flex">
      <span class="exit-btn" @click="closeTaskSelected">X</span>
    </div>
  </section>
</template>

<script>
// import { socketService } from '../services/socket.service.js';
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
      this.$emit('close');
    },
    deleteTaskSelected() {
      this.$emit('deleteTaskSelected', this.tasks);
    },
    duplicateTaskSelected() {
      this.$emit('duplicateTaskSelected', this.tasks);
    },
  },
};
</script>
