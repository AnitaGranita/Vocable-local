<template>
    <div class="chart-container">
      <h2>Numero di vittorie per giorno</h2>
      <Line
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
      <h2>Hai vinto il 20% delle volte nell'ultima settimana</h2>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
  
  export default {
    name: 'LineChart',
    components: { Line },
    data() {
      return {
        chartData: { //dobbiamo aggiungere i dati se esiste un token prendendoli dal database, sennò o mostriamo il nulla o boh
          labels: ['January', 'February', 'March'],
          datasets: [
            {
              label: 'Sample Data',
              data: [40, 20, 12],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false // Permette di ridimensionare il grafico
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    width: 80%; /* Imposta la larghezza del grafico */
    height: 60vh; /*Imposta l'altezza del grafico */
    margin: 0 auto;
  }
  
  h2 {
    text-align: center; /* Centra il testo "Statistiche" sopra il grafico */
    margin-bottom: 10px; /* Spazio sotto il testo */
  }
  </style>
  