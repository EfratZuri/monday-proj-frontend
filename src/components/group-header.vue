<template>
	<section class="grid-row-component group-header" ref="header" :class="stickyStyle">
		<div class="group-name-component grid-cell-row-component-header">
			<!-- <button @click="remove">delete group</button> -->
			<div
				class="menu-btn-container"
				@click="toggleGroupMenu"
				:class="{ 'dropdown-open': showGroupMenu }"
			>
				<button
					class="btn btn-menu-group-header fa"
					:style="{ color, backgroundColor: color, borderColor: color }"
				>
					<font-awesome-icon icon="caret-down" />
				</button>
				<group-menu
					v-if="showGroupMenu"
					:boards="boards"
					:board="board"
					@addGroup="addGroup"
					@toggleTasks="toggleTasks"
					@toggleAllTasks="toggleAllTasks"
					@removeGroup="remove"
					@duplicateGroup="duplicateGroup"
					@moveToBoard="moveToBoard"
					@changeColor="toggleColor"
				/>
			</div>
			<div class="group-name">
				<span
					v-if="!showEdit"
					:style="{ color }"
					@click="editTitle"
					@mouseover="showTaskToggleBtn = true"
					@mouseleave="showTaskToggleBtn = false"
				>
					{{ groupToEdit.title }}</span
				>
				<div v-else class="edit-group-container flex align-center">
					<div
						class="color-picker-btn-container flex align-center"
						:class="{ 'dropdown-open': showColorPalette }"
					>
						<button
							class="btn btn-round btn-change-color"
							:style="{ backgroundColor: color }"
							@click="toggleColorPalette"
						></button>
						<group-color-palette
							v-if="showColorPalette"
							:colors="clrs"
							@selected="toggleColorPlatte"
						/>
					</div>

					<input
						:style="{ color: color }"
						type="text"
						ref="titleInput"
						v-model="groupToEdit.title"
						@blur="editTitle"
						@keyup.enter="$event.target.blur()"
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
		<div class="add-column-container">
			<button class="btn btn-icon" @click="toggleColumnMenu">
				<font-awesome-icon icon="plus-circle" />
			</button>
			<column-menu v-if="showColumnMenu" />
		</div>
	</section>
</template>

<script>
import groupMenu from '@/components/group-menu';
import groupColorPalette from '@/components/group-color-palette.vue';
import columnMenu from '@/components/column-menu';
export default {
	name: 'groupHeader',
	props: {
		group: {
			type: Object,
			required: true,
		},
		boards: {
			type: Array,
		},
		board: {
			type: Object,
		},
	},
	data() {
		return {
			showEdit: false,
			showTaskToggleBtn: false,
			groupToEdit: { ...this.group },
			color: this.group.style.clr,
			cmpsOrder: null,
			showGroupMenu: false,
			showColorPalette: false,
			isSticky: false,
			showColumnMenu: false,
		};
	},
	created() {
		this.cmpsOrder = this.$store.getters.cmpsOrder;
	},
	methods: {
		changeColor(clr) {
			const groupCopy = JSON.parse(JSON.stringify(this.group));
			groupCopy.style.clr = clr;
			this.$emit('saveGroup', groupCopy);
			// Unshow the color palette
			this.toggleColorPalette();
		},
		toggleColor() {
			this.showColorPalette = !this.showColorPalette;
		},
		toggleGroupMenu() {
			this.showGroupMenu = !this.showGroupMenu;
		},
		toggleColorPalette() {
			this.showColorPalette = !this.showColorPalette;
			this.showEdit = !this.showEdit;
			console.log('this.showEdit', this.showEdit);
		},
		cmpNameForDisplay(cmp) {
			const name = cmp.replace('-picker', '').replace(cmp[0], cmp[0].toUpperCase());
			return name;
		},
		async editTitle(e) {
			if (e.target.classList.contains('btn-change-color')) return;
			await (this.showEdit = !this.showEdit);
			if (this.$refs.titleInput) this.$refs.titleInput.focus();
			if (this.group.title !== this.groupToEdit.title) this.$emit('saveGroup', this.groupToEdit);
			this.showTaskToggleBtn = false;
		},
		remove() {
			this.$emit('removeGroup', this.group);
		},
		toggleTasks() {
			console.log('toggle');
			this.$emit('toggleTasks', this.group._id);
		},
		toggleAllTasks() {
			this.$emit('toggleAllTasks');
		},
		toggleColumnMenu() {
			this.showColumnMenu = !this.showColumnMenu;
		},
		addGroup() {
			this.$emit('addGroup');
		},
		moveToBoard(board) {
			const moveDetails = { board, group: this.group };
			this.$emit('moveToBoard', moveDetails);
		},
		duplicateGroup() {
			this.$emit('duplicateGroup', this.group);
		},
		stickyHeader(entries) {
			const [entry] = entries;
			if (!entry.isIntersecting) this.isSticky = true;
			else this.isSticky = false;
		},
	},
	mounted() {
		// console.log('EEEEEEEEEEEEEEEEEEEEEEEEEE');
		// const headerHeight = this.$refs.header.getBoundingClientRect().height;
		// const header = this.$refs.header;
		// const stickyHeader = function (entries) {
		// 	const [entry] = entries;
		// 	if (!entry.isIntersecting) this.isSticky = true;
		// 	else this.isSticky = false;
		// 	console.log(this.isSticky);
		// };
		// const headerObserver = new IntersectionObserver(stickyHeader, {
		// 	root: null,
		// 	threshold: 0,
		// 	rootMargin: `-${headerHeight}px`,
		// });
		// headerObserver.observe(this.$refs.header);
	},
	computed: {
		clrs() {
			return this.$store.getters.clrs;
		},
		stickyStyle() {
			return { sticky: this.isSticky };
		},
	},
	components: {
		groupMenu,
		groupColorPalette,
		columnMenu,
	},
};
</script>
<!--

		<input
						:style="{ color: color }"
						type="text"
						ref="titleInput"
						v-model="groupToEdit.title"
						@blur="editTitle"
						@keyup.enter="$event.target.blur()"
					/>-->
