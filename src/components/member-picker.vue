<template>
	<div
		class="grid-cell-component-wrapper member-picker-component"
		@mouseover="togglePlusBtn"
		:class="[{ selected: isSelected }, { 'dropdown-open': showOptions }]"
		@click="toggleSelected"
	>
		<div class="col-cell" @click="toggleOptions">
			<!-- <button v-if="showPlusBtn" class="btn btn-blue">+</button> -->
			<div class="members-icon flex">
				<ion-icon name="person-circle-outline" />
			</div>
			<span>{{ infoForDisplay }} </span>
		</div>
		<!-- <div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container">
				<div class="member-input-container">
					<input type="text" v-model="memeberName" placeholder="Enter name" />
				</div>
				<div class="members-container flex column">
					<div class="flex align-center"><span>People</span></div>
					<ul v-if="members && members.length" class="clean-list member-list">
						<li v-for="(member, idx) in members" :key="idx" class="member-row">
						</li>
					</ul>
					<p v-else>No members to show...</p>
				</div>
			</div>
		</div> -->
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
			showOptions: false,
		};
	},
	created() {
		const selectedName = this.info.selected;
		if (selectedName.name === 'default') {
			this.selectedObj = selectedName;
		} else this.selectedObj = this.info.opts.find(({ name }) => name === selectedName);
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
