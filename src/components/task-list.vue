<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list">
      <li v-for="task in tasks" :key="task._id" class="task-row flex-def">
        <task-preview
          :task="task"
          :styleObj="group.style"
          @saveTitle="saveTask"
          @deleteTask="deleteTask"
          @updatePicker="saveTask"
        />
      </li>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
    <!-- <dialogNode v-if="showDialogNode" @change="changeStatus" /> -->
  </section>
</template>

<script>
// import { Container, Draggable } from 'vue-smooth-dnd';
// import { applyDrag, generateItems } from '../services/util.service.js';
import taskPreview from '@/components/task-preview';
import addTask from '@/components/add-task';
export default {
  name: 'taskList',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taskToEdit: null,
      tasks: [],
      // tasks: generateItems(50, (i) => ({ id: i, data: 'Draggable ' + i })),
      showDialogNode: false,
      isEdit: false,
    };
  },
  created() {
    this.tasks = this.group.tasks;
  },
  methods: {
    // onDrop(dropResult) {
    //   this.tasks = applyDrag(this.tasks, dropResult);
    // },
    changeStatus() {
      console.log('Change task staus');
    },
    addGroup() {
      console.log('Add new group');
    },
    toggleDialogNode() {
      this.showDialogNode = !this.showDialogNode;
    },
    saveTask(task) {
      this.$emit('saveTask', task, this.group._id);
    },

    deleteTask(task) {
      this.$emit('deleteTask', task, this.group._id);
    },
    // saveTitle(task) {
    // this.$emit('saveTask', task, this.group._id);
    // },
  },
  components: {
    taskPreview,
    addTask,
    // Container,
    // Draggable,
  },
};
</script>
