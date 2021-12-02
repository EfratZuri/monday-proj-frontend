<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list-container">
      <li v-for="task in tasks" :key="task._id">
        <task-preview :task="task" />
        <div class="task-title" @click="getTaskToEdit(task._id)" v-if="!isEdit">
          {{ task.title }}
        </div>
        <input
          v-else
          type="text"
          v-model="taskToEdit.title"
          @blur="toggleEdit"
          @change="saveTask"
        />
      </li>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
    <!-- <button class="btn" @click="addTask">+Add task</button> -->
    <!-- <dialogNode v-if="showDialogNode" @change="changeStatus" /> -->
  </section>
</template>

<script>
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
      showDialogNode: false,
      isEdit: false,
    };
  },
  created() {
    this.tasks = this.group.tasks;
  },
  methods: {
    changeStatus() {
      console.log('Change task staus');
    },
    addGroup() {
      console.log('Add new group');
    },
    toggleDialogNode() {
      this.showDialogNode = !this.showDialogNode;
    },
    saveTask(task, id) {
      this.$emit('saveTask', task, id);
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
    },
    getTaskToEdit(taskId) {
      this.toggleEdit();
      const task = this.tasks.find(({ _id }) => _id === taskId);
      this.taskToEdit = task;
    },
  },
  components: {
    taskPreview,
    addTask,
  },
};
</script>
