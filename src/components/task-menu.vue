<template>
	<section class="task-menu-container">
		<button class="btn btn-icon menu-item">
			<font-awesome-icon icon="arrows-alt-v" />
			<span>Open</span>
		</button>
		<button class="btn btn-icon menu-item" @click="select">Select item</button>
		<div class="menu-item" @click="remove"><span>Delete</span></div>
		<button class="btn btn-icon menu-item" @click="duplicate">
			<font-awesome-icon icon="copy" />
			<span>Duplicate</span>
		</button>
		<div class="btn btn-relative">
			<button class="btn btn-icon menu-item" @mousemove="toggleMoveToOptions">
				<font-awesome-icon icon="arrow-right" />
				<span>Move To</span>
			</button>
			<!-- <move-to-opts v-if="showMoveToOptions" />
			<div>
				<button class="btn opt-item" @click="">Move to top</button>
				<button class="btn opt-item">Move to group</button>
				<button class="btn opt-item">Move to board</button>
			</div> -->
		</div>

		<button class="btn btn-icon menu-item" @click="remove">
			<font-awesome-icon icon="trash-alt" />
			<span>Delete</span>
		</button>
	</section>
</template>

<script>
// import moveToOpts from '../components/move-to-opts.vue';
export default {
	name: 'taskMenu',
	props: {
		task: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			showMoveToOptions: false,
		};
	},
	methods: {
		toggleMoveToOptions() {
			this.showMoveToOptions = !this.showMoveToOptions;
		},
		remove() {
			this.$emit('remove', this.task);
		},
		select() {
			this.$emit('select', this.task);
		},
		duplicate() {
			this.$emit('duplicate', this.task);
		},
	},
	components: {
		// moveToOpts,
	},
};
</script>
