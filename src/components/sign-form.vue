<template>
  <section class="sign-cmp">
    <h1 class="sign-title">{{ signTitle }}</h1>
    <form @submit.prevent="sign" class="sign-form">
      <div v-if="type === 'signup'" class="sign-item-wrapper flex column">
        <label>Enter your fullname</label>
        <input
          type="fullname"
          placeholder="Full name"
          v-model="user.fullname"
        />
      </div>
      <div class="sign-item-wrapper flex column">
        <label>Enter your username</label>
        <input type="text" placeholder="Username" v-model="user.username" />
      </div>
      <div class="sign-item-wrapper flex column">
        <label for=""> Password</label>
        <input type="password" placeholder="Password" v-model="user.password" />
      </div>
      <button class="btn btn-blue">{{ type }}</button>
    </form>
    <div class="another-sign-options">
      <div>
        <span class="sign-option">Try as a</span>
        <router-link to="" class="another-options-links btn btn-underline"
          >guest</router-link
        >
      </div>
      <div v-if="type === 'login'">
        <span class="sign-option">Don't have an account yet?</span>
        <router-link to="signup" class="another-options-links btn btn-underline"
          >Sign up</router-link
        >
      </div>
      <div v-else>
        <span class="sign-option">Already have an account?</span>
        <router-link to="login" class="another-options-links btn btn-underline">
          <span class="another-options-links">Log in</span></router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'signForm',
  props: {
    type: {
      type: String,
    },
  },
  created() {
    console.log('this.type', this.type);
  },
  data() {
    return {
      user: { username: '', password: '', fullname: '' },
    };
  },
  computed: {
    signTitle() {
      return this.type === 'login'
        ? 'Log in to your account'
        : 'Sign up new account';
    },
  },
  methods: {
    sign() {
      if (this.type === 'signup') {
        this.$emit('sign', this.user);
        return;
      }
      this.$emit('login', this.user);
    },
  },
};
</script>
