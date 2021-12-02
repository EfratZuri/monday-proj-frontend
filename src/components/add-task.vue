<template>
  <section class="task-add" v-if="task">
    <input
      type="text"
      v-model="task.title"
      @focus="showAddBtn"
      placeholder="Add task"
    />
    <button v-if="addBtn" class="btn" @click="addNewTask(group._id)">
      +Add task
    </button>
  </section>
</template>

<script>
export default {
  name: 'addTask',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      task: null,
      addBtn: false,
    };
  },
  created() {
    this.task = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
  },
  methods: {
    addNewTask(id) {
      const task = this.task;
      if (!task) return;
      this.$emit('addTask', task, id);
      this.addBtn = !this.addBtn;
    },
    showAddBtn() {
      this.addBtn = true;
    },
  },
  components: {},
};
</script>
