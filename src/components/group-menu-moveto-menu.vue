<template>
  <section class="moveto-menu">
    <div class="menu-item" @click="collapseThis">Collapse this group</div>
    <div class="menu-item" @click="collapseAll">Collapse all groups</div>
    <div class="menu-item" @click="addGroup">Add group</div>
    <div class="menu-item" @click="duplicateGroup">Duplicate this group</div>
    <div class="menu-item" @click="changeColor">Change color</div>
    <div class="menu-item" @click="removeGroup">Delete group</div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
