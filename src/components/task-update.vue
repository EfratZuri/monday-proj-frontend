<template>
  <section v-if="taskToEdit" class="task-update">
    <h2>{{ task.title }}</h2>
    <button>X</button>
    <textarea
      name=""
      id=""
      cols="30"
      rows="10"
      placeholder="Write an update"
      v-model="updateMsg"
    ></textarea>
    <button class="btn btn-blue" @click="addUpdate">Update</button>
    <ul class="task-comments">
      <li v-for="task in tasks" :key="task._id">
        <div>
          <span>{{ task.updates }}</span>
        </div>
      </li>
    </ul>
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
    };
  },
  created() {
    this.taskToEdit = JSON.parse(
      JSON.stringify(this.$store.getters.taskToEdit)
    );
    console.log('he');
  },
  methods: {
    addUpdate() {
      if (!this.updateMsg) return;
      this.$emit('saveUpdate', this.updateMsg);
    },
  },
  components: {},
};
</script>
