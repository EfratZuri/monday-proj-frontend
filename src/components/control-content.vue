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
          <button class="btn flex align-center" @click="add">+ Add</button>
          <button class="btn flex align-center">
            <ion-icon name="compass-outline"></ion-icon>
            <span>Filter</span>
          </button>
          <button class="btn flex align-center">
            <ion-icon name="search-outline"></ion-icon>
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'controlContent',
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
    add() {
      console.log('true', true);
      this.$emit('add');
    },
  },
};
</script>
