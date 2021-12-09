<template>
	<div
		class="grid-cell-component-wrapper member-picker-component"
		:class="[{ selected: isSelected }, { 'dropdown-open': showOptions }]"
		@click="toggleSelected"
		:style="{ width: info.data.style.maxWidth }"
	>
		<div class="col-cell" @click="toggleOptions">
			<!-- <button v-if="showPlusBtn" class="btn btn-blue">+</button> -->
			<div class="members-icon flex align-center">
				<img
					src="@/assets/dapulse-person-column.svg"
					alt=""
					aria-hidden="true"
					class="person-bullet-image person-bullet-component"
				/>
				<!-- <ion-icon name="person-circle-outline" /> -->
			</div>
			<button class="btn btn-icon btn-add">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="hero-icon"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<!-- <span>{{ infoForDisplay }} </span> -->
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
			isSelected: false,
			showOptions: false,
			memberName: '',
			opts: null,
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
		this.opts = this.info.data.opts;
	},
	methods: {
		update(curType, event) {
			this.$emit(curType, event);
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
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
