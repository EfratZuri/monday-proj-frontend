<template>
  <section class="group-menu-container dropdown-modal">
    <div class="menu-item" @click="collapseThis">
      <div class="board-preview-delete-icon-wrapper">
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
          class="icon_component menu-icon-svg icon_component--no-focus-style"
        >
          <path
            d="M6.16376 4.22C5.99557 4.0151 5.68881 3.99367 5.48773 4.17497C5.28705 4.35499 5.26518 4.66771 5.43096 4.8775L5.4353 4.88299L7.63897 7.22958C7.72516 7.33476 7.85958 7.39844 8.00004 7.39844C8.14365 7.39844 8.27703 7.33229 8.36756 7.22211L10.5575 4.89136L10.5617 4.88617C10.6403 4.78767 10.6797 4.67416 10.6797 4.55638C10.6797 4.41287 10.6212 4.27286 10.5119 4.17474C10.3079 3.99078 10.0016 4.01836 9.82898 4.2282L8.00006 6.1483L6.16376 4.22Z"
            fill="currentColor"
          ></path>
          <path
            d="M9.83624 11.78C10.0044 11.9849 10.3112 12.0063 10.5123 11.825C10.713 11.645 10.7348 11.3323 10.569 11.1225L10.5647 11.117L8.36103 8.77042C8.27484 8.66524 8.14042 8.60156 7.99997 8.60156C7.85635 8.60156 7.72297 8.6677 7.63244 8.77788L5.44247 11.1086L5.43833 11.1138C5.35974 11.2123 5.32031 11.3258 5.32031 11.4436C5.32031 11.5871 5.37883 11.7271 5.48811 11.8253C5.69211 12.0092 5.99842 11.9816 6.17102 11.7718L7.99994 9.8517L9.83624 11.78Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14.125 8C14.125 11.3827 11.3827 14.125 8 14.125C4.61726 14.125 1.875 11.3827 1.875 8C1.875 4.61726 4.61726 1.875 8 1.875C11.3827 1.875 14.125 4.61726 14.125 8Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <span>Collapse this group</span>
    </div>
    <div class="menu-item" @click="collapseAll">Collapse all groups</div>
    <div class="menu-item" @click="addGroup">Add group</div>
    <div class="menu-item" @click="duplicateGroup">Duplicate this group</div>
    <div
      class="menu-item move-to-dropdown-clickable"
      @click="moveTo"
      v-if="boards.length > 1"
    >
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
      this.$emit('');
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
