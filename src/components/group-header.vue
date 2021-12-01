<template>
	<section class="group-header">
		<!-- This Span eill include the icons when a user hover over the header -->
		<span></span>
		<div class="group-name">
			<!-- TODO: on click-an input should apper -->
			<span>{{ group.name }}</span>
			<!-- TODO: show this input to edit the group name  -->
			<!-- <input type="text" /> -->
		</div>
	</section>
</template>

<script>
export default {
	name: 'groupHeader',
	props: {
		group: {
			type: Array,
			required: true,
		},
	},
};
</script>
