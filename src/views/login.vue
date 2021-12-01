<template>
	<div class="login">
		<header>
			<h2>monday</h2>
		</header>
		<h2>Log in to your account</h2>
		<sign-form :type="'login'" @sign="login" />
	</div>
</template>

<script>
import signForm from '@/components/sign-form.vue';
export default {
	name: 'login',
	methods: {
		login(user) {
			console.log(user);
			console.log('Login function');
		},
	},
	components: {
		signForm,
	},
};
</script>
