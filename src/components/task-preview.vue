<template>
	<section class="task-preview">
		<ul v-if="cmps && cmps.length" class="cmps-list clean-list">
			<li v-for="(cmp, idx) in cmpsOrder" :key="idx" class="cell">
				<component :is="cmp" :info="getCmpInfo('cmp')" @update="updateTask" />
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'taskPreview',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	data() {
		return { cmps: null, cmpsOrder: null, info: null };
	},
	created() {
		this.cmps = this.$store.getters.cmps;
		this.cmpsOrder = this.cmps.cmpsOrder;
		this.info = this.cmps.info;
	},
	methods: {
		updateTask(curType, e) {
			console.log(e, curType);
		},
		getCmpInfo(cmp) {
			return this.task.cmps?.[cmp];
			// || this.getDefault(cmp);
		},
		// getDefault(cmp) {
		// return { selected: null };
		// },
	},
	computed: {
		// cmps() {
		// 	return [
		// 		{
		// 			type: 'status-picker',
		// 			info: {
		// 				selectedStatus: 'pending',
		// 				stauses: [{ name: 'pending', clr: '#f7f9f9' }],
		// 			},
		// 		},
		// 		{
		// 			type: 'member-picker',
		// 			info: {
		// 				selectedMembers: ['m1', 'm2'],
		// 				members: ['m1', 'm2', 'm3'],
		// 			},
		// 		},
		// 	];
		// 	// return this.$store.getters.cmps;
		// },
		createObj(type, info) {
			return { type, info };
		},
	},
	components: {},
};
</script>
