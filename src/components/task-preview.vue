<template>
	<section class="task-preview">
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
		<ul v-if="cmpsOrder && cmpsOrder.length" class="cmps-list clean-list">
			<li v-for="(cmp, idx) in cmpsOrder" :key="idx" class="cell">
				<component :is="cmp" :info="getCmpInfo('cmp')" @update="updateTask" />
			</li>
		</ul>
	</section>
</template>

<script>
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
			cmps: null,
			cmpsOrder: null,
			info: null,
			taskToEdit: null,
			showEditTask: false,
		};
	},
	created() {
		this.cmps = this.$store.getters.cmps;
		this.cmpsOrder = this.cmps.cmpsOrder;
		this.info = this.cmps.info;
	},
	methods: {
		updateTask(curType, e) {
			console.log(e, curType);
		},
		getCmpInfo(cmp) {
			return this.task.cmps?.[cmp];
			// || this.getDefault(cmp);
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
		// getDefault(cmp) {
		// return { selected: null };
		// },
	},
	computed: {
		createObj(type, info) {
			return { type, info };
		},
	},
};
</script>
