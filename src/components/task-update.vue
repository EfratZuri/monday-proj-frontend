<template>
	<section v-if="taskToEdit" class="task-update slide-panel">
		<header class="header-task-update flex column">
			<h2>{{ task.title }}</h2>
			<button>X</button>
		</header>
		<button class="btn new-post-placeholder" @click="toggleTextarea">Write an update</button>
		<div v-if="showTextarea" class="flex column">
			<textarea
				name=""
				id=""
				cols="30"
				rows="10"
				placeholder="Write an update"
				v-model="updateMsg"
			></textarea>
			<button class="btn btn-blue" @click="addUpdate">Update</button>
		</div>
		<div class="post-list-container">
			<ul v-if="tasks.length" class="post-list">
				<li v-for="task in tasks" :key="task._id" class="post">
					<div>
						<span>{{ task.updates }}</span>
					</div>
				</li>
			</ul>
			<div v-else class="">
				<span>No updates yet...</span>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'taskUpdate',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			updateMsg: '',
			taskToEdit: null,
			showTextarea: false,
		};
	},
	created() {
		this.taskToEdit = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
		console.log('he');
	},
	methods: {
		addUpdate() {
			if (!this.updateMsg) return;
			this.$emit('saveUpdate', this.updateMsg);
		},
		toggleTextarea() {
			this.showTextarea = !this.showTextarea;
		},
	},
	components: {},
};
</script>
