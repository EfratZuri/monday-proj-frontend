<template>
	<section v-if="task" class="add-task-component flex" :class="{ 'add-btn-visible': showAddBtn }">
		<div class="pulse-left-indicator" :style="{ backgroundColor: color, color: color }" />
		<input
			type="text"
			v-model="task.title"
			@focus="showAddBtn = true"
			placeholder="+Add"
			@keyup.enter="addNewTask"
			@blur="turnOffAdd"
		/>
		<button v-if="showAddBtn" class="btn btn-blue" @click="addNewTask">+Add</button>
		<div class="space-item"></div>
		<div class="indicator"></div>
	</section>
</template>

<script>
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
			this.task.title = '';
		},
		toggleAddBtn() {
			this.showAddBtn = !this.showAddBtn;
		},
		turnOffAdd() {
			// Vue.nextTick().then(() => (this.showAddBtn = false));
		},
	},
};
</script>
