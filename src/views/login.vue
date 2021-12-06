<template>
  <div class="signup">
    <header>
      <h2>monday</h2>
    </header>
    <h2>Log in to your account</h2>
    <sign-form :type="'login'" @login="login" />
  </div>
</template>

<script>
import signForm from '@/components/sign-form.vue';
import { userService } from '@/services/user-service.js';
export default {
  name: 'login',
  methods: {
    login(user) {
      userService.login(user);
    },
  },
  components: {
    signForm,
  },
};
</script>
