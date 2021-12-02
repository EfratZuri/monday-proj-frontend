<template>
	<section v-if="task" class="add-task-row">
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
		};
	},
	created() {
		this.task = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
	},
	methods: {
		addNewTask() {
			console.log('th');
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
