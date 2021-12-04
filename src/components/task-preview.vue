<template>
	<section class="grid-row-component task-preview flex-def">
		<div
			class="grid-cell-row-component-header name-cell flex align-center"
			:class="{ selected: isCellSelected }"
			@click="togglePostPanel"
		>
			<div
				class="pulse-left-indicator"
				:style="{ backgroundColor: styleObj.clr, color: styleObj.clr }"
			>
				<div class="left-indicator-inner flex align-center">
					<div
						class="left-indicator-checkbox"
						:class="{ selected: isTaskSelected }"
						@click="selectTask"
					></div>
				</div>
			</div>
			<div class="task-title flex align-center">
				<!-- <button class="btn" @click="deleteTask">X</button> -->
				<span v-if="!showEditTask">
					{{ task.title }}
				</span>
				<button v-if="!showEditTask" class="btn btn-edit" @click.stop="toggleEdit">Edit</button>
				<input
					v-else
					type="text"
					ref="taskTitle"
					v-model="taskToEdit.title"
					@blur="saveTitle"
					@keyup.enter="$event.target.blur()"
				/>
				<!-- <div class="edit-btn-wrapper"> -->
				<!-- </div> -->
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
			isTaskSelected: false,
			isCellSelected: false,
			showCheckBox: false,
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
		selectTask() {
			console.log('Select task');
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
