<template>
  <div class="monday-notice-container">
    <div class="user-msg-container">
      <div class="check-user-msg">
        <span><font-awesome-icon icon="check" /></span>
      </div>
      <div class="msg-content">
        <span>{{ msg }}</span>
      </div>
      <div class="undo-action">
        <button class="undo-btn">Undo</button>
      </div>
      <button class="close-user-msg" @click="closeUserMsg">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userMsg',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.msg);
  },
  methods: {
    closeUserMsg() {
      this.$emit('closeUserMsg');
    },
  },
  computed: {},
};
</script>
