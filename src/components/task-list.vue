<template>
  <section class="task-list-container">
    <ul v-if="tasks && tasks.length" class="task-list clean-list">
      <draggable
        :component-data="getComponentData()"
        :list="tasks"
        group="tasks"
      >
        <transition-group>
          <li
            v-for="task in tasks"
            :key="task._id"
            class="task-row flex align-center"
          >
            <div
              class="menu-edit-task-container"
              :class="{ selected: showTaskMenu }"
            >
              <button class="btn" @click="toggleShowTaskMenu">
                <font-awesome-icon icon="caret-down" />
              </button>
              <task-menu v-if="showTaskMenu" :task="task" />
            </div>
            <task-preview
              :task="task"
              :styleObj="group.style"
              @saveTitle="saveTask"
              @deleteTask="deleteTask"
              @updatePicker="saveTask"
              @saveComment="saveComment"
            />
          </li>
        </transition-group>
      </draggable>
    </ul>
    <add-task :group="group" @addTask="saveTask" />
    <!-- <dialogNode v-if="showDialogNode" @change="changeStatus" /> -->
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
  },
  data() {
    return {
      taskToEdit: null,
      tasks: [],
      // tasks: generateItems(50, (i) => ({ id: i, data: 'Draggable ' + i })),
      showDialogNode: false,
      isEdit: false,
      showTaskMenu: false,
    };
  },
  created() {
    this.tasks = this.group.tasks;
  },
  methods: {
    // handleChange(value) {
    //   // console.log(value.vue);
    // },

    getComponentData() {
      return {
        on: {
          // change: this.handleChange,
          // input: this.inputChanged,
        },
        attrs: {
          wrap: true,
        },
        props: {
          value: this.tasks,
        },
      };
    },
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
    toggleShowTaskMenu() {
      this.showTaskMenu = false;
      //   this.showTaskMenu = !this.showTaskMenu;
    },

    deleteTask(task) {
      this.$emit('deleteTask', task, this.group._id);
    },
    saveComment(details) {
      details.groupId = this.group._id;
      this.$emit('saveComment', details);
    },
  },
  computed: {
    // myList: {
    //   get() {
    //     return this.$store.state.myList;
    //   },
    //   set(value) {
    //     this.$store.commit('updateList', value);
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
