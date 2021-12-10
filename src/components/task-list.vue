<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list">
      <draggable @end="handleChange()" :list="tasks" group="tasks">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="task-row flex align-center"
        >
          <div
            class="menu-edit-task-container"
            :class="{ 'dropdown-open': showTaskMenu }"
          >
            <button class="btn" @click="toggleShowTaskMenu">
              <font-awesome-icon icon="caret-down" />
            </button>
            <task-menu
              v-if="showTaskMenu"
              :task="task"
              @remove="deleteTask"
              @duplicate="saveTask"
              @selected="saveTask"
            />
          </div>
          <task-preview
            :isSelected="isSelected"
            :task="task"
            :styleObj="group.style"
            @saveTask="saveTask"
            @deleteTask="deleteTask"
            @updatePicker="saveTask"
            @saveComment="saveComment"
            @setSelected="setSelected"
            @saveBoardCol="saveBoardCol"
          />
        </li>
      </draggable>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import taskPreview from '@/components/task-preview';
import addTask from '@/components/add-task';
import taskMenu from '@/components/task-menu';
export default {
  name: 'taskList',
  props: {
    group: {
      type: Object,
      required: true,
    },
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      taskToEdit: null,
      // tasks: [],
      showDialogNode: false,
      isEdit: false,
      showTaskMenu: false,
      activeBoard: null,
    };
  },
  created() {
    // this.tasks = this.group.tasks;
    this.activeBoard = this.$store.getters.activeBoard;
  },
  methods: {
    handleChange() {
      console.log(this.activeBoard);
      return this.$store.dispatch({
        type: 'saveBoard',
        board: this.activeBoard,
      });
    },
    toggleDialogNode() {
      this.showDialogNode = !this.showDialogNode;
    },
    saveTask(task) {
      this.$emit('saveTask', task, this.group.id);
    },
    saveBoardCol(details) {
      console.log('details from TASK LIST!!!!!!', details);
      this.$emit('saveBoardCol', details);
    },
    toggleShowTaskMenu() {
      // this.showTaskMenu = false;
      this.showTaskMenu = !this.showTaskMenu;
    },
    setSelected(task, boolean) {
      this.$emit('setSelected', task, boolean);
    },

    deleteTask(task) {
      this.$emit('deleteTask', task, this.group.id);
    },
    saveComment(details) {
      details.groupId = this.group.id;
      this.$emit('saveComment', details);
    },
  },
  computed: {
    tasks() {
      return this.group.tasks;
    },
    // myList: {
    //   get() {
    //     return this.group.tasks;
    //   },
    // },
  },
  components: {
    taskPreview,
    addTask,
    draggable,
    taskMenu,
  },
};
</script>
