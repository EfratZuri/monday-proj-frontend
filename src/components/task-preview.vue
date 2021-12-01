<template>
	<div class="task-preview">
		<ul class="clean-list">
			<li v-for="(cmp, idx) in cmps" :key="idx"></li>
		</ul>
		<component :is="curCmp.type" :info="curCmp.info" @update="updateTask" />
	</div>
</template>

<script>
import component from '@/components/component';
export default {
	name: 'taskPreview',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	methods: {
		updateTask(curType, e) {
			console.log(e, curType);
		},
	},
	computed: {
		cmps() {
			return [
				{
					type: 'status-picker',
					info: {
						selectedStatus: 'pending',
						stauses: [{ name: 'pending', clr: '#f7f9f9' }],
					},
				},
				{
					type: 'member-picker',
					info: {
						selectedMembers: ['m1', 'm2'],
						members: ['m1', 'm2', 'm3'],
					},
				},
			];
			// return this.$store.getters.cmps;
		},
		createObj(type, info) {
			return { type, info };
		},
	},
	components: {
		component,
	},
};
</script>
