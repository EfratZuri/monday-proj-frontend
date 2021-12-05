<template>
  <div class="board-header-container">
    <board-header-main :activeBoard="activeBoard" @saveBoard="saveBoard" />
    <board-header-subset-toolbar />
    <board-header-view-bar @addGroup="addGroup" @addTask="addTask" />
  </div>
</template>

<script>
import boardHeaderViewBar from '@/components/board-header-view-bar';
import boardHeaderSubsetToolbar from '@/components/board-header-subset-toolbar';
import boardHeaderMain from '@/components/board-header-main';
export default {
  name: 'boardHeader',
  props: {
    activeBoard: {
      type: Object,
      required: true,
    },
  },
  created() {},
  methods: {
    addGroup() {
      this.$emit('addGroup');
      console.log('Add item from board header,this method is NOT READY');
    },
    addTask() {
      this.$emit('addTask');
    },
    saveBoard(board) {
      this.$emit('saveBoard', board);
    },
  },
  components: {
    boardHeaderViewBar,
    boardHeaderMain,
    boardHeaderSubsetToolbar,
  },
};
</script>
