<template>
	<div class="group-list-container">
		<ul v-if="groups && groups.length" class="group-list clean-list">
			<li class="group" v-for="(group, idx) in groups" :key="idx">
				<div class="group-header">
					<!-- This Span eill include the icons when a user hover over the header -->
					<span></span>
					<div class="group-name">
						<!-- TODO: on click-an input should apper -->
						<span>{{ group.name }}</span>
						<!-- TODO: show this input to edit the group name  -->
						<!-- <input type="text" /> -->
					</div>
				</div>
				<taskList :group="group" />
			</li>
		</ul>
		<!-- <button class="btn" :style="{ color: groupToEdit?.color || '#fff' }" @click="addGroup"> -->
		<button class="btn" :style="styleObj" @click="addGroup">+ Add new group</button>
	</div>
</template>

<script>
import taskList from '@/components/task-list.vue';
export default {
	name: 'groupList',
	props: {
		boards: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			groupToEdit: {},
			groups: [],
			styleObj: {},
			showRename: false,
		};
	},
	created() {
		this.groupToEdit = this.$store.getters.groupToEdit;
		this.styleObj = { color: this.groupToEdit?.color || '#000' };
		this.groups = this.boards[0].groups;
	},
	methods: {
		renameGroup() {
			this.showRename = !this.showRename;
		},
		addGroup() {
			this.$emit('addGroup', this.groupToEdit);
		},
	},
	computed: {},
	components: { taskList },
};
</script>
