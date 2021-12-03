<template>
	<div id="app">
		<!-- <appHeader /> -->
		<surfaceControl />
		<font-awesome-icon icon="user-secret" />

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
