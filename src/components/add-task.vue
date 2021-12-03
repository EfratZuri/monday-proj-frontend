<template>
	<section v-if="task" class="add-task-component flex">
		<div class="pulse-left-indicator" :style="{ backgroundColor: color, color: color }">
			<div class="left-indicator-inner"></div>
		</div>
		<input
			type="text"
			v-model="task.title"
			@focus="toggleAddBtn"
			placeholder="+Add"
			@keyup.enter="addNewTask"
		/>
		<button v-if="showAddBtn" class="btn btn-blue" @click="addNewTask">+Add</button>
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
		console.log(this.color);
	},
	methods: {
		addNewTask() {
			if (!this.task.title) return;
			this.$emit('addTask', this.task);
			this.toggleAddBtn();
			this.task.title = '';
		},
		toggleAddBtn() {
			this.showAddBtn = !this.showAddBtn;
		},
	},
};
</script>
