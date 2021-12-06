<template>
  <section class="sign-form">
    <form @submit.prevent="sign" class="flex clumn gap">
      <div v-if="type === 'signup'" class="form-row flex column">
        <label>Enter your fullname</label>
        <input type="fullname" placeholder="example" v-model="user.fullname" />
      </div>
      <div class="form-row flex column">
        <label>Enter your username</label>
        <input type="text" placeholder="example" v-model="user.username" />
      </div>
      <div class="form-row flex column">
        <label for=""> Password</label>
        <input type="password" placeholder="Password" v-model="user.password" />
      </div>
      <button class="btn btn-blue">{{ type }}</button>
    </form>
    <p>
      Try as a <router-link to="" class="btn btn-underline">guest</router-link>
    </p>
    <p v-if="type === 'login'">
      Don't have an account yet?<router-link
        to="signup"
        class="btn btn-underline"
        >Sign up</router-link
      >
    </p>
    <p v-else>
      Already have an account ?<router-link to="login" class="btn btn-underline"
        >Log in</router-link
      >
    </p>
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
