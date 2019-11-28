<template>
  <div class="chart">
    <canvas
      id="chart"
      width="600"
      height="500"
      ref="chart">
    </canvas>
  </div>
</template>

<script>
import { Chart } from "chart.js";
import mnk from "@/assets/mnk";

export default {
  props: {
    points: {
      Y: [],
      X: [],
      Ro: [],
    }
  },
  data: () => ({
    chart: null,
  }),
  watch: {
    points() {
      this.updateDataset(this.points);
    }
  },
  mounted() {
    const ctx = this.$refs.chart.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
			data: {
				labels: this.x,
				datasets: [{
					label: 'Spline',
					data: null,
					borderColor: '#7fffd4',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false,
					cubicInterpolationMode: 'monotone'
				}, {
          label: 'MNK',
					data: null,
					borderColor: '#711E9F',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false,
					cubicInterpolationMode: 'monotone'
        }]
      }
    })
  },
  methods: {
    convertPointsToData(points) {
      const pointsMap = new Map();
      const xFloats = points.X.map(parseFloat);
      let yFloats = points.Y.map(parseFloat);

      for (const [i, x] of xFloats.entries()) {
        pointsMap.set(x, yFloats[i])
      }

      xFloats.sort((a, b) => a - b)
      yFloats = xFloats.map(x => pointsMap.get(x))

      return {
        data: yFloats,
        labels: xFloats.map(String),
      }
    },
    updateDataset(points) {
      const converted = this.convertPointsToData(points);
      const mnkResult = mnk(points.X, points.Y, points.Ro, 2);

      this.chart.data.labels = converted.labels;
      this.chart.data.datasets[0].data = converted.data;
      this.chart.data.datasets[1].data = mnkResult.Y;
      this.chart.update();
    }
  },
}
</script>

<style>

</style>