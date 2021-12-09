<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="Filter by anything"
    placement="top"
  >
    <div class="filter-filter-wrapper flex">
      <div class="filter-icon-wrapper">
        <ion-icon name="funnel-outline"></ion-icon>
      </div>
      <span class="filter-span"> Filter</span>
      <!-- <span class="btn filter-span" @click="filter"> Filter</span> -->
      <div class="filter-dropdown-btn">
        <ion-icon name="chevron-down-outline" />
      </div>
    </div>
  </el-tooltip>
</template>

<script>
export default {};
</script>

<style></style>
