<template>
  <section v-if="taskToEdit" class="task-update slide-panel">
    <header class="header-task-update flex column">
      <button class="btn-close-panel" @click="closePanel">X</button>
      <h2>{{ task.title }}</h2>
    </header>
    <button
      v-if="!showTextarea"
      class="btn new-post-placeholder"
      @click="toggleTextarea"
    >
      Write an update
    </button>
    <div v-if="showTextarea" class="flex column">
      <textarea
        cols="30"
        rows="10"
        placeholder="Write an update"
        v-model="updateMsg"
      ></textarea>
      <button class="btn btn-blue" @click="addUpdate">Update</button>
    </div>
    <div class="post-list-container">
      <ul v-if="task.updates" class="post-list">
        <li :key="task._id" class="post">
          <div>
            <span>{{ task.updates }}</span>
          </div>
        </li>
      </ul>
      <div v-else class="post-no-found">
        <span>No updates yet...</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'taskUpdate',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updateMsg: '',
      taskToEdit: null,
      showTextarea: false,
    };
  },
  created() {
    this.taskToEdit = JSON.parse(
      JSON.stringify(this.$store.getters.taskToEdit)
    );
  },
  methods: {
    addUpdate() {
      this.showTextarea = false;
      if (!this.updateMsg) return;
      this.$emit('saveUpdate', this.updateMsg);
    },
    toggleTextarea() {
      this.showTextarea = !this.showTextarea;
    },
    closePanel() {
      this.$emit('closePanel');
    },
  },
  components: {},
};
</script>
