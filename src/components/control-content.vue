<template>
  <section class="first-level-control-content flex column">
    <div class="control-content-container">
      <button
        class="btn btn-round btn-open-control flex align-center"
        @click="toggleOpen"
      >
        <font-awesome-icon v-if="showControlContent" icon="chevron-left" />
        <font-awesome-icon v-else icon="chevron-right" />
      </button>
      <div v-if="showControlContent" class="home-control-component flex column">
        <header class="control-content-header flex column">
          <div
            class="dropdown-navigation-header flex align-center space-between"
          >
            <span>Worksapce</span>
            <button class="btn flex align-center">
              <font-awesome-icon icon="ellipsis-h" />
            </button>
          </div>
          <div
            role="button"
            class="btn btn-workspace-dropdown-container flex space-between align-center"
            @click="toggleWorkspaceList"
          >
            <h2>Worksapce main</h2>
            <button class="btn flex align-center">
              <font-awesome-icon icon="chevron-down" />
            </button>
          </div>
        </header>
        <div class="control-btns flex column gap">
          <button class="btn flex align-center" @click="addBoard">+ Add</button>
          <button class="btn flex align-center">
            <ion-icon name="compass-outline"></ion-icon>
            <span>Filter</span>
          </button>
          <button class="btn flex align-center">
            <ion-icon name="search-outline"></ion-icon>
            <span>Search</span>
          </button>
          <div class="boards-list">
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
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'controlContent',
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showControlContent: false,
    };
  },
  created() {},
  methods: {
    toggleOpen() {
      this.$emit('toggleOpen');
      this.showControlContent = !this.showControlContent;
    },
    addBoard() {
      this.$emit('add');
    },
    showBoard(board) {
      this.$emit('showBoard', board);
    },
    toggleWorkspaceList() {},
  },
  computed: {},
};
</script>
