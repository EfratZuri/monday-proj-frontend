<template>
  <section class="board-header-view-bar flex-def">
    <board-header-add-task @addTask="addTask" @addGroup="addGroup" />
    <section class="filter-tasks-wrapper flex">
      <board-header-filter-search />
      <board-header-filter-person />
      <board-header-filter-filter />
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
import boardHeaderAddTask from '@/components/board-header-add-task.vue';
import boardHeaderFilterSearch from '@/components/board-header-filter-search.vue';
import boardHeaderFilterPerson from '@/components/board-header-filter-person.vue';
import boardHeaderFilterFilter from '@/components/board-header-filter-filter.vue';
export default {
  name: 'boardHeaderViewBar',
  data() {
    return {
      isOpenInput: false,
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
  },
  computed: {},
  components: {
    boardHeaderAddTask,
    boardHeaderFilterSearch,
    boardHeaderFilterPerson,
    boardHeaderFilterFilter,
  },
};
</script>
