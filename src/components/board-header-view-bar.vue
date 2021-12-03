<template>
  <section class="board-header-view-bar flex-def">
    <div class="add-task-btn-component flex align-center">
      <button
        class="btn btn-blue btn-size-small flex align-center"
        @click="addTask"
      >
        New Task
      </button>
      <div class="dropdown-button small-btn">
        <ion-icon name="chevron-down-outline" />
      </div>
    </div>
    <button class="btn btn-blue btn-size-small" @click="addGroup">
      New group
    </button>
    <ion-icon name="search-outline"></ion-icon>
    <input
      type="search"
      :class="{ focusVisible: isFocusVisible }"
      placeholder="Search"
    />
    <button class="btn btn-icon">Preson</button>
    <button class="btn" @click="filter">Filter</button>
    <button class="btn btn-icon">Sort</button>
    <button class="btn btn-icon">Pin colums</button>
    <button class="btn btn-icon">Sort</button>
  </section>
</template>

<script>
export default {
  name: 'boardHeaderViewBar',
  data() {
    return {
      isFocusVisible: false,
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
      this.$emit('addGroup');
    },
    toggleFocusVisible() {
      this.isFocusVisible = !this.isFocusVisible;
    },
  },
  computed: {},
};
</script>
