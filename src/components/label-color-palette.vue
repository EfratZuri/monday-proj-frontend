<template>
	<section class="label-color-palette-container">
		<div class="label-color-palette-btn">
			<button
				v-for="n in 20"
				:key="n"
				class="btn btn-round btn-color-label"
				@click.stop="selectColor(color, $event)"
			></button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'labelColorPalette',
	methods: {
		selectColor(color, ev) {
			console.log('from label color pallete', color, ev);
			// this.$emit('selected', color);
		},
	},
};
</script>
