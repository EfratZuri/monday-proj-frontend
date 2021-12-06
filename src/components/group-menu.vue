<template>
  <section class="group-menu-container dropdown-modal">
    <div class="menu-item" @click="collapseThis">Collapse this group</div>
    <div class="menu-item" @click="collapseAll">Collapse all groups</div>
    <div class="menu-item" @click="addGroup">Add group</div>
    <div class="menu-item" @click="duplicateGroup">Duplicate this group</div>
    <div class="menu-item" @click="moveTo">Move to</div>
    <div class="menu-item" @click="changeColor">Change color</div>
    <div class="menu-item" @click="removeGroup">Delete group</div>
  </section>
</template>

<script>
export default {
  name: 'groupMenu',
  created() {},
  computed: {},
  methods: {
    collapseThis() {
      this.$emit('toggleTasks');
    },
    collapseAll() {
      this.$emit('toggleAllTasks');
    },
    addGroup() {
      this.$emit('addGroup');
    },
    duplicateGroup() {
      console.log('duplicate group');
    },
    moveTo() {
      console.log('move to');
    },
    changeColor() {
      console.log('change color');
    },
    removeGroup() {
      console.log('remove group');
    },
  },
};
</script>
