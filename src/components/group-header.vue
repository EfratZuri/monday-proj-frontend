<template>
	<section class="group-header flex align-center">
		<!-- This Span eill include the icons when a user hover over the header -->
		<span></span>
		<div class="group-header-title">
			<!-- TODO: on click-an input should apper -->
			<span @click="editTitle">{{ group.title }}</span>
			<!-- TODO: show this input to edit the group title  -->
			<!-- <input type="text" /> -->
		</div>
		<div class="group-header-status">
			<!-- TODO: on click-an input should apper -->
			<span>Status</span>
			<!-- TODO: show this input to edit the group name  -->
			<!-- <input type="text" /> -->
		</div>
		<div class="group-header-date">
			<!-- TODO: on click-an input should apper -->
			<span>Date</span>
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
			type: Object,
			required: true,
		},
	},
	methods: {
		editTitle() {
			console.log('editTitle');
		}
	}
};
</script>
