<template>
  <div class="workspace" :class="{ 'control-open': showControlContent }">
    <control-content
      @toggleOpen="toggleOpenControl"
      @add="addBoard"
      @showBoard="showBoard"
      @removeBoard="removeBoard"
      :boards="boards"
    />

    <div class="workspace-content">
      <div v-if="isLoading"><p>Loading</p></div>

      <<<<<<< HEAD
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
          @duplicateGroup="duplicateGroup"
        />
        <!-- <task-update
=======
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
					@duplicateGroup="duplicateGroup"
				/>
				<!-- <task-update
>>>>>>> 38f58521759555f04a3b8fcb660ea85db34f7658
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

export default {
  name: 'workspace',
  data() {
    return {
      showControlContent: false,
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
    saveTask(details = null) {
      this.$store.dispatch({ type: 'saveTask', details });
    },
    addGroup(group) {
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    removeGroup(group) {
      this.$store.dispatch({ type: 'removeGroup', group });
    },
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board });
    },
    deleteTask(task, groupId) {
      this.$store.dispatch({ type: 'deleteTask', details: { task, groupId } });
    },
    saveGroup(group) {
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    duplicateGroup(group) {
      this.$store.dispatch({ type: 'duplicateGroup', group });
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
  },
  components: {
    groupList,
    boardHeader,
    controlContent,
  },
};
</script>
