<template>
  <section class="board-header-subset-toolbar">
    <div class="monday-board-subsets-tabs">
      <div class="monday-board-subset-item active-tab flex align-center gap">
        <!-- <span class="main-table-icon"> -->
        <ion-icon name="browsers-outline"></ion-icon>
        <!-- </span> -->
        <span @click="move">Main Table</span>
        <!-- <div
          class="board-subset-item__active-strip transition-enter-done"
        ></div> -->
      </div>
      <div class="monday-board-subsets-tabs__separator"></div>
      <div @click="showNewTableOptions" class="monday-board-subset-item">
        <span class="add-new-item-icon">+</span>
        Add view
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'boardHeaderSubsetToolbar',
  methods: {
    move() {
      console.log('Move Function is not ready yet');
    },
    showNewTableOptions() {
      console.log('MoveTableOptions Function is not ready yet');
    },
  },
  components: {},
};
</script>
