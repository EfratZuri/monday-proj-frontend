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
		<div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container flex space-between column">
				<div class="priority-list">
					<div
						v-for="(opt, idx) in opts"
						:key="idx"
						:style="getOptStyle(opt)"
						class="dropdown-inner-container"
						@click="update(opt)"
					>
						<div class="picker-opt-container flex align-center">
							<span>{{ opt.display }}</span>
						</div>
					</div>
				</div>
				<div class="picker-dropdown-footer flex align-center">
					<button class="btn">Add/Edit Labels</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'priorityPicker',
	props: ['info'],

	data() {
		return {
			styleObj: null,
			showOptions: false,
			selected: {},
			opts: null,
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
};
</script>
