<template>
	<div
		class="grid-cell-component-wrapper picker-component"
		:class="{ 'dropdown-open': showOptions }"
	>
		<div
			v-if="styleObj"
			class="col-cell status-picker-txt flex align-center"
			@mouseover="fold = true"
			@mouseleave="fold = false"
			:style="styleObj"
			@click="toggleStatusPicker"
		>
			<span :class="{ 'fold-triangle': fold }"></span>
			<span>{{ infoForDisplay }} </span>
		</div>
		<div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container flex space-between column">
				<div class="status-list">
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
	name: 'statusPicker',
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
	created() {
		this.selected = this.info.selected;
		this.styleObj = this.selected.style;
		this.opts = this.info.opts;
	},
	methods: {
		update(opt) {
			this.$emit('update', opt);
			this.toggleOptions();
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
		toggleStatusPicker() {
			this.showOptions = !this.showOptions;
		},
		getOptStyle(opt) {
			return opt.style;
		},
	},
	computed: {
		infoForDisplay() {
			return this.selected.name === 'default' ? '' : this.selected.display;
		},
	},
};
</script>
