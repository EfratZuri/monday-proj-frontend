<template>
  <div class="group-task-summary grid-row-component">
    <div class="grid-cell-row-component-header"></div>
    <div v-if="cmps" class="grid-cells-row-component">
      <component
        v-for="(cmp, idx) in cmps"
        :key="idx"
        :is="cmp.type"
        :info="getCmpInfo(cmp)"
      />
    </div>
  </div>
</template>

<script>
import statusSummary from '../components/status-summary';
import dateSummary from '../components/date-summary';
import memberSummary from '../components/member-summary';
export default {
  name: 'groupTaskSummary',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cmps: null,
    };
  },

  created() {
    const cols = JSON.parse(JSON.stringify(this.$store.getters.cols));
    this.cmps = cols.map((cur) => {
      const prevType = cur.type;
      cur.type = prevType.replace('Picker', 'Summary');
      return cur;
    });
  },
  methods: {
    getCmpInfo(cmp) {
      return { group: this.group, data: cmp.data };
    },
  },
  components: {
    statusSummary,
    memberSummary,
    dateSummary,
  },
};
</script>
