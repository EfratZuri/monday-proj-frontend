<template>
  <nav class="surface-control flex column gap align-center">
    <router-link to="/" active-class="active-link" exact
      ><img
        src="@/assets/monday_logo_icon.png"
        alt=""
        class="monday-logo-navbar"
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
    <div class="surface-control-users" @click="toggleUserMenu">
      {{ letterToShow }}
      <div
        v-if="isUserMenuOpen"
        class="surface-control-user-menu group-menu"
        v-click-outside="toggleUserMenu"
      >
        <div class="surface-control-user-menu-item" @click="logOut">
          <div class="menu-icon-wrapper">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              width="16"
              height="16"
              aria-hidden="true"
              aria-label="Log out"
              class="icon_component icon_component--no-focus-style"
            >
              <path
                d="M3.55928 3.60927C3.62925 3.53931 3.72414 3.5 3.82309 3.5H11.6846C11.7836 3.5 11.8785 3.53931 11.9484 3.60927C12.0184 3.67924 12.0577 3.77413 12.0577 3.87308V6.68077C12.0577 7.09498 12.3935 7.43077 12.8077 7.43077C13.2219 7.43077 13.5577 7.09498 13.5577 6.68077V3.87308C13.5577 3.37631 13.3604 2.89988 13.0091 2.54861C12.6578 2.19734 12.1814 2 11.6846 2H3.82309C3.32632 2 2.84989 2.19734 2.49862 2.54861C2.14735 2.89988 1.95001 3.37631 1.95001 3.87308V16.2269C1.95001 16.7237 2.14735 17.2001 2.49862 17.5514C2.84989 17.9027 3.32632 18.1 3.82309 18.1H11.6846C12.1814 18.1 12.6578 17.9027 13.0091 17.5514C13.3604 17.2001 13.5577 16.7237 13.5577 16.2269V13.4192C13.5577 13.005 13.2219 12.6692 12.8077 12.6692C12.3935 12.6692 12.0577 13.005 12.0577 13.4192V16.2269C12.0577 16.3259 12.0184 16.4208 11.9484 16.4907C11.8785 16.5607 11.7836 16.6 11.6846 16.6H3.82309C3.72414 16.6 3.62925 16.5607 3.55928 16.4907C3.48932 16.4208 3.45001 16.3259 3.45001 16.2269V3.87308C3.45001 3.77413 3.48932 3.67924 3.55928 3.60927Z"
                fill="currentColor"
              ></path>
              <path
                d="M15.0842 7.83509C15.3771 7.54219 15.852 7.54219 16.1449 7.83509L17.819 9.50916C17.961 9.64563 18.0493 9.83749 18.0493 10.05C18.0493 10.2612 17.9621 10.452 17.8216 10.5883L16.1449 12.265C15.852 12.5579 15.3771 12.5579 15.0842 12.265C14.7913 11.9721 14.7913 11.4972 15.0842 11.2043L15.4886 10.8H9.43781C9.02359 10.8 8.68781 10.4642 8.68781 10.05C8.68781 9.63577 9.02359 9.29999 9.43781 9.29999H15.4885L15.0842 8.89575C14.7913 8.60285 14.7913 8.12798 15.0842 7.83509Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          Log out
        </div>
        <div class="surface-control-user-menu-item" @click="openProfile">
          <div class="menu-icon-wrapper">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              width="16"
              height="16"
              aria-hidden="true"
              aria-label="My profile"
              class="icon_component icon_component--no-focus-style"
            >
              <path
                d="M9.81628 2C8.63228 2 7.49677 2.47034 6.65955 3.30756C5.82234 4.14477 5.352 5.28028 5.352 6.46429C5.352 7.64829 5.82234 8.7838 6.65955 9.62101C7.49677 10.4582 8.63228 10.9286 9.81628 10.9286C11.0003 10.9286 12.1358 10.4582 12.973 9.62101C13.8102 8.7838 14.2806 7.64829 14.2806 6.46429C14.2806 5.28028 13.8102 4.14477 12.973 3.30756C12.1358 2.47034 11.0003 2 9.81628 2ZM7.72021 4.36822C8.27613 3.81231 9.0301 3.5 9.81628 3.5C10.6025 3.5 11.3564 3.81231 11.9123 4.36822C12.4683 4.92413 12.7806 5.67811 12.7806 6.46429C12.7806 7.25046 12.4683 8.00444 11.9123 8.56035C11.3564 9.11626 10.6025 9.42857 9.81628 9.42857C9.0301 9.42857 8.27613 9.11626 7.72021 8.56035C7.1643 8.00444 6.852 7.25046 6.852 6.46429C6.852 5.67811 7.1643 4.92413 7.72021 4.36822ZM9.81629 11.7202C8.08836 11.7202 6.40482 12.2674 5.00718 13.2835C3.60954 14.2995 2.56962 15.7321 2.03658 17.3758C1.96255 17.6041 2.00224 17.854 2.14337 18.0482C2.28449 18.2423 2.51 18.3572 2.75001 18.3572H16.8826C17.1226 18.3572 17.3481 18.2423 17.4892 18.0482C17.6303 17.854 17.67 17.6041 17.596 17.3758C17.063 15.7321 16.023 14.2995 14.6254 13.2835C13.2278 12.2674 11.5442 11.7202 9.81629 11.7202ZM5.8892 14.4968C7.03051 13.6671 8.40527 13.2202 9.81629 13.2202C11.2273 13.2202 12.6021 13.6671 13.7434 14.4968C14.5964 15.1169 15.2863 15.927 15.7621 16.8572H3.87051C4.34632 15.927 5.03617 15.1169 5.8892 14.4968Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          My profile
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'surfaceControl',
  data() {
    return {
      isUserMenuOpen: false,
      user: this.$store.getters.user,
    };
  },
  created() {},
  computed: {
    loggedinUser() {
      return this.$store.getters.user;
    },
    letterToShow() {
      return this.user ? this.user.username.charAt(0).toUpperCase() : '';
    },
  },
  methods: {
    toggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
    async logOut() {
      const isLoggedOut = await this.$store.dispatch({ type: 'logout' });
      console.log('isLoggedOut', isLoggedOut);
      if (isLoggedOut) this.user = null;
      this.$router.push('/login');
    },
    openProfile() {
      console.log('open profile');
    },
  },
  watch: {
    '$store.getters.user': function (val, oldVal) {
      console.log('changed', val, oldVal);
    },
  },
  //   components: {},
};
</script>
