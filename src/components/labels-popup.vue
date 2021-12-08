<template>
	<div class="dropdown-modal picker-dropdown-component">
		<div class="picker-dropdown-inner-container flex space-between column">
			<div v-if="!showEditModal" class="status-list">
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
			<!-- <div v-else class="flex dropdown-inner-container labels-list column">
				<div
					v-for="(opt, idx) in opts"
					:key="idx"
					class="color-opt-editing flex align-center"
					@click="update(opt)"
				>
					<div class="input-wrapper flex align-center">
						<div class="color-box btn" :style="getOptStyle(opt)"></div>
						<div class="label-input text-cmp">
							<input type="text" />
							<span>{{ opt.display }}</span>
						</div>
					</div>
					<div class="btn btn-delete-status">
						<button class="btn btn-icon">
							<font-awesome-icon icon="times-circle" />
						</button>
					</div>
				</div>
			</div> -->
			<div v-else class="flex dropdown-inner-container labels-list column">
				<div
					v-for="(opt, idx) in opts"
					:key="idx"
					class="color-opt-editing flex align-center"
					@click="update(opt)"
				>
					<div class="input-wrapper flex align-center">
						<div class="color-box btn" :style="getOptStyle(opt)"></div>
						<div class="label-input text-cmp">
							<input type="text" v-model="opt.display" />
							<!-- <span>{{ opt.display }}</span> -->
						</div>
					</div>
					<div class="btn btn-delete-status">
						<button class="btn btn-icon">
							<font-awesome-icon icon="times-circle" />
						</button>
					</div>
				</div>
			</div>
			<div class="picker-dropdown-footer flex align-center">
				<button v-if="!showEditModal" class="btn" @click="toggleEditModal">Add/Edit Labels</button>
				<button v-else class="btn" @click="apply">Apply</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'labelsPopup',
	props: {
		opts: {
			type: Array,
			required: true,
		},
	},
	data() {
		return { showEditModal: false };
	},
	watch: {},

	methods: {
		apply() {
			console.log('apply');
		},
		getOptStyle(opt) {
			return opt.style;
		},
		update(opt) {
			console.log(opt);
		},
		toggleEditModal() {
			this.showEditModal = !this.showEditModal;
		},
	},
	computed: {},
};
</script>
