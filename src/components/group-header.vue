<template>
	<section class="group-header flex align-center space-between">
		<!-- This Span eill include the icons when a user hover over the header -->
		<span></span>
		<div class="group-header-title">
			<!-- TODO: on click-an input should apper -->
			<!-- MY_TOTO : STYLE : :style="{'color' : group.style.color}" -->
			<span v-if="!isEdit" :style="{'color' : 'red'}" @click="editTitle">{{ groupToEdit.title }}</span>
			<!-- TODO: show this input to edit the group title  -->
			<!-- MY_TOTO :add text-align:center to style -->
			<!-- MY_TOTO : STYLE : :style="{'color' : group.style.color}" -->
			<input v-else :style="{'color' : 'red'}" type="text" value="groupToEdit.title" ref="titleInput" v-model="groupToEdit.title"  @keyup.enter="$event.target.blur()" @blur="editTitle"/>
			<!-- <input type="text" /> -->
		</div>
		<div class="flex-def">
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
				groupToEdit : {...this.group}
			}
		},
	methods: {
		async editTitle() {
				await (this.isEdit = !this.isEdit)
				if(this.$refs.titleInput) this.$refs.titleInput.focus();
				if(this.group.title !== this.groupToEdit.title) {
					this.$emit('saveGroup', this.groupToEdit)
				}			
		},
	},
};
</script>
