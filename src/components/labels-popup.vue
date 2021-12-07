<template>
	<div class="labels-popup-container dropdown-modal picker-dropdown-component">
		<div class="picker-dropdown-inner-container flex space-between column">
			<div v-if="!showEditModal" class="status-list">
				<div
					v-for="(opt, idx) in optsCopy"
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
			<div v-else class="flex dropdown-inner-container labels-list column">
				<div
					v-for="(opt, idx) in optsCopy"
					:key="idx"
					class="color-opt-editing flex align-center"
					@click="update(opt)"
				>
					<div class="input-wrapper flex align-center">
						<div class="color-box btn" :style="getOptStyle(opt)"></div>
						<div class="label-input text-cmp">
							<input type="text" :v-model="opt.display" :placeholder="opt.display" />
						</div>
					</div>
					<div class="btn btn-delete-status">
						<button class="btn btn-icon">
							<font-awesome-icon icon="times-circle" />
						</button>
					</div>
				</div>
				<labels-color-palette-list @selected="colorSelected" />
			</div>

			<div class="picker-dropdown-footer flex align-center">
				<button v-if="!showEditModal" class="btn" @click="toggleEditModal">Add/Edit Labels</button>
				<button v-else class="btn" @click="apply">Apply</button>
			</div>
		</div>
	</div>
</template>

<script>
import labelsColorPaletteList from '@/components/labels-color-palette-list';

export default {
	name: 'labelsPopup',
	props: {
		opts: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			showEditModal: false,
			optsCopy: null,
			emptyLabel: { name: '', display: '', style: { backgroundColor: '' }, id: '' },
		};
	},
	created() {
		this.optsCopy = JSON.parse(JSON.stringify(this.opts));
	},
	methods: {
		getOptStyle(opt) {
			return opt.style;
		},
		update(opt) {
			this.$emit('update', opt);
		},
		toggleEditModal() {
			this.showEditModal = !this.showEditModal;
		},
		colorSelected(clr) {
			this.emptyLabel.style.backgroundColor = clr;
			// this.optsCopy.push(this.emptyLabel);
			this.$emit('apply', this.emptyLabel);
		},
		apply() {
			console.log('spplay');
			this.$emit('apply', this.optsCopy);
		},
	},
	components: {
		labelsColorPaletteList,
	},
};
</script>
