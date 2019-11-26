<template>
  <section class="container">
    <div class="wrapper">
      <Chart
        :points="points"
      />
      <Table
        v-on:valueschange="saveValues"
      />
    </div>
  </section>
</template>

<script>
import Table from '~/components/Table.vue';
import Chart from '~/components/Chart.vue';

export default {
  components: {
    Table,
    Chart,
  },
  data: () => ({
    points: {}
  }),
  methods: {
    saveValues(values) {
      this.points = {
        X: values.X,
        Y: values.Y,
      }
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.chart {
  margin-right: 20px;
}


</style>

