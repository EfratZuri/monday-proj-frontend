<template>
  <div class="grid-cell-component-wrapper">
    <div v-if="styleObj" class="col-cell" :style="styleObj">
      <span>{{ infoForDisplay }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'statusPicker',
  props: ['info'],

  data() {
    return {
      styleObj: null,
      selectedObj: {},
    };
  },
  created() {
    console.log('Status picker created');
    const selectedName = this.info.selected;
    console.log('selcted name', selectedName);
    if (selectedName?.name === 'default') this.styleObj = selectedName.style;
    else {
      this.selectedObj = this.info.opts.find(
        ({ name }) => name === selectedName
      );
      this.styleObj = this.selectedObj.style;
    }
    console.log(this.styleObj);
  },
  methods: {
    update(curType, event) {
      this.$emit(curType, event);
    },
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
  },
  computed: {
    infoForDisplay() {
      return this.selectedObj.name === 'default' ? '' : this.selectedObj.name;
    },
  },
};
</script>
