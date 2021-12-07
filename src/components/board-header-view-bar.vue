<template>
  <section class="board-header-view-bar flex-def">
    <board-header-add-task @addTask="addTask" @addGroup="addGroup" />
    <section class="filter-tasks-wrapper flex">
      <board-header-filter-search />
      <board-header-filter-person />
      <board-header-filter-filter />
      <board-header-filter-sort />
      <board-header-filter-pin />
    </section>
  </section>
</template>

<script>
import boardHeaderAddTask from '@/components/board-header-add-task.vue';
import boardHeaderFilterSearch from '@/components/board-header-filter-search.vue';
import boardHeaderFilterPerson from '@/components/board-header-filter-person.vue';
import boardHeaderFilterFilter from '@/components/board-header-filter-filter.vue';
import boardHeaderFilterSort from '@/components/board-header-filter-sort.vue';
import boardHeaderFilterPin from '@/components/board-header-filter-pin.vue';
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
    boardHeaderFilterSort,
    boardHeaderFilterPin,
  },
};
</script>
