<template>
	<div class="task-preview">
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
	components: {
		component,
	},
};
</script>
