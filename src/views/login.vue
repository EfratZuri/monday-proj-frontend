<template>
  <section class="sign">
    <header class="sign-header">
      <img
        class="account-logo"
        src="https://cdn.monday.com/images/logos/monday_logo_short.png"
      />
    </header>
    <div class="sign-wrapper">
      <sign-form :type="'login'" @login="login" :wrongInputs="isWrongInputs" />
    </div>
  </section>
</template>
<script>
import signForm from '@/components/sign-form.vue';
export default {
  name: 'login',
  data() {
    return {
      isWrongInputs: false,
    };
  },
  methods: {
    async login(user) {
      try {
        await this.$store.dispatch({ type: 'login', user });
        this.$router.push('/boards');
      } catch (error) {
        this.isWrongInputs = true;
        console.log('error', error);
      }
    },
  },
  computed: {},
  components: {
    signForm,
  },
};
</script>
