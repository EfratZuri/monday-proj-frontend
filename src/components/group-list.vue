<template>
  <section class="group-list-container">
    <ul
      v-if="groups && groups.length"
      class="group-list clean-list flex column"
    >
      <li class="group" v-for="group in groups" :key="group._id">
        <group-header
          :group="group"
          @saveGroup="saveGroup"
          @removeGroup="removeGroup"
          @toggleTasks="toggleTasks"
          @toggleAllTasks="toggleAllTasks"
          @addGroup="addGroup"
        />
        <taskList
          v-if="!isIncludesGroupIds(group._id)"
          :group="group"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
          @saveComment="saveComment"
        />
        <group-task-summary :group="group" />
      </li>
    </ul>
    <button class="btn" @click="createNewGroup">+ Add new group</button>
  </section>
</template>

<script>
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
  },
  data() {
    return {
      groupToEdit: {},
      styleObj: {},
      currGroupIds: [],
    };
  },
  created() {
    this.groupToEdit = this.$store.getters.groupToEdit;
    this.styleObj = { color: this.groupToEdit?.style.clr || '#000' };
  },
  methods: {
    addGroup() {
      this.$emit('addGroup');
    },
    saveGroup(group) {
      this.$emit('saveGroup', group);
    },
    removeGroup(group) {
      this.$emit('removeGroup', group);
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
      console.log('this.currGroupIds', this.currGroupIds);
      console.log('id', id);
      if (this.currGroupIds.includes(id)) {
        const foundIdx = this.currGroupIds.findIndex(
          (group) => group._id === id
        );
        if (foundIdx >= 0) this.currGroupIds.splice(foundIdx, 1);
      } else this.currGroupIds.push(id);
      console.log('this.currGroupIds', this.currGroupIds);
    },
    toggleAllTasks() {
      this.currGroupIds = this.board.groups.map((group) => group._id);
      console.log('this.currGroupIds', this.currGroupIds);
    },
    isIncludesGroupIds(id) {
      return this.currGroupIds.includes(id);
    },
    createNewGroup() {
      console.log('e');
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
  },
};
</script>
