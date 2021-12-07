<template>
	<div
		class="grid-cell-component-wrapper picker-component"
		:class="{ 'dropdown-open': showOptions }"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell" :style="info.data.style">
			<div
				v-if="styleObj"
				class="priority-picker-txt flex align-center"
				@mouseover="fold = true"
				@mouseleave="fold = false"
				:style="styleObj"
				@click="togglePriorityPicker"
			>
				<span :class="{ 'fold-triangle': fold }"></span>
				<span>{{ infoForDisplay }} </span>
			</div>
		</div>
		<labels-popup v-if="showOptions" :opts="optsCopy" @update="update" />
	</div>
</template>

<script>
import labelsPopup from '@/components/labels-popup';

export default {
	name: 'priorityPicker',
	props: ['info'],

	data() {
		return {
			styleObj: null,
			showOptions: false,
			selected: {},
			opts: null,
			optsCopy: null,
			fold: false,
		};
	},
	watch: {
		info: {
			handler() {
				this.selected = this.info.selected;
				console.log('Selected form priority!!!!!!!!!!!!!!', this.selected);
				this.styleObj = this.selected.style;
				this.opts = this.info.data.opts;
				this.optsCopy = JSON.parse(JSON.stringify(this.opts));
			},
			deep: true,
			immediate: true,
		},
	},

	methods: {
		update(opt) {
			this.$emit('update', opt);
			this.togglePriorityPicker();
		},
		togglePriorityPicker() {
			this.showOptions = !this.showOptions;
		},
		getOptStyle(opt) {
			return opt.style;
		},
	},
	computed: {
		infoForDisplay() {
			return this.selected.display;
		},
	},
	components: { labelsPopup },
};
</script>
