<template>
  <section class="container">
    <Header class="header">Math modeling laboratory work №2 - Least squares method</Header>
    <div class="buttons">
      <button
        class="button button_generate"
        @click="generateRandomValues"
      >
        Generate values
      </button>
      <div
        class="input_box">
        <div
          class="input_text">
          Degree of a polynomial:
        </div>
        <input
          class="input"
          v-model="polynome.degree">
      </div>
    </div>
    <div class="wrapper">
      <Chart
        :points="points"
        :polynome="polynome"
      />
      <Table
        @valueschange="saveValues"
        ref="table"
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
    points: {},
    polynome: {
      degree: 1,
    },
  }),
  methods: {
    saveValues(values) {
      this.points = {
        X: values.X,
        Y: values.Y,
        Ro: values.Ro,
      }
    },
    generateRandomValues () {
      this.$refs.table.generateRandomValues();
    }
  },
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header {
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: underline;
  color: #333;
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
  margin-right: 60px;
}

.buttons {
  display: flex;
  height: 40px;
  margin-bottom: 50px;
}

.button {
  font-size: 16px;
}

.input_box {
  display: flex;
  margin-left: 30px;
}

.input_text {
  width: 180px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.input {
  width: 120px;
  font-size: 18px;
  text-align: center;
}

</style>

