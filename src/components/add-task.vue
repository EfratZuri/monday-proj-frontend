<template>
  <section class="task-add" v-if="task">
    <input
      type="text"
      v-model="task.title"
      @focus="showAddBtn"
      placeholder="Add task"
    />
    <button v-if="addBtn" class="btn" @click="addNewTask">+Add task</button>
  </section>
</template>

<script>
export default {
  name: 'addTask',
  props: {},
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
    addNewTask() {
      const task = this.task;
      this.$emit('addTask', task);
      this.addBtn = !this.addBtn;
    },
    showAddBtn() {
      this.addBtn = true;
    },
  },
  components: {},
};
</script>
