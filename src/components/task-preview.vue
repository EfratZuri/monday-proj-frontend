<template>
	<div class="task-preview"></div>
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
};
</script>
