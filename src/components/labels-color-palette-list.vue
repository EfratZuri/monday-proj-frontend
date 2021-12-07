<template>
	<div class="labels-color-palette-list-container">
		<button
			class="btn btn-round"
			v-for="(clr, idx) in clrs"
			:key="idx"
			:style="{ backgroundColor: clr }"
			@click="selectColor(clr)"
		></button>
	</div>
</template>

<script>
export default {
	name: 'labelsColorPaletteList',
	methods: {
		selectColor(clr) {
			this.$emit('selected', clr);
			console.log(clr);
		},
	},
	computed: {
		clrs() {
			return this.$store.getters.labelClrPalette;
		},
	},
	component: {},
};
</script>
