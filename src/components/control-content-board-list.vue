<template>
  <section class="boards-list">
    <div class="baords-preview-title">Boards list :</div>
    <ul>
      <li
        class="board-preview-wrapper"
        v-for="board in boards"
        :key="board._id"
      >
        <div class="board-preview" @click="showBoard(board)">
          <span class="board-preview-icon">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              width="19"
              height="19"
              aria-hidden="true"
              aria-label="Public board"
              class="icon_component"
            >
              <path
                d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>

          {{ board.title }}
          <div
            @click.stop="showBoardMenu(board)"
            v-if="isShowDropdownIcon"
            class="board-preview-dropdown-icon-wrapper"
          >
            <ion-icon name="ellipsis-horizontal"></ion-icon>
          </div>
          <board-preview-menu
            :board="board"
            @removeBoard="removeBoard"
            v-if="isCurrBoardMenu(board)"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import boardPreviewMenu from '@/components/board-preview-menu';
export default {
  name: 'control-content-board-list',
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShowDropdownIcon: true,
      isShowMenu: false,
      currBoardMenu: null,
    };
  },
  methods: {
    showBoard(board) {
      console.log('board', board);
      this.$emit('showBoard', board);
    },
    showBoardMenu(board) {
      if (!this.currBoardMenu || this.currBoardMenu !== board)
        this.currBoardMenu = board;
      else if (this.currBoardMenu === board) this.currBoardMenu = null;
    },
    isCurrBoardMenu(board) {
      return this.currBoardMenu === board;
    },
    removeBoard(board) {
      this.$emit('removeBoard', board);
    },
  },
  components: {
    boardPreviewMenu,
  },
};
</script>
