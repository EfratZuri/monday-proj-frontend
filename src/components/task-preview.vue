<template>
  <section
    class="task-preview flex-def"
    @mouseover="showEditBtn = true"
    @mouseleave="showEditBtn = false"
  >
    <div class="name-cell flex align-center">
      <div
        class="pulse-left-indicator"
        :style="{ backgroundColor: styleObj.clr, color: styleObj.clr }"
      >
        <div class="left-indicator-inner"></div>
      </div>
      <div class="task-title" @click="getTaskToEdit">
        <!-- <button class="btn" @click="deleteTask">X</button> -->
        <span v-if="!showEditTask">
          {{ task.title }}
        </span>
        <input
          v-else
          type="text"
          ref="taskTitle"
          v-model="taskToEdit.title"
          @blur="saveTitle"
          @keyup.enter="$event.target.blur()"
        />
        <div class="edit-btn-wrapper">
          <button v-if="showEditBtn" class="btn btn-edit" @click="toggleEdit">
            EDIT
          </button>
        </div>
      </div>
    </div>

    <div class="grid-cells-row-component">
      <component
        v-for="(col, idx) in cols"
        :key="idx"
        :is="col.type"
        :info="getCmpInfo(col)"
      />
    </div>
    <!-- <div class="grid-cells-row-component-wrapper">
			<ul v-if="cols && cols.length" class="col-list clean-list flex-def">
				<li v-for="(col, idx) in cols" :key="idx" class="col-cell">
					<component :is="col.type" :info="getCmpInfo(col)" />
				</li>
			</ul>
		</div> -->
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
    styleObj: {
      type: Object,
    },
  },
  data() {
    return {
      cols: null,
      cmpsOrder: null,
      info: null,
      taskToEdit: null,
      showEditTask: false,
      showEditBtn: false,
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
      console.log('object');
      this.showEditTask = !this.showEditTask;
      //   if (this.$refs.taskTitle) this.$refs.taskTitle.focus();
    },
    getTaskToEdit() {
      this.taskToEdit = JSON.parse(JSON.stringify(this.task));
    },

    saveTitle() {
      this.toggleEdit();
      //   if (this.$refs.taskTitle) this.$refs.taskTitle.focus();
      this.$emit('saveTitle', this.taskToEdit);
    },

    deleteTask() {
      this.getTaskToEdit();
      this.$emit('deleteTask', this.taskToEdit);
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
  // <!-- @blur="saveTitle" -->
};
</script>
