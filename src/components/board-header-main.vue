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
		};
	},
	created() {
		console.log(this.$store.getters.boards);
		this.boardName = this.$store.getters.boardName || 'Efrat';
	},
	watch: {
		showEditInput() {
			// this.$ref.boardNameInput.focus();
		},
	},
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
	},
	computed: {},
	components: {},
};
</script>
