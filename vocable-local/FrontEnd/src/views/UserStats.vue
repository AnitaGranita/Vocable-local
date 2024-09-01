<template>
  <v-sheet class="background text-center">
    <div class="welcome-section">
      <p class="greeting-text">Ciao, {{ user.nickname }}!</p>
      <p class="subheading-text">Ecco le tue statistiche:</p>
    </div>
    <div class="chart-section">
      <p class="chart-title">Vittorie suddivise per tentativi:</p>
      <BarChart :won1="user.won1 !== undefined ? user.won1 : 0" :won2="user.won2 !== undefined ? user.won2 : 0"
        :won3="user.won3 !== undefined ? user.won3 : 0" :won4="user.won4 !== undefined ? user.won4 : 0"
        :won5="user.won5 !== undefined ? user.won5 : 0" :won6="user.won6 !== undefined ? user.won6 : 0" />
    </div>
    <div class="statistics-container">
      <p class="statistic-title">Statistiche partite:</p>
      <v-sheet class="statistics-wrapper">
        <v-card class="stat-card" rounded>
          <p class="stat-title">Partite giocate:</p>
          <p class="stat-value">{{ user.totalgames !== undefined ? user.totalgames : 'Dati non disponibili' }}</p>
        </v-card>
        <v-card class="stat-card" rounded>
          <p class="stat-title">Partite vinte:</p>
          <p class="stat-value">{{ user.gameswon !== undefined ? user.gameswon : 'Dati non disponibili' }}</p>
        </v-card>
        <v-card class="stat-card" rounded>
          <p class="stat-title">Partite perse:</p>
          <p class="stat-value">{{ user.gameslost !== undefined ? user.gameslost : 'Dati non disponibili' }}</p>
        </v-card>
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import BarChart from '@/components/BarChart.vue';

export default {
  components: {
    BarChart,
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    async fetchUserStats() {
      try {
        const response = await axios.get('/api/utente/get-stats');
        console.log('User stats received:', response.data);
        this.$store.commit('auth/SET_USER', response.data); // Assicurati di aggiornare lo stato
      } catch (error) {
        console.error('Errore durante l\'ottenimento delle statistiche:', error);
      }
    }
  },
  mounted() {
    this.fetchUserStats(); // Chiama il metodo quando il componente viene montato
  }
}
</script>

<style scoped>
.welcome-section {
  margin: 30px auto;
}

.greeting-text {
  font-size: 2.3rem;
  font-weight: 700;
  color: #2d3748;
}

.subheading-text {
  font-size: 1.15rem;
  color: #4a5568;
}

.chart-section {
  margin-top: 10px;
  margin-bottom: 0px;
}

.chart-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #4052e0;
}

@media (max-width: 600px) {
  .chart-title {
    font-size: 1rem;
  }

  .chart-section {
    margin-top: 5px;
  }
}

.statistic-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #364ae3;
}

.statistics-container {
  margin-top: 0px;
}

.statistics-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.stat-card {
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 280px;
  max-width: 100%;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e2e8f0;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.stat-title {
  font-weight: 600;
  color: #4052e0;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 1.5rem;
  color: #4a5568;
}

@media (max-width: 600px) {
  .statistics-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
