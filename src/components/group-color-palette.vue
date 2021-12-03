<template>
	<section class="group-color-palette dropdowm-modal">
		<button
			v-for="(color, idx) in colors"
			:key="idx"
			class="btn btn-round"
			:style="{ backgroundColor: color }"
		></button>
	</section>
</template>

<script>
export default {
	name: 'groupColorPalette',
	props: {
		colors: {
			type: Array,
			required: true,
		},
	},
	methods: {
		selected(color) {
			console.log('selected color', color);
			this.$emit('select', color);
		},
	},
};
</script>
