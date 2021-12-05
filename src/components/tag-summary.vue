<template>
  <div class="grid-cell-component-wrapper date-summary-container">
    <div class="col-cell">
      <div v-if="tags && tags.length">
        <span v-for="(tag, idx) in tags" :key="idx" :style="tag.style">
          {{ tagForDisplay(tag.txt) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tagSummary',
  props: ['info'],
  data() {
    return {
      tags: null,
    };
  },
  created() {
    this.tags = this.info.group.tasks.filter((task) => task?.tagPicker);
  },
  methods: {
    tagForDisplay(tag) {
      return `#${tag.txt}`;
    },
  },
};
</script>
