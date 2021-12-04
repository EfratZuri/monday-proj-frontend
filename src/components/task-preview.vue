<template>
	<section
		class="grid-row-component task-preview flex-def"
		@mouseover="showEditBtn = true"
		@mouseleave="showEditBtn = false"
	>
		<div
			class="grid-cell-row-component-header name-cell flex align-center"
			:class="{ selected: isCellSelected }"
			@click="togglePostPanel"
		>
			<!-- <div class="menu-edit-task-container" :class="{ selected: showTaskMenu }">
				<button class="btn" @click="toggleShowTaskMenu">
					<font-awesome-icon icon="caret-down" />
				</button>
				<task-menu v-if="showTaskMenu" :task="task" />
			</div> -->
			<div
				class="pulse-left-indicator"
				:style="{ backgroundColor: styleObj.clr, color: styleObj.clr }"
			>
				<div class="left-indicator-inner flex align-center">
					<div class="left-indicator-checkbox" :class="{ selected: isTaskSelected }"></div>
				</div>
			</div>
			<div class="task-title flex align-center">
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
					<button v-if="showEditBtn" class="btn btn-edit" @click.stop="toggleEdit">EDIT</button>
				</div>
			</div>
		</div>
		<div class="grid-cells-row-component">
			<component
				v-for="(col, idx) in cols"
				:key="idx"
				:is="col.type"
				:info="getCmpInfo(col)"
				@update="update($event, col.type)"
			/>
		</div>
		<task-update v-if="showPostPanel" :task="task" />
	</section>
</template>

<script>
import statusPicker from '../components/status-picker';
import datePicker from '../components/date-picker';
import memberPicker from '../components/member-picker';
import taskMenu from '@/components/task-menu';
import taskUpdate from '@/components/task-update';
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
			taskToEdit: null,
			showEditTask: false,
			showEditBtn: false,
			isTaskSelected: false,
			isCellSelected: false,
			showCheckBox: false,
			showTaskMenu: false,
			showPostPanel: false,
		};
	},
	created() {
		this.taskToEdit = { ...this.task };
		this.cmpsOrder = this.$store.getters.cmpsOrder;
		this.cols = this.$store.getters.cols;
	},
	methods: {
		togglePostPanel() {
			this.showPostPanel = !this.showPostPanel;
		},
		toggleShowTaskMenu() {
			this.showTaskMenu = !this.showTaskMenu;
		},
		toggleCellSelected() {
			this.isCellSelected = !this.isCellSelected;
		},
		async toggleEdit() {
			this.toggleCellSelected();
			await (this.showEditTask = !this.showEditTask);
			if (this.$refs.taskTitle) this.$refs.taskTitle.focus();
		},
		saveTitle() {
			this.toggleEdit();
			this.$emit('saveTitle', this.taskToEdit);
		},

		deleteTask() {
			this.$emit('deleteTask', this.taskToEdit);
		},

		getCmpInfo(col) {
			if (!this.task?.[col.type]) return this.getDefaultCmp(col);

			return { selected: this.task[col.type], opts: col.data.opts };
		},
		getDefaultCmp(col) {
			return {
				selected: col.data.opts.find(({ name }) => name === 'default'),
				opts: col.data.opts,
			};
		},
		update(ev, type) {
			const copyTask = JSON.parse(JSON.stringify(this.task));
			copyTask[type] = ev;
			this.$emit('updatePicker', copyTask);
		},
	},
	components: {
		statusPicker,
		datePicker,
		memberPicker,
		taskMenu,
		taskUpdate,
	},
	// <!-- @blur="saveTitle" -->
};
</script>
