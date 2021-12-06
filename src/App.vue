<template>
	<div id="app">
		<surfaceControl />
		<router-view />
	</div>
</template>

<script>
import surfaceControl from '@/components/surface-control.vue';

export default {
	name: 'App',
	components: {
		surfaceControl,
	},
};
</script>
