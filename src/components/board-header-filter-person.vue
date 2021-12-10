<template>
  <section class="person-filter-wrapper flex">
    <!-- <div class="member-icon flex align-center">
			<img
				src="@/assets/dapulse-person-column.svg"
				alt=""
				aria-hidden="true"
				class="person-bullet-image person-bullet-component"
			/>
		</div> -->
    <div class="person-icon-wrapper">
      <ion-icon name="person-circle-outline"></ion-icon>
    </div>
    <span class="person-span" v-tooltip.top="'Filter by person'">Person</span>
  </section>
</template>

<script>
export default {
  components: {},
};
</script>
