<template>
	<nav class="surface-control flex column gap align-center">
		<router-link to="/" active-class="active-link" exact
			><img src="@/assets/monday_logo_icon.png" alt="" class="monday-logo-navbar"
		/></router-link>
		<router-link to="/boards" active-class="active-link">
			<ion-icon name="grid-outline"></ion-icon
		></router-link>
		<button class="btn btn-icon" to="/boards" active-class="active-link">
			<font-awesome-icon icon="bell" />
		</button>
		<button class="btn btn-icon" to="/boards" active-class="active-link">
			<font-awesome-icon icon="inbox" />
		</button>
		<button class="btn btn-icon" to="/boards" active-class="active-link">
			<font-awesome-icon icon="calendar-check" />
		</button>
	</nav>
</template>

<script>
export default {
	name: 'surfaceControl',
};
</script>
