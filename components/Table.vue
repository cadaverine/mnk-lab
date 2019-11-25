<template>
  <div class="table">
    <div
      class="table__row row_header">
      <div
        class="table__cell cell_heading"
        v-for="(heading, i) in columns"
        :key="i"
        v-text="heading"/>
    </div>
    <div
      class="table__row"
      v-for="index in getRange(rowsNumber)"
      :key="index">
      <input
        class="table__cell cell_input"
        v-for="(heading, i) in columns"
        :key="i"
        v-model="values[heading][index]"/>
    </div>

  </div>
</template>

<script>
import range from 'lodash/range';

export default {
  props: {
    columns: {
      type: Array,
      default: () => (['X', 'Y', 'Ro']),
    },
    rowsNumber: {
      type: Number,
      default: 10,
    }
  },
  data: () => ({
    values: {
      X: [],
      Y: [],
      Ro: [],
    },
  }),
  updated() {
    // test values reactivity
    console.log(this.values)
  },
  methods: {
    getRange(value) {
      return range(value);
    },
  }
}
</script>

<style>
  .table {
    display: flex;
    flex-direction: column;
    width: 330px;
  }

  .table__row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .table__cell {
    min-width: 110px;
    min-height: 40px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .row_header {
    background-color: aquamarine;
  }

  .cell_heading {
    border: 1px solid #555;
  }
</style>