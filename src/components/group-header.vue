<template>
	<section class="group-header flex space-between">
		<!-- This Span eill include the icons when a user hover over the header -->
		<div class="group-header-title">
			<span v-if="!isEdit" :style="{'color' : color}" @click="editTitle">{{ groupToEdit.title }}</span>
			<input v-else :style="{'color' : color}" type="text" value="groupToEdit.title" ref="titleInput" v-model="groupToEdit.title"  @keyup.enter="$event.target.blur()" @blur="editTitle"/>
		</div>
		<div class="group-header-info flex">
			<div class="group-header-status">
				<!-- TODO: on click-an input should apper -->
				<span>Status</span>
				<!-- TODO: show this input to edit the group name  -->
				<!-- <input type="text" /> -->
			</div>
			<div class="group-header-date">
				<!-- TODO: on click-an input should apper -->
				<span>Date</span>
				<!-- TODO: show this input to edit the group name  -->
				<!-- <input type="text" /> -->
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'groupHeader',
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
		created() {
		},
		data() {
			return {
				isEdit : false,
				groupToEdit : {...this.group},
				color: this.group.style.clr
			}
		},
	methods: {
		async editTitle() {
				await (this.isEdit = !this.isEdit)
				if(this.$refs.titleInput) this.$refs.titleInput.focus();
				if(this.group.title !== this.groupToEdit.title) {
					this.$emit('saveGroup', this.groupToEdit)
					console.log('this.color',this.color);
				}			
		},
	},
};
</script>
