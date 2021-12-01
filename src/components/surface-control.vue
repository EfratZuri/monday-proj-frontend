<template>
	<nav class="surface-control flex column gap">
		<router-link to="/">Home</router-link>
		<router-link to="/boards">Workspace</router-link>

		<div class="logo-box"><img src="" alt="" /></div>
		<button class="btn btn-icon" aria-label="Workspace">W</button>
		<button class="btn btn-icon" aria-label="Notifications">N</button>
	</nav>
</template>

<script>
export default {
	name: 'surfaceControl',
	created() {},
};
</script>
