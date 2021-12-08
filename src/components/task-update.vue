<template>
	<section class="task-update slide-panel">
		<header class="header-task-update flex column">
			<button class="btn btn-icon btn-close-panel" @click="closePanel">X</button>
			<div class="task-title-update">
				<h2 v-if="!showEditTitle" @click="toggleEditTitle">{{ task.title }}</h2>
				<input v-else type="text" v-model="task.title" />
			</div>
			<div class="monday-board-subsets-tabs flex align-center">
				<div class="monday-board-subset-item">
					<button class="btn" @click="openUpdate">Updates</button>
					<div class="board-subset-item__active-strip transition-enter-done"></div>
				</div>
				<div class="monday-board-subset-item">
					<button class="btn">Files</button>
				</div>
				<div class="monday-board-subset-item">
					<button class="btn" @click="openActivityLog">Activity Log</button>
				</div>
				<div class="add-board-subset-picker-wrapper">
					<div class="monday-board-subsets-tabs__separator"></div>
					<button class="btn">+ Add View</button>
				</div>
			</div>
		</header>
		<div v-if="isUpdate" class="update-container">
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
						<button class="btn btn-update-panel" @click="saveComment">Update</button>
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
								<div class="btn post-like-btn"><span>Like</span></div>
							</div>
							<div class="post-replay-action">
								<div class="btn post-replay-btn"><span>Replay</span></div>
							</div>
						</div>
					</li>
				</ul>
				<div v-else class="post-no-found">
					<span>No updates yet...</span>
				</div>
			</div>
		</div>

		<div v-if="isActivityLog" class="activity-log-container">
			<div class="activity-log-navigation">
				<div><span>Other activities</span></div>
				<div class="activity-log-navigation-buttons">
					<button class="btn activity-log-btn">Integrations Activity</button>
					<button class="btn activity-log-btn">Automations Activity</button>
				</div>
			</div>
			<div class="board-log-filter">
				<div class="log-drop-down-filter">
					<button class="btn btn-blue">Filter Log</button>
				</div>
				<div class="log-person-filter">
					<div class="log-person-item">
						<ion-icon name="person-circle-outline"></ion-icon>
						<span class="item-title">Person</span>
					</div>
				</div>
			</div>
			<ul v-if="board.activities">
				<li v-for="activity in board.activities" :key="activity.id">
					<div class="activity-box">
						<div class="time">
							<span>Time </span>
						</div>
						<div class="activity-and-user">
							<div class="user">
								<ion-icon name="person-circle-outline"></ion-icon>
							</div>
							<div class="task-title">
								<span>{{ task.title }}</span>
							</div>
						</div>
						<div class="additional-values">
							<div class="separator"></div>
							<div class="change-action">
								<div class="action">
									<span>{{ activity.txt }}</span>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
// import moment from 'moment';
export default {
	name: 'taskUpdate',
	props: {
		task: {
			type: Object,
			required: true,
		},
		board: {
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
			isUpdate: true,
			isActivityLog: false,
		};
	},
	created() {
		this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
	},
	computed: {
		taskCopy() {
			console.log('this.task', this.task);
			return JSON.parse(JSON.stringify(this.task));
		},
	},
	methods: {
		saveComment() {
			this.showTextarea = false;
			if (!this.comment.txt) return;
			const details = { comment: this.comment, taskId: this.task.id };
			this.$emit('saveComment', details);
			if (!this.task.comments) this.task.comments = [];
			this.task.comments.push(this.comment);
			this.comment = JSON.parse(JSON.stringify(this.$store.getters.commentToEdit));
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
		openActivityLog() {
			this.isActivityLog = true;
			this.isUpdate = false;
		},
		openUpdate() {
			this.isActivityLog = false;
			this.isUpdate = true;
		},
	},
	components: {},
};
</script>
