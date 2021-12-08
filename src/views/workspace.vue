<template>
  <div class="workspace" :class="{ 'control-open': showControlContent }">
    <control-content
      @toggleOpen="toggleOpenControl"
      @add="addBoard"
      @showBoard="showBoard"
      @removeBoard="removeBoard"
      @saveBoard="saveBoard"
      :boards="boards"
    />

    <div class="workspace-content">
      <div v-if="isLoading"><p>Loading</p></div>

      <div v-else>
        <boardHeader
          :activeBoard="activeBoard"
          @addTask="saveTask"
          @saveBoard="saveBoard"
          @addGroup="addGroup"
        />
        <groupList
          :board="activeBoard"
          :boards="boards"
          @addGroup="addGroup"
          @removeGroup="removeGroup"
          @moveToBoard="moveGroupToBoard"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
          @saveGroup="saveGroup"
          @saveComment="saveComment"
          @setSelected="setSelected"
          @addColumn="addColumn"
        />
        <user-msg v-if="msg" :msg="msg" @closeUserMsg="closeUserMsg" />
        <selected-task
          v-if="tasks.length"
          :tasks="tasks"
          @close="closeTaskSelected"
          @deleteTaskSelected="deleteTaskSelected"
        />
        <!-- <task-update
			<div v-else>
				<boardHeader
					:activeBoard="activeBoard"
					@addTask="saveTask"
					@saveBoard="saveBoard"
					@addGroup="addGroup"
				/>
				<groupList
					:board="activeBoard"
					:boards="boards"
					@addGroup="addGroup"
					@removeGroup="removeGroup"
					@saveTask="saveTask"
					@deleteTask="deleteTask"
					@saveGroup="saveGroup"
					@saveComment="saveComment"
				/>
					v-if="showPostPanel"
					:task="task"
					@closePanel="togglePostPanel"
					@saveUpdate="saveUpdate"
				/> -->
      </div>
    </div>
  </div>
</template>

<script>
import controlContent from '@/components/control-content';
import boardHeader from '@/components/board-header';
import groupList from '@/components/group-list';
import selectedTask from '@/components/selected-task.vue';
import userMsg from '@/components/user-msg.vue';

export default {
  name: 'workspace',
  data() {
    return {
      showControlContent: false,
      tasks: [],
      msg: '',
    };
  },
  async created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    boards() {
      return this.$store.getters.boards;
    },
    activeBoard() {
      return this.$store.getters.activeBoard;
    },
  },
  methods: {
    addColumn(columnType) {
      this.$store.dispatch({ type: 'addColumn', columnType });
    },
    saveTask(details = null) {
      this.$store.dispatch({ type: 'saveTask', details });
    },
    addGroup(group) {
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    removeGroup(group) {
      this.showMsg('We successfully deleted 1 group');
      this.$store.dispatch({ type: 'removeGroup', group });
    },
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board });
    },
    async deleteTask(task, groupId) {
      this.showMsg('We successfully deleted task');
      await this.$store.dispatch({
        type: 'deleteTask',
        details: { task, groupId },
      });
    },
    saveGroup(group) {
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    moveGroupToBoard(moveDetails) {
      this.$store.dispatch({ type: 'moveGroupToBoard', moveDetails });
    },
    toggleOpenControl() {
      this.showControlContent = !this.showControlContent;
    },
    addBoard() {
      this.$store.dispatch({ type: 'saveBoard' });
    },
    saveComment(details) {
      this.$store.dispatch({ type: 'saveComment', details });
    },
    showBoard(board) {
      this.$store.commit({ type: 'setActiveBoard', activeBoard: board });
    },
    removeBoard(board) {
      this.$store.dispatch({ type: 'removeBoard', board });
    },
    setSelected(task, boolean) {
      if (boolean) this.tasks.push(task);
      else {
        const idx = this.tasks.findIndex(({ id }) => id === task.id);
        this.tasks.splice(idx, 1);
      }
    },
    closeTaskSelected() {
      this.tasks = [];
    },
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 8000);
    },

    closeUserMsg() {
      this.msg = null;
    },
    async deleteTaskSelected(tasks) {
      for (let i = 0; i < tasks.length; i++) {
        const group = this.activeBoard.groups.find((group) => {
          return group.tasks.find((task) => task.id === tasks[i].id);
        });
        await this.deleteTask(tasks[i], group.id);
      }
      this.tasks = [];
    },
  },
  components: {
    groupList,
    boardHeader,
    controlContent,
    selectedTask,
    userMsg,
  },
};
</script>
