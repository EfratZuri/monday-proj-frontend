<template>
  <section class="group-menu-container dropdown-modal">
    <div class="menu-item" @click="collapseThis">Collapse this group</div>
    <div class="menu-item" @click="collapseAll">Collapse all groups</div>
    <div class="menu-item" @click="addGroup">Add group</div>
    <div class="menu-item" @click="duplicateGroup">Duplicate this group</div>
    <div class="menu-item move-to-dropdown-clickable" @click="moveTo">
      <span>Move to</span>
      <div class="group-moveto-dropdown-icon-wrapper">
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <group-menu-moveto-menu
          :boards="boards"
          :board="board"
          @moveToBoard="moveToBoard"
        />
      </div>
    </div>
    <div class="menu-item" @click="changeColor">Change color</div>
    <div class="menu-item" @click="removeGroup">Delete group</div>
  </section>
</template>

<script>
import groupMenuMovetoMenu from '@/components/group-menu-moveto-menu';
export default {
  name: 'groupMenu',
  props: {
    boards: {
      type: Array,
    },
    board: {
      type: Object,
    },
  },
  created() {},
  computed: {},
  methods: {
    collapseThis() {
      this.$emit('toggleTasks');
    },
    collapseAll() {
      this.$emit('toggleAllTasks');
    },
    addGroup() {
      this.$emit('addGroup');
    },
    duplicateGroup() {
      this.$emit('duplicateGroup');
    },
    moveTo() {
      this.$emit('moveTo');
    },
    changeColor() {
      this.$emit('changeColor');
    },
    removeGroup() {
      this.$emit('removeGroup');
    },
    moveToBoard(board) {
      this.$emit('moveToBoard', board);
    },
  },
  components: {
    groupMenuMovetoMenu,
  },
};
</script>
