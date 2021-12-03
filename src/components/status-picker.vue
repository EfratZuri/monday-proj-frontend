<template>
	<div
		class="grid-cell-component-wrapper picker-component"
		:class="{ 'dropdown-open': showOptions }"
	>
		<div
			v-if="styleObj"
			class="col-cell status-picker-txt"
			:style="styleObj"
			@click="toggleStatusPicker"
		>
			<span>{{ infoForDisplay }} </span>
		</div>
		<div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container">
				<div
					v-for="(opt, idx) in opts"
					:key="idx"
					:style="getOptStyle(opt)"
					class="dropdown-inner-container"
					@click="update(opt)"
				>
					<div class="picker-opt-container">
						<span>{{ opt.display }}</span>
					</div>
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
			console.log(this.selected);
			console.log(this.selected.name === 'default' ? '' : this.selected.display);
			return this.selected.name === 'default' ? '' : this.selected.display;
		},
	},
};
</script>
