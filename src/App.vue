<template>
  <div id="app">
    <surface-control />
    <router-view />
  </div>
</template>

<script>
import surfaceControl from '@/components/surface-control';
export default {
  name: 'App',
  components: {
    surfaceControl,
  },
};
</script>
