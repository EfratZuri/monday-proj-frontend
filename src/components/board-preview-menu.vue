<template>
  <section class="group-menu-container dropdown-modal">
    <div class="menu-item" @click="rename">Rename</div>
    <div class="menu-item" @click="remove"><span>Delete</span></div>
  </section>
</template>

<script>
export default {
  name: 'board-menu',
  created() {},
  computed: {},
  methods: {
    rename() {
      console.log('rename board');
    },
    remove() {
      console.log('remove Board');
    },
  },
};
</script>
