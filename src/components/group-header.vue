<template>
	<section class="grid-row-component group-header">
		<!-- This Span eill include the icons when a user hover over the header -->
		<div class="group-name-component grid-cell-row-component-header">
			<!-- <button @click="remove">delete group</button> -->
			<div
				class="menu-btn-container"
				@click="toggleGroupMenu"
				:class="{ 'dropdown-open': showGroupMenu }"
			>
				<button
					class="btn btn-menu-group-header fa"
					:style="{ color: color, backgroundColor: color, borderColor: color }"
				>
					<font-awesome-icon icon="caret-down" />
				</button>
				<group-menu v-if="showGroupMenu" />
			</div>
			<div class="group-name">
				<span
					v-if="!isEdit"
					:style="{ color: color }"
					@click="editTitle"
					@mouseover="isTaskToggleBtn = true"
					@mouseleave="isTaskToggleBtn = false"
				>
					<!-- <button v-if="isTaskToggleBtn" @click.stop="showTaskToggle">toggleTasks</button> -->
					{{ groupToEdit.title }}</span
				>
				<div v-else class="edit-group-container flex align-center">
					<div class="color-picker-btn-container" :class="{ 'dropdown-open': showColorPalette }">
						<button
							class="btn btn-round btn-change-color"
							:style="{ backgroundColor: color }"
							@click="toggleColorPalette"
						></button>
						<group-color-palette v-if="showColorPalette" :colors="clrs" @selected="changeColor" />
					</div>

					<input
						:style="{ color: color }"
						type="text"
						value="groupToEdit.title"
						ref="titleInput"
						v-model="groupToEdit.title"
						@keyup.enter="$event.target.blur()"
						@blur="editTitle"
					/>
				</div>
			</div>
		</div>
		<div class="grid-cells-row-component">
			<div
				v-for="cmp in cmpsOrder"
				:key="cmp"
				class="grid-cell-component-wrapper grid-cell-wrapper-component col-identifier-status"
			>
				<span>{{ cmpNameForDisplay(cmp) }}</span>
			</div>
		</div>
	</section>
</template>

<script>
import groupMenu from '@/components/group-menu';
import groupColorPalette from '@/components/group-color-palette.vue';
export default {
	name: 'groupHeader',
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isEdit: false,
			isTaskToggleBtn: false,
			groupToEdit: { ...this.group },
			color: this.group.style.clr,
			cmpsOrder: null,
			showGroupMenu: false,
			showColorPalette: false,
		};
	},
	created() {
		this.cmpsOrder = this.$store.getters.cmpsOrder;
	},
	methods: {
		changeColor(clr) {
			console.log(clr);
			const groupCopy = JSON.parse(JSON.stringify(this.group));
			groupCopy.style.clr = clr;
			this.$emit('saveGroup', groupCopy);
			// Unshow the color palette
			this.toggleColorPalette();
		},
		toggleGroupMenu() {
			this.showGroupMenu = !this.showGroupMenu;
		},
		toggleColorPalette() {
			this.showColorPalette = !this.showColorPalette;
		},
		cmpNameForDisplay(cmp) {
			const name = cmp.replace('-picker', '').replace(cmp[0], cmp[0].toUpperCase());
			return name;
		},
		async editTitle(e) {
			if (this.showColorPalette || e.target.classList.contains('btn-change-color')) return;
			await (this.isEdit = !this.isEdit);
			if (this.$refs.titleInput) this.$refs.titleInput.focus();
			if (this.group.title !== this.groupToEdit.title) this.$emit('saveGroup', this.groupToEdit);

			this.isTaskToggleBtn = false;
		},
		remove() {
			this.$emit('removeGroup', this.group);
		},
		showTaskToggle() {
			this.$emit('toggleTasks', this.group._id);
		},
	},
	computed: {
		clrs() {
			console.log(this.$store.getters.clrs);
			return this.$store.getters.clrs;
		},
	},
	components: {
		groupMenu,
		groupColorPalette,
	},
};
</script>
