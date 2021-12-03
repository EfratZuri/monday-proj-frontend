<template>
	<div
		class="grid-cell-component-wrapper"
		@mouseover="togglePlusBtn"
		:class="{ selected: isSelected }"
		@click="toggleSelected"
	>
		<div class="col-cell">
			<!-- <button v-if="showPlusBtn" class="btn btn-blue">+</button> -->
			<div class="members-icon flex">
				<ion-icon name="person-circle-outline" />
			</div>
			<span>{{ infoForDisplay }} </span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'memberPicker',
	props: ['info'],

	data() {
		return {
			selectedObj: {},
			showPlusBtn: false,
			isSelected: false,
		};
	},
	created() {
		const selectedName = this.info.selected;
		if (selectedName.name === 'default') {
			this.selectedObj = selectedName;
		} else {
			this.selectedObj = this.info.opts.find(({ name }) => name === selectedName);
		}
	},
	methods: {
		update(curType, event) {
			this.$emit(curType, event);
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
		togglePlusBtn() {
			this.showPlusBtn = !this.showPlusBtn;
		},
		toggleSelected() {
			this.isSelected = !this.isSelected;
		},
	},
	computed: {
		infoForDisplay() {
			return this.selectedObj.name === 'default' ? '' : this.selectedObj.name;
		},
	},
};
</script>
