<template>
	<section class="task-preview">
		<div class="task-title">
			<span v-if="!isEdit" @click="editTitle">{{ taskToEdit.title }}</span>
			<input v-else  type="text" value="taskToEdit.title" ref="titleInput" v-model="taskToEdit.title"  @keyup.enter="$event.target.blur()" @blur="editTitle"/>
		</div>
		<ul v-if="cmpsOrder && cmpsOrder.length" class="cmps-list clean-list">
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
		return {
			cmps: null,
			cmpsOrder: null,
			info: null,
			taskToEdit: {...this.task},
			isEdit: false,
		};
	},
	created() {
		this.cmpsOrder = this.$store.getters.cmpsOrder;
		this.cmps = this.$store.getters.cmps;
	},
	methods: {
		updateTask(curType, e) {
			console.log(e, curType);
		},
		async editTitle() {
			await (this.isEdit = !this.isEdit)
			if(this.$refs.titleInput) this.$refs.titleInput.focus();
			if(this.task.title !== this.taskToEdit.title) {
				console.log('editTask')
				this.$emit('saveTask', this.taskToEdit)
			}			
		},
		getCmpInfo(cmp) {
			return this.task?.[cmp] || this.getDefault(cmp);
		},
		getDefaultCmp(cmp) {
			return { selected: this.cmps.options[cmp].default, options: this.cmps[cmp].options };
		},
	},
};
</script>
