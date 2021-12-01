<template>
	<section class="task-list-container">
		<ul v-if="tasks && tasks.length" class="task-list clean-list-container">
			<li v-for="task in tasks" :key="task._id">
				<taskPreview :task="task" />
				<div class="">
					<div class="user"><span>userIcon</span></div>
					<button class="btn" @click="toggleDialogNode"><span>status</span></button>
				</div>
			</li>
		</ul>
		<!-- <dialogNode v-if="showDialogNode" @change="changeStatus" /> -->
	</section>
</template>

<script>
import taskPreview from '@/components/task-preview';
export default {
	name: 'taskList',
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			taskToChange: null,
			tasks: [],
			showDialogNode: false,
		};
	},
	created() {
		this.tasks = this.group.tasks;
	},
	methods: {
		changeStatus() {
			console.log('Change task staus');
		},
		addGroup() {
			console.log('Add new group');
		},
		toggleDialogNode() {
			this.showDialogNode = !this.showDialogNode;
		},
	},
	components: {
		taskPreview,
	},
};
</script>
