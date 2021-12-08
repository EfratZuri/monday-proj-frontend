<template>
  <section class="sign">
    <header class="sign-header">
      <img
        class="account-logo"
        src="https://cdn.monday.com/images/logos/monday_logo_short.png"
      />
    </header>
    <div class="sign-wrapper">
      <sign-form :type="'signup'" @sign="signup" />
    </div>
  </section>
</template>

<script>
import signForm from '@/components/sign-form.vue';
import { userService } from '@/services/user.service.js';
export default {
  name: 'signup',
  methods: {
    signup(user) {
      userService.signup(user);
    },
  },
  components: {
    signForm,
  },
};
</script>
