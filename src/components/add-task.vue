<template>
  <OnClickOutside @trigger="close">
    <section v-if="task" class="add-task-component flex">
      <div
        class="pulse-left-indicator"
        :style="{ backgroundColor: color, color: color }"
      ></div>
      <input
        type="text"
        v-model="task.title"
        @focus="showAddBtn = true"
        placeholder="+Add"
        @keyup.enter="addNewTask"
      />
      <button v-if="showAddBtn" class="btn btn-blue" @click="addNewTask">
        +Add
      </button>
    </section>
  </OnClickOutside>
</template>

<script>
import { OnClickOutside } from '@vueuse/components';
export default {
  name: 'addTask',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      task: null,
      showAddBtn: false,
      color: this.group.style.clr,
    };
  },
  created() {
    this.task = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
    this.color = this.group.style?.clr;
  },
  methods: {
    addNewTask() {
      if (!this.task.title) return;
      this.$emit('addTask', this.task);
      // this.toggleAddBtn();
      this.task.title = '';
    },
    toggleAddBtn() {
      console.log('gg');
      this.showAddBtn = !this.showAddBtn;
    },
    turnOffAdd() {
      setTimeout(() => {
        this.showAddBtn = false;
      }, 10);
    },

    close() {
      console.log('fff');
      this.showAddBtn = false;
      // tabindex="0" // @blur="toggleAddBtn"
    },
  },
  components: { OnClickOutside },
};
</script>
