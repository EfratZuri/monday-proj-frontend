<template>
  <section class="sign">
    <header class="sign-header">
      <img
        class="account-logo"
        src="https://cdn.monday.com/images/logos/monday_logo_short.png"
      />
    </header>
    <div class="sign-wrapper">
      <sign-form :type="'login'" @login="login" />
    </div>
  </section>
</template>

<script>
import signForm from '@/components/sign-form.vue';
import { userService } from '@/services/user.service.js';
export default {
  name: 'login',
  methods: {
    login(user) {
      try {
        userService.login(user);
        console.log('Logged in!');
      } catch (error) {
        console.log('error', error);
      }
    },
  },
  components: {
    signForm,
  },
};
</script>
