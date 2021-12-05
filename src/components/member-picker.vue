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
		<div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container">
				<div class="member-input-container">
					<input type="text" v-model="memberName" placeholder="Enter name" />
				</div>
				<div class="member-list-container flex column">
					<div class="member-list-title">
						<span>People</span>
					</div>
					<ul v-if="opts && opts.length" class="clean-list member-list">
						<li v-for="(member, idx) in opts" :key="idx" class="member-row">
							<!-- TODO:add user image -->
							<!-- <img :src="member.imgUrl" alt=""> -->
							<span>{{ member.username }}</span>
						</li>
					</ul>
					<p v-else>No members to show...</p>
					<div class="picker-dropdown-footer">
						<button class="btn">Invite a new member by email</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'memberPicker',
	props: ['info'],

	data() {
		return {
			selectedCopy: {},
			showPlusBtn: false,
			isSelected: false,
			showOptions: false,
			memberName: '',
			opts: null,
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
		this.opts = this.info.opts;
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
			return this.selectedCopy.name === 'default' ? '' : this.selectedCopy.name;
		},
	},
};
</script>
