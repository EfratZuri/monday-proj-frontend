<template>
  <section class="dropdown-modal moveto-menu">
    <ul>
      <li v-for="board in boards" :key="board._id">
        <div class="menu-item" @click="moveToBoard(board)">
          {{ board.title }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'group-menu-moveto-menu',
  props: {
    boards: {
      type: Array,
    },
  },
  created() {},
  methods: {
    moveToBoard(board) {
      this.$emit('moveToBoard', board);
    },
  },
};
</script>

<style></style>
