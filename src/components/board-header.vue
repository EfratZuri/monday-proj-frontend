<template>
	<div class="board-header-container">
		<boardHeaderMain @saveName="saveBoaedName" />
		<boardHeaderSubsetToolbar />
		<boardHeaderViewBar @addItem="addItem" />
	</div>
</template>

<script>
import boardHeaderViewBar from '@/components/board-header-view-bar.vue';
import boardHeaderSubsetToolbar from '@/components/board-header-subset-toolbar.vue';
import boardHeaderMain from '@/components/board-header-main.vue';
export default {
	name: 'boardHeader',
	data() {
		return {};
	},
	created() {},
	methods: {
		addItem() {
			this.$emit('addItem');
			console.log('Add item from board header,this method is NOT READY');
		},
		saveBoaedName(newName) {
			console.log('Save new Boaed name from board header the new name is:', newName);
			console.log('This method dont work yet');
		},
	},
	components: {
		boardHeaderViewBar,
		boardHeaderMain,
		boardHeaderSubsetToolbar,
	},
};
</script>
