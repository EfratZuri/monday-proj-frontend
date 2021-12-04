<template>
	<section class="first-level-control-content flex column">
		<div class="control-content-container">
			<button class="btn btn-round btn-open-control flex align-center" @click="toggleOpen">
				<font-awesome-icon icon="chevron-right" />
			</button>
			<div class="home-control-component flex column" :class="{ open: showControlContent }"></div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'controlContent',
	data() {
		return {
			showControlContent: false,
		};
	},
	created() {},
	methods: {
		toggleOpen() {
			this.showControlContent = !this.showControlContent;
		},
	},
};
</script>
