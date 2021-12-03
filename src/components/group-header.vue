<template>
  <section class="grid-row-component group-header">
    <!-- This Span eill include the icons when a user hover over the header -->
    <div class="group-name-component grid-cell-row-component-header">
      <!-- <button @click="remove">delete group</button> -->
      <div class="menu-btn-container">
        <button
          class="btn-menu-group-header fa"
          :style="{ color: color, backgroundColor: color, borderColor: color }"
        >
          <font-awesome-icon icon="caret-down" />
        </button>
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
        <input
          v-else
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
    };
  },
  created() {
    this.cmpsOrder = this.$store.getters.cmpsOrder;
  },
  methods: {
    cmpNameForDisplay(cmp) {
      const name = cmp
        .replace('-picker', '')
        .replace(cmp[0], cmp[0].toUpperCase());

      console.log('name', name);
      return name;
    },
    async editTitle() {
      await (this.isEdit = !this.isEdit);
      if (this.$refs.titleInput) this.$refs.titleInput.focus();
      if (this.group.title !== this.groupToEdit.title) {
        this.$emit('saveGroup', this.groupToEdit);
      }
      this.isTaskToggleBtn = false;
    },
    remove() {
      this.$emit('removeGroup', this.group);
    },
    showTaskToggle() {
      this.$emit('toggleTasks', this.group._id);
    },
  },
};
</script>
