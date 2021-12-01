<template>
  <section class="group-list-container">
    <ul v-if="groups && groups.length" class="group-list clean-list">
      <li class="group" v-for="(group, idx) in groups" :key="idx">
        <group-header :group="group" />
        <taskList :group="group" />
      </li>
    </ul>
    <!-- <button class="btn" :style="{ color: groupToEdit?.color || '#fff' }" @click="addGroup"> -->
    <add-task @addTask="saveTask" />
  </section>
</template>

<script>
import taskList from '@/components/task-list';
import groupHeader from '@/components/group-header';
import addTask from './add-task.vue';
export default {
  name: 'groupList',
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      groupToEdit: {},
      groups: [],
      styleObj: {},
      showRename: false,
    };
  },
  created() {
    this.groupToEdit = this.$store.getters.groupToEdit;
    this.styleObj = { color: this.groupToEdit?.style.clr || '#000' };
    this.groups = this.boards[0].groups;
  },
  methods: {
    renameGroup() {
      this.showRename = !this.showRename;
    },
    addGroup() {
      this.$emit('addGroup', this.groupToEdit);
    },
    saveTask(task) {
      this.$store.dispatch({ type: 'addTask', task });
    },
  },
  components: { taskList, groupHeader, addTask },
};
</script>
