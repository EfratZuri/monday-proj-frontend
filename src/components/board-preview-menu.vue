<template>
  <section class="group-menu-container dropdown-modal">
    <div class="menu-item" @click="rename">Rename</div>
    <div class="menu-item" @click="remove"><span>Delete</span></div>
  </section>
</template>

<script>
export default {
  name: 'board-menu',
  props: {
    board: {
      type: Object,
      required: true,
    },
  },
  created() {},
  computed: {},
  methods: {
    rename() {},
    remove() {
      this.$emit('removeBoard', this.board);
    },
  },
};
</script>
