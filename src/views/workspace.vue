<template>
  <div class="workspace">
    <!-- <router-view /> -->
    <div v-if="isLoading"><p>Loading</p></div>
    <div v-else>
      <boardHeader
        :activeBoard="activeBoard"
        @addTask="addTask"
        @saveBoard="saveBoard"
        @addGroup="addGroup"
      />
      <groupList
        :board="activeBoard"
        @addGroup="addGroup"
        @removeGroup="removeGroup"
      />
    </div>
  </div>
</template>

<script>
import boardHeader from '@/components/board-header.vue';
import groupList from '@/components/group-list.vue';
export default {
  name: 'workspace',
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
    addTask() {
      this.$store.dispatch({ type: 'addTask' });
    },
    addGroup(group) {
      // group.boardId = this.$store.getters.activeBoard._id;
      this.$store.dispatch({ type: 'saveGroup', group });
    },
    removeGroup(group) {
      this.$store.dispatch({ type: 'removeGroup', group });
    },
    saveBoard(board) {
      this.$store.dispatch({ type: 'saveBoard', board });
    },
  },
  components: {
    groupList,
    boardHeader,
  },
};
</script>
