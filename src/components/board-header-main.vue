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
      <button
        class="btn board-header-title-icon"
        @click="isShowDescription = !isShowDescription"
        v-html="descriptionTogglBtn"
      ></button>
      <button
        class="btn board-header-title-icon"
        @click="toggleFavorite"
        v-html="starToggle"
        :class="{ 'starred-board': this.boardToEdit.isFavorite }"
      ></button>
      <!-- <div class="board-header-right flex">
        <div class="invite-btn-header">
          <span><font-awesome-icon icon="user-plus" /></span>
        </div>
      </div> -->
    </div>
    <section
      class="board-description"
      v-if="isShowDescription"
      @click="editDescription"
    >
      <div class="description-line" v-if="!isEditDesctiption">
        <span class="text-content">
          {{ boardDescription }}
        </span>
      </div>
      <textarea
        v-else
        cols="1"
        rows="1"
        type="text"
        value="boardToEdit.description"
        ref="descInput"
        v-model="boardToEdit.description"
        @blur="editDescription"
      />
    </section>
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
    async toggleFavorite() {
      this.boardToEdit.isFavorite = !this.boardToEdit.isFavorite;
      this.$emit('saveBoard', this.boardToEdit);
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
      return this.boardToEdit.isFavorite
        ? '<ion-icon name="star"></ion-icon>'
        : '<ion-icon name="star-outline"></ion-icon>';
    },
    isStarredComp() {
      return { 'starred-board': this.isStarred };
    },
    boardDescription() {
      return this.boardToEdit.description.length
        ? this.boardToEdit.description
        : 'Add board description';
    },
    boardToEdit() {
      return JSON.parse(JSON.stringify(this.activeBoard));
    },
  },
};
</script>
