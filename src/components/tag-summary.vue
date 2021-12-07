<template>
	<div
		class="grid-cell-component-wrapper date-summary-container"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell" :style="info.data.style">
			<div v-if="tags && tags.length">
				<span v-for="(tag, idx) in tags" :key="idx" :style="tag.style">
					{{ tagForDisplay(tag.txt) }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tagSummary',
	props: ['info'],
	data() {
		return {
			tags: null,
		};
	},
	created() {
		console.log(this.info);
		this.tags = this.info.group.tasks.filter((task) => task?.tagPicker);
	},
	methods: {
		tagForDisplay(txt) {
			return `#${txt}`;
		},
	},
};
</script>
