<template>
  <section class="board-header-main flex">
    <div class="board-header-main-top">
      <div class="board-title">
        <h1 v-if="!isEditName" @click="editName" class="element-type-h1">
          {{ boardToEdit.title }}
        </h1>
        <input
          v-else
          type="text"
          value="boardToEdit.title"
          ref="titleInput"
          v-model="boardToEdit.title"
          @keyup.enter="$event.target.blur()"
          @blur="editName"
        />
      </div>
      <span
        class="description-toggle"
        @click="isShowDescription = !isShowDescription"
        v-html="descriptionTogglBtn"
      >
      </span>
      <span
        @click="isStarred = !isStarred"
        :class="{ 'starred-board': isStarred }"
        v-html="starToggle"
      >
      </span>
    </div>
    <div v-if="isShowDescription" class="board-description">
      <p v-if="!isEditDesctiption" @click="editDescription">
        {{ boardToEdit.description }}
      </p>
      <textarea
        cols="60"
        rows="6"
        v-else
        type="text"
        value="boardToEdit.description"
        ref="descInput"
        v-model="boardToEdit.description"
        @keyup.enter="$event.target.blur()"
        @blur="editDescription"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'boardHeaderMain',
  props: {
    activeBoard: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditName: false,
      isEditDesctiption: false,
      isShowDescription: true,
      boardToEdit: { ...this.activeBoard },
      isStarred: false,
    };
  },
  methods: {
    async editName() {
      await (this.isEditName = !this.isEditName);
      if (this.$refs.titleInput) this.$refs.titleInput.focus();
      if (this.boardToEdit.title !== this.activeBoard.title) {
        this.$emit('saveBoard', this.boardToEdit);
      }
    },
    async editDescription() {
      await (this.isEditDesctiption = !this.isEditDesctiption);
      if (this.$refs.descInput) this.$refs.descInput.focus();
      if (this.boardToEdit.description !== this.activeBoard.description) {
        this.$emit('saveBoard', this.boardToEdit);
      }
    },
  },
  computed: {
    descriptionToDisplay() {
      return this.boardToEdit.description || 'Add board description';
    },
    descriptionTogglBtn() {
      return this.isShowDescription
        ? '<ion-icon name="alert-circle"></ion-icon>'
        : '<ion-icon name="alert-circle-outline"></ion-icon>';
    },
    starToggle() {
      return this.isStarred
        ? '<ion-icon name="star"></ion-icon>'
        : '<ion-icon name="star-outline"></ion-icon>';
    },
  },
};
</script>
