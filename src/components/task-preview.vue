<template>
  <section class="task-preview flex-def">
    <div class="task-title" @click="getTaskToEdit">
      <span v-if="!showEditTask">
        {{ task.title }}
      </span>
      <input
        v-else
        type="text"
        ref="taskTitle"
        v-model="taskToEdit.title"
        @keyup.enter="$event.target.blur()"
        @blur="saveTitle"
      />
    </div>
    <ul v-if="cols && cols.length" class="col-list clean-list flex-def">
      <li v-for="(col, idx) in cols" :key="idx" class="col-cell">
        <component :is="col.type" :info="getCmpInfo(col)" />
      </li>
    </ul>
  </section>
</template>

<script>
import statusPicker from '../components/status-picker';
import datePicker from '../components/date-picker';
import memberPicker from '../components/member-picker';
export default {
  name: 'taskPreview',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cols: null,
      cmpsOrder: null,
      info: null,
      taskToEdit: null,
      showEditTask: false,
    };
  },
  created() {
    this.cmpsOrder = this.$store.getters.cmpsOrder;
    this.cols = this.$store.getters.cols;
  },
  methods: {
    updateTask(curType, e) {
      console.log(e, curType);
    },

    toggleEdit() {
      this.showEditTask = !this.showEditTask;
    },
    getTaskToEdit() {
      this.toggleEdit();
      this.taskToEdit = JSON.parse(JSON.stringify(this.task));
    },
    saveTitle() {
      this.toggleEdit();
      if (this.$refs.taskTitle) this.$refs.taskTitle.focus();
      this.$emit('saveTitle', this.taskToEdit);
    },
    getCmpInfo(col) {
      if (!this.task?.[col.type]) return this.getDefaultCmp(col);

      return { selected: this.task[col.type], opts: col.data.opts };
    },
    getDefaultCmp(col) {
      // return { selected: .options[cmp].default, options: this.cols[cmp].options };
      return {
        selected: col.data.opts.find(({ name }) => name === 'default'),
        opts: col.data.opts,
      };
    },
  },
  components: {
    statusPicker,
    datePicker,
    memberPicker,
  },
};
</script>
