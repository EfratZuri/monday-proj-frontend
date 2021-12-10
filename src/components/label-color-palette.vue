<template>
	<section class="label-color-palette-container">
		<div class="label-color-palette-btns">
			<button
				v-for="(clr, idx) in clrs"
				:key="idx"
				@mouseover="setClr(clr)"
				@mouseleave="setClr('')"
				class="btn btn-round btn-color-label"
				@click.stop="selectColor(clr)"
				:style="{ backgroundColor: clr }"
			></button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'labelColorPalette',
	props: ['value'],
	data() {
		return {
			clrs: null,
		};
	},
	created() {
		this.clrs = `#ff158a, #bb3354, #7f5347, #ffcb00, #9cd326, #037f4c, #579bfc, #66ccff, #784bd1,
	#808080, #333, #ff7575, #faa1f1, #ffadad, #7e3b8a, #9aadbd, #68a1bd, #225091, #4eccc6, #5559df,
	#401694, #563e3e, #bda8f9, #2b76e5, #a9bee8, #d974b0, #9d99b9, #ad967a, #a1e3f6, #175a63, #bd816e`.split(
			','
		);
	},
	methods: {
		selectColor(clr) {
			console.log(
				'clr!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
				clr
			);
			this.$emit('selectColor', clr);

			// this.$emit('selected', color);
		},
		setClr(clr) {
			// this.clr = clr;
			console.log(clr);
			this.$emit('changeClr', clr);
		},
	},
};
</script>
