<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list">
      <li v-for="task in tasks" :key="task._id">
        <task-preview :task="task" @saveTitle.stop="saveTask" />
      </li>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
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
    saveTask(task) {
      this.$emit('saveTask', task, this.group._id);
    },
    // saveTitle(task) {
    // this.$emit('saveTask', task, this.group._id);
    // },
  },
  components: {
    taskPreview,
    addTask,
  },
};
</script>
