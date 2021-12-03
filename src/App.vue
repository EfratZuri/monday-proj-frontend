<template>
  <div id="app">
    <!-- <appHeader /> -->
    <surfaceControl />

    <router-view />
  </div>
</template>

<script>
// import appHeader from '@/components/app-header.vue';
import surfaceControl from '@/components/surface-control.vue';

export default {
  name: 'App',
  components: {
    // appHeader,
    surfaceControl,
  },
};
</script>
