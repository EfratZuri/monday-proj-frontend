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
        />
        <taskList
          v-if="!isIncludesGroupIds(group._id)"
          :group="group"
          @saveTask="saveTask"
          @deleteTask="deleteTask"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import taskList from '@/components/task-list';
import groupHeader from '@/components/group-header';
// import addTask from './add-task.vue';
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
      groups: [],
      styleObj: {},
      currGroupIds: [],
    };
  },
  created() {
    this.groupToEdit = this.$store.getters.groupToEdit;
    this.styleObj = { color: this.groupToEdit?.style.clr || '#000' };
    this.groups = this.board.groups;
  },
  methods: {
    addGroup() {
      this.$emit('addGroup', this.groupToEdit);
    },
    saveGroup(group) {
      this.$emit('saveGroup', group);
      //   this.$store.dispatch({ type: 'saveGroup', group });
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
    toggleTasks(id) {
      if (this.currGroupIds.includes(id)) {
        const foundIdx = this.currGroupIds.findIndex(
          (group) => group._id === id
        );
        this.currGroupIds.splice(foundIdx, 1);
      } else this.currGroupIds.push(id);
    },
    isIncludesGroupIds(id) {
      return this.currGroupIds.includes(id);
    },
  },
  components: { taskList, groupHeader },
};
</script>
