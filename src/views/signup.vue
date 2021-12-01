<template>
	<section class="signup">
		<header>
			<h2>monday</h2>
		</header>
		<h2>Create an account</h2>
		<sign-form :type="'signup'" @sign="signup" />
	</section>
</template>

<script>
import signForm from '@/components/sign-form.vue';

export default {
	name: 'signup',
	methods: {
		signup(user) {
			console.log('signup', user);
		},
	},
	components: {
		signForm,
	},
};
</script>
