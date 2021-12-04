<template>
	<section class="task-update slide-panel">
		<header class="header-task-update flex column">
			<button class="btn-close-panel" @click="closePanel">X</button>
			<div class="task-title-update">
				<h2 v-if="!showEditTitle" @click="toggleEditTitle">{{ task.title }}</h2>
				<input v-else type="text" v-model="taskCopy.title" />
			</div>
			<div class="monday-board-subsets-tabs flex align-center">
				<div class="monday-board-subset-item">
					<button class="btn">Updates</button>
					<div class="board-subset-item__active-strip transition-enter-done"></div>
				</div>
				<div class="monday-board-subset-item">
					<button class="btn">Files</button>
				</div>
				<div class="monday-board-subset-item">
					<button class="btn">Activity Log</button>
				</div>
				<div class="add-board-subset-picker-wrapper">
					<div class="monday-board-subsets-tabs__separator"></div>
					<button class="btn">+ Add View</button>
				</div>
			</div>
		</header>
		<div class="post-top">
			<button v-if="!showTextarea" class="btn new-post-placeholder" @click="toggleTextarea">
				Write an update...
			</button>
			<div v-if="showTextarea" class="flex column">
				<textarea cols="30" rows="10" v-model="comment.txt"></textarea>
				<div class="control-btns flex space-between align-center">
					<div class="flex align-center gap">
						<button class="btn btn-blue-regular">Add files</button>
						<button class="btn btn-blue-regular">GIF</button>
						<button class="btn btn-blue-regular flex-center">Emoji</button>
						<button class="btn btn-blue-regular flex align-center">
							<span>@</span>
							<span> Mention </span>
						</button>
					</div>
					<button class="btn btn-update-panel" @click="addUpdate">Update</button>
				</div>
			</div>
		</div>
		<div class="post-list-container flex align-center">
			<ul v-if="task.comments" class="post-list clean-list">
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
			showTextarea: false,
			comment: null,
			showEditTitle: false,
			taskCopy: null,
		};
	},
	created() {
		this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
		this.taskCopy = JSON.parse(JSON.stringify(this.task));
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
		toggleEditTitle() {
			this.showEditTitle = !this.showEditTitle;
		},
	},
	components: {},
};
</script>
