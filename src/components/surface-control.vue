<template>
	<nav class="surface-control flex column gap align-center">
		<router-link to="/"
			><img src="@/assets/monday_logo_icon.png" alt="" class="monday-logo-navbar"
		/></router-link>
		<router-link to="/boards"> <ion-icon name="grid-outline"></ion-icon></router-link>

		<div class="logo-box"><img src="" alt="" /></div>
	</nav>
</template>

<script>
export default {
	name: 'surfaceControl',
};
</script>
