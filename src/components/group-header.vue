<template>
	<section class="group-header flex align-center space-between">
		<!-- This Span eill include the icons when a user hover over the header -->
		<span></span>
		<div class="group-header-title">
			<!-- TODO: on click-an input should apper -->
			<!-- MY_TOTO : STYLE : :style="{'color' : group.style.color}" -->
			<span v-if="!isEdit" :style="{'color' : 'red'}" @click="editTitle">{{ group.title }}</span>
			<!-- TODO: show this input to edit the group title  -->
			<!-- MY_TOTO :add text-align:center to style -->
			<!-- MY_TOTO : STYLE : :style="{'color' : group.style.color}" -->
			<input v-else :style="{'color' : 'red'}" type="text" value="group.title" ref="titleInput" v-model="group.title" @blur="editTitle"/>
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
			console.log('group',this.group);
			console.log('group header');
		},
		data() {
			return {
				isEdit : false,
			}
		},
	methods: {
		editTitle() {
			this.isEdit = !this.isEdit
			console.log('this.isEdit',this.isEdit);
			// console.log('this.$refs.titleInput',this.$refs.titleInput);
			// setTimeout(() => {
				if(this.$refs.titleInput) this.$refs.titleInput.focus();
			// }, 300);
		},
		changed() {
		}
	},
};
</script>
