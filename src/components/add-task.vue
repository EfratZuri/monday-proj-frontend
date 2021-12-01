<template>
  <section class="task-add">
    <input
      type="text"
      v-model="title"
      @focus="showAddBtn"
      placeholder="Add task"
    />
    <button v-if="addBtn" class="btn" @click="addNewTask">+Add task</button>
  </section>
</template>

<script>
import utilService from '@/services/util.service.js';

export default {
  name: 'taskAdd',
  props: {},
  data() {
    return {
      title: '',
      addBtn: false,
    };
  },
  created() {},
  methods: {
    addNewTask() {
      console.log(this.title);
      const taskId = utilService.makeId;
      const title = this.title;
      this.$emit('addTask', { title, taskId });
      this.addBtn = !this.addBtn;
      this.title = '';
    },
    showAddBtn() {
      this.addBtn = true;
    },
  },
  components: {},
};
</script>
