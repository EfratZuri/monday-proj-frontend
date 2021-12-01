<template>
	<section class="home">
		<header class="flex space-between">
			<h2>monday</h2>
			<router-link to="login" class="btn btn-blue-round">
				Get starred
				<span>icon</span>
			</router-link>
		</header>

		<h1>Work Without Limits</h1>
		<p>
			Easily build, run, and scale your dream workflows on one platform. What would you like to
			manage with monday.com Work OS?
		</p>
		<!-- TODO: - add cmp "selectable tags"-->
		<selectable-tag :tags="selectableTags" />

		<router-link to="login" class="btn btn-blue-round">
			Get starred
			<span>icon</span>
		</router-link>
		<div class="body-">
			<!-- TODO:add the video from the original page -->
			<!-- <video src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/video/video-library/Tests - DON'T USE!/hp_animation_with_text_3.mp4"></video> -->
		</div>
	</section>
</template>

<script>
import selectableTag from '@/components/selectable-tag';
export default {
	name: 'home',
	data() {
		return {
			selectableTags: [
				'Project management',
				'Sales and CRM',
				'Marketing',
				'Creative and design',
				'Software development',
				'Task management',
				'Operations',
				'HR and recruitment',
				'IT',
				'200+ workflows',
			],
		};
	},
	created() {
		this.$store.dispatch({ type: 'loadBoards' });
	},
	computed: {},
	methods: {},
	components: {
		selectableTag,
	},
};
</script>
