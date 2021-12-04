<template>
  <section class="board-header-view-bar flex-def">
    <section class="add-task-btn-component flex align-center">
      <button
        class="btn btn-blue btn-size-small flex align-center"
        @click="addTask"
      >
        New Task
      </button>
      <div
        class="dropdown-button small-btn"
        @click="isAddDropdown = !isAddDropdown"
        :class="{ clicked: isAddDropdown }"
      >
        <ion-icon name="chevron-down-outline" />
      </div>
      <div v-if="isAddDropdown" class="header-add-dropdown">
        <div class="add-group-wrapper" @click="addGroup">
          <span
            ><ion-icon name="easel-outline"></ion-icon> New group of tasks</span
          >
        </div>
      </div>
    </section>
    <section class="filter-tasks-wrapper flex">
      <div class="search-tasks-wrapper">
        <ion-icon name="search-outline"></ion-icon>
        <input
          class="search-input"
          type="search"
          :class="{ focusVisible: isFocusVisible }"
          placeholder="Search"
        />
      </div>
      <div class="person-filter-wrapper flex">
        <ion-icon name="person-circle-outline"></ion-icon>
        <span class="btn btn-icon">Person</span>
      </div>
      <div class="filter-filter-wrapper flex">
        <ion-icon name="funnel-outline"></ion-icon>
        <span class="btn" @click="filter"> Filter</span>
        <div class="dropdown-button small-btn">
          <ion-icon name="chevron-down-outline" />
        </div>
      </div>
      <div class="sort-filter-wrapper">
        <button class="btn btn-icon">
          <ion-icon name="compass-outline"></ion-icon>
          <span>Sort</span>
        </button>
      </div>
      <button class="btn btn-icon">
        <ion-icon name="navigate-outline"></ion-icon>
      </button>
    </section>
  </section>
</template>

<script>
export default {
  name: 'boardHeaderViewBar',
  data() {
    return {
      isFocusVisible: false,
      isAddDropdown: false,
    };
  },
  created() {},
  methods: {
    filter(e) {
      console.log(e.target.classList.add());
    },
    addTask() {
      this.$emit('addTask');
    },
    addGroup() {
      this.isAddDropdown = false;
      this.$emit('addGroup');
    },
    toggleFocusVisible() {
      this.isFocusVisible = !this.isFocusVisible;
    },
  },
  computed: {},
};
</script>
