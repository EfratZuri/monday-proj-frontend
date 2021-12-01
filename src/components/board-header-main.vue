<template>
	<div class="board-header-main flex-def">
		<div class="board-name">
			<div
				class="editable-heading--wrapper"
				@click="toggleEditInput"
				@keydown.enter="saveEditName"
				aria-label="Click To edit"
				role="button"
			>
				<h1 v-if="!showEditInput" class="element-type-h1">{{ boardName }}</h1>
				<input
					v-else
					ref="boardNameInput"
					type="text"
					v-model="boardName"
					class="editable-input--wrapper element-type-h1"
				/>
			</div>
			<button class="btn btn-icon" @click="starred">Star</button>
			<div class="board-header-description" @click="toggleEditDescription">
				<div v-if="!showDescription" class="description-line">
					<span class="text-content">{{ descriptionToDisplay }}</span>
				</div>
				<textarea
					v-else
					type="text"
					v-model="boardCopy.description"
					ref="boardDescription"
					@keyup.enter="saveDescription"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'boardHeaderMain',
	data() {
		return {
			showEditInput: false,
			boardName: '',
			boardCopy: null,
			showDescription: false,
		};
	},
	created() {
		this.boardCopy = JSON.parse(JSON.stringify(this.$store.getters.activeBoard));
		console.log(this.boardCopy);
		this.boardName = this.$store.getters.boardName || 'Efrat';
	},
	watch: {},
	methods: {
		toggleEditInput() {
			this.showEditInput = !this.showEditInput;
		},
		saveEditName() {
			this.toggleEditInput();
			this.$emit('saveName', this.boardName);
		},
		starred() {
			console.log('Make this board starred');
		},
		async toggleEditDescription() {
			await (this.showDescription = !this.showDescription);
			if (this.showDescription) this.$refs.boardDescription.focus();
		},
		saveDescription() {
			this.$emit('saveDescription', this.boardCopy);
			this.toggleEditDescription();
		},
	},
	computed: {
		descriptionToDisplay() {
			return this.boardCopy.description || 'Add board description';
		},
	},
	components: {},
};
</script>
