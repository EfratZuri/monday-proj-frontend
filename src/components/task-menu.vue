<template>
  <section class="task-menu-container dropdown-modal">
    <button class="btn btn-icon menu-item">
      <font-awesome-icon icon="arrows-alt-v" />
      <span>Open</span>
    </button>
    <button class="btn btn-icon menu-item" @click="select">Select item</button>
    <div class="menu-item" @click="remove"><span>Delete</span></div>
    <button class="btn btn-icon menu-item" @click="duplicate">
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        width="16"
        height="16"
        aria-hidden="true"
        aria-label="Duplicate Board"
        class="icon_component icon_component--no-focus-style"
      >
        <path
          d="M7.82576 3.7273C7.82576 3.58922 7.93769 3.47729 8.07576 3.47729H9.76937H13.1567C13.2184 3.47729 13.278 3.50016 13.3239 3.54147L15.94 5.89592C15.9927 5.94334 16.0227 6.01088 16.0227 6.08175V13.3637C16.0227 13.5017 15.9108 13.6137 15.7727 13.6137H8.07576C7.93769 13.6137 7.82576 13.5017 7.82576 13.3637V3.7273ZM8.07576 1.97729C7.10926 1.97729 6.32576 2.7608 6.32576 3.7273V4.88639H5.16667C4.20017 4.88639 3.41667 5.66989 3.41667 6.63639V16.2727C3.41667 17.2392 4.20018 18.0228 5.16667 18.0228H11.8939C12.8604 18.0228 13.6439 17.2392 13.6439 16.2727V15.1137H15.7727C16.7392 15.1137 17.5227 14.3302 17.5227 13.3637V6.08175C17.5227 5.58565 17.3122 5.11286 16.9434 4.78098L14.3274 2.42653C14.006 2.13732 13.589 1.97729 13.1567 1.97729H9.76937H8.07576ZM12.1439 15.1137H8.07576C7.10927 15.1137 6.32576 14.3302 6.32576 13.3637V6.38639H5.16667C5.0286 6.38639 4.91667 6.49831 4.91667 6.63639V16.2727C4.91667 16.4108 5.0286 16.5227 5.16667 16.5227H11.8939C12.032 16.5227 12.1439 16.4108 12.1439 16.2727V15.1137Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span>Duplicate</span>
    </button>
    <div class="btn btn-relative">
      <button class="btn btn-icon menu-item" @mousemove="toggleMoveToOptions">
        <font-awesome-icon icon="arrow-right" />
        <span>Move To</span>
      </button>
      <!-- <move-to-opts v-if="showMoveToOptions" />
			<div>
				<button class="btn opt-item" @click="">Move to top</button>
				<button class="btn opt-item">Move to group</button>
				<button class="btn opt-item">Move to board</button>
			</div> -->
    </div>

    <button class="btn btn-icon menu-item" @click="remove">
      <font-awesome-icon icon="trash-alt" />
      <span>Delete</span>
    </button>
  </section>
</template>

<script>
// import moveToOpts from '../components/move-to-opts.vue';
export default {
  name: 'taskMenu',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showMoveToOptions: false,
    };
  },
  methods: {
    toggleMoveToOptions() {
      this.showMoveToOptions = !this.showMoveToOptions;
    },
    remove() {
      this.$emit('remove', this.task);
    },
    select() {
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      taskCopy.isSelected = true;
      this.$emit('select', taskCopy);
    },
    duplicate() {
      const taskCopy = JSON.parse(JSON.stringify(this.task));
      taskCopy.id = '';
      taskCopy.title = taskCopy.title + '(copy)';
      this.$emit('duplicate', taskCopy);
    },
  },
  components: {
    // moveToOpts,
  },
};
</script>
