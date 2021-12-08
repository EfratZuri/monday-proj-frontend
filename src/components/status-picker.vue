<template>
	<div
		class="grid-cell-component-wrapper picker-component"
		:class="{ 'dropdown-open': showOptions }"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div
			v-if="styleObj"
			class="col-cell"
			:style="info.data.style"
			@mouseover="fold = true"
			@mouseleave="fold = false"
		>
			<div
				class="status-picker-txt flex align-center"
				:style="styleObj"
				@click="toggleStatusPicker"
			>
				<span :class="{ 'fold-triangle': fold }"></span>
				<span>{{ infoForDisplay }} </span>
			</div>
		</div>
		<labels-popup v-if="showOptions" @apply="saveLabel" :opts="opts" />
	</div>
</template>

<script>
import labelsPopup from '@/components/labels-popup';
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
			showEditModal: false,
		};
	},
	watch: {
		info: {
			handler() {
				this.selected = this.info.selected;
				this.styleObj = this.selected.style;
				this.opts = this.info.data.opts;
				this.optsCopy = this.info.data.opts;
			},
			deep: true,
			immediate: true,
		},
	},

	methods: {
		toggleEditModal() {
			this.showEditModal = !this.showEditModal;
		},
		update(opt) {
			this.$emit('update', opt);
			this.toggleStatusPicker();
		},
		toggleStatusPicker() {
			this.showOptions = !this.showOptions;
		},

		saveLabel(label) {
			console.log('save label', label);
		},
	},
	computed: {
		infoForDisplay() {
			return this.selected.display;
		},
	},
	components: {
		labelsPopup,
	},
};
</script>
