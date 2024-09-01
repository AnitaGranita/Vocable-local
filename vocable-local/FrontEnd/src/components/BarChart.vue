<template>
  <div class="chart-container mx-auto">
    <Bar id="my-chart-id" :options="chartOptions" :data="computedChartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    won1: { type: Number, required: true },
    won2: { type: Number, required: true },
    won3: { type: Number, required: true },
    won4: { type: Number, required: true },
    won5: { type: Number, required: true },
    won6: { type: Number, required: true },
  },
  computed: {
    computedChartData() {
      return {
        labels: ['Partite vinte in 1', 'Partite vinte in 2', 'Partite vinte in 3', 'Partite vinte in 4', 'Partite vinte in 5', 'Partite vinte in 6'],
        datasets: [
          {
            data: [this.won1, this.won2, this.won3, this.won4, this.won5, this.won6],
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)');
              gradient.addColorStop(1, 'rgba(0, 0, 255, 0.5)');
              return gradient;
            },
            borderRadius: 5,
            borderSkipped: false
          }
        ]
      }
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Value: ${tooltipItem.raw}`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
  height: 400px;
}


@media (max-width: 600px) {
  .chart-container {
    height: 200px;
    width: 100%;
    padding: 10px;
  }
}
</style>
