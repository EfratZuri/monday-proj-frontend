<template>
	<div
		class="grid-cell-component-wrapper tag-picker-container"
		:class="{ 'dropdown-open': showOptions }"
	>
		<div class="col-cell" @click="toggleOptions">
			<div v-if="selectedCopy && selectedCopy.length">
				<!-- <span :style="selectedCopy[0].style">{{ tagForDisplay(selectedCopy[0].txt) }}</span>
				<span v-if="selectedCopy[1]" :style="selectedCopy[1].style">{{
					tagForDisplay(selectedCopy[1].txt)
				}}</span>
				<div v-if=""></div>
				<span v-if="selectedCopy[2]" :style="selectedCopy[0].style">{{
					tagForDisplay(selectedCopy[0].txt)
				}}</span> -->
				<span v-for="(tag, idx) in selectedCopy" :key="idx" :style="tag.style">
					{{ tagForDisplay(tag.txt) }}
				</span>
			</div>
		</div>
		<div v-if="showOptions" class="dropdown-modal picker-dropdown-component">
			<div class="picker-dropdown-inner-container flex space-between column">
				<div class="member-input-container">
					<input type="text" v-model="tagToEdit.txt" placeholder="Add tags" />
				</div>
				<!-- <div class="tag-list">
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
				</div> -->
				<div class="picker-dropdown-footer flex align-center">
					<button class="btn" @click="update">+Create new tag</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { utilService } from '../services/util.service.js';
export default {
	name: 'tagPicker',
	props: ['info'],
	data() {
		return {
			selectedCopy: null,
			showOptions: false,
			tagToEdit: { txt: '', style: { color: 'rgb(51,52,56)' } },
		};
	},
	created() {
		this.selectedCopy = JSON.parse(JSON.stringify(this.info.selected));
		// this.selectedCopyTrimed = JSON.parse(JSON.stringify(this.info.selected));
		const clrs = this.$store.getters.clrs;
		this.tagToEdit.style.color = clrs[utilService.getRandomInt(0, clrs.length - 1)];
	},
	methods: {
		update() {
			if (!this.tagToEdit.txt) return;
			this.selectedCopy.unshift(this.tagToEdit);
			this.$emit('update', this.selectedCopy);
		},
		toggleOptions() {
			this.showOptions = !this.showOptions;
		},
		tagForDisplay(txt) {
			return `#${txt}`;
		},
	},
};
</script>
