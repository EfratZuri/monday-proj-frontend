<template>
  <section class="group-list-container">
    <ul
      v-if="groups && groups.length"
      class="group-list clean-list flex column"
    >
      <draggable @end="handleChange()" :list="groups" group="groups">
        <li class="group" v-for="group in groups" :key="group.id">
          <!-- <span class="test">DRAG</span> -->
          <group-header
            :group="group"
            :boards="boards"
            :board="board"
            @saveGroup="saveGroup"
            @removeGroup="removeGroup"
            @toggleTasks="toggleTasks"
            @toggleAllTasks="toggleAllTasks"
            @addGroup="addGroup"
            @moveToBoard="moveToBoard"
            @addColumn="addColumn"
          />
          <taskList
            v-if="!isIncludesGroupIds(group.id)"
            :group="group"
            @saveTask="saveTask"
            @deleteTask="deleteTask"
            @saveComment="saveComment"
            @setSelected="setSelected"
            @saveBoardCol="saveBoardCol"
          />
          <group-task-summary :group="group" />
        </li>
      </draggable>
    </ul>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import taskList from '@/components/task-list';
import groupHeader from '@/components/group-header';
import groupTaskSummary from '@/components/group-task-summary';

export default {
  name: 'groupList',
  props: {
    board: {
      type: Object,
      required: true,
    },
    boards: {
      type: Array,
    },
  },
  data() {
    return {
      currGroupIds: [],
      activeBoard: null,
    };
  },
  created() {
    this.activeBoard = this.$store.getters.activeBoard;
  },
  methods: {
    handleChange() {
      return this.$store.dispatch({
        type: 'saveBoard',
        board: this.activeBoard,
      });
    },
    saveBoardCol(details) {
      console.log('details from GROUP LIST!!!!!!', details);
      this.$emit('saveBoardCol', details);
    },
    addGroup() {
      this.$emit('addGroup');
    },
    saveGroup(group) {
      this.$emit('saveGroup', group);
    },
    removeGroup(group) {
      this.$emit('removeGroup', group);
    },
    moveToBoard(moveDetails) {
      this.$emit('moveToBoard', moveDetails);
    },
    saveTask(task, groupId) {
      const details = { task, groupId };
      this.$emit('saveTask', details);
    },
    deleteTask(task, groupId) {
      this.$emit('deleteTask', task, groupId);
    },
    saveComment(details) {
      this.$emit('saveComment', details);
    },
    toggleTasks(id) {
      if (this.currGroupIds.includes(id)) {
        const foundIdx = this.currGroupIds.findIndex((idx) => idx === id);
        if (foundIdx >= 0) this.currGroupIds.splice(foundIdx, 1);
      } else this.currGroupIds.push(id);
    },
    toggleAllTasks() {
      this.currGroupIds = this.board.groups.map(({ id }) => id);
    },
    isIncludesGroupIds(id) {
      return this.currGroupIds.includes(id);
    },
    setSelected(task, boolean) {
      this.$emit('setSelected', task, boolean);
    },
    addColumn(columnType) {
      this.$emit('addColumn', columnType);
    },
  },
  computed: {
    groups() {
      return this.board.groups;
    },
  },
  components: {
    taskList,
    groupHeader,
    groupTaskSummary,
    draggable,
  },
};
</script>
