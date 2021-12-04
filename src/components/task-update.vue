<template>
	<section v-if="taskToEdit" class="task-update slide-panel">
		<header class="header-task-update flex column">
			<button class="btn-close-panel" @click="closePanel">X</button>
			<h2>{{ task.title }}</h2>
		</header>
		<div class="post-top">
			<button v-if="!showTextarea" class="btn new-post-placeholder" @click="toggleTextarea">
				Write an update
			</button>
			<div v-if="showTextarea" class="flex column">
				<textarea
					cols="30"
					rows="10"
					placeholder="Write an update"
					v-model="comment.txt"
				></textarea>
				<button class="btn btn-update-panel" @click="addUpdate">Update</button>
			</div>
		</div>
		<div class="post-list-container">
			<ul v-if="task.comments" class="post-list">
				<li v-for="comment in task.comments" :key="comment.id" class="post">
					<div class="post-txt">
						<span>{{ comment.txt }}</span>
					</div>
					<div class="post-actions-container flex">
						<div class="post-like-action">
							<div class="post-like-btn"><span>Like</span></div>
						</div>
						<div class="post-replay-action">
							<div class="post-replay-btn"><span>Replay</span></div>
						</div>
					</div>
				</li>
			</ul>
			<div v-else class="post-no-found">
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
			comment: null,
		};
	},
	created() {
		this.taskToEdit = JSON.parse(JSON.stringify(this.$store.getters.taskToEdit));
		this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
	},
	methods: {
		addUpdate() {
			this.showTextarea = false;
			if (!this.comment.txt) return;
			const details = { comment: this.comment, taskId: this.task._id };
			this.$emit('saveUpdate', details);
		},
		toggleTextarea() {
			this.showTextarea = !this.showTextarea;
		},
		closePanel() {
			this.$emit('closePanel');
		},
	},
	components: {},
};
</script>
