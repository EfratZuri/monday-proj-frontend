<template>
  <section class="taskUpdate">
    <button></button>
    <input type="text" v-model="task.title" placeholder=" Write an update" />
    <button v-if="addBtn" class="btn" @click="addNewTask(group._id)">
      +Add task
    </button>
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
    return {};
  },
  created() {
    this.task = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
  },
  methods: {},
  components: {},
};
</script>
