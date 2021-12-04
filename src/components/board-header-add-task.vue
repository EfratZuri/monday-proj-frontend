<template>
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
</template>

<script>
export default {
  name: 'board header add task',
  data() {
    return {
      isAddDropdown: false,
    };
  },
  methods: {
    addTask() {
      this.$emit('addTask');
    },
    addGroup() {
      this.isAddDropdown = false;
      this.$emit('addGroup');
    },
  },
};
</script>
