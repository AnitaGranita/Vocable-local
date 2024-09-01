<template>
  <div class="about-page">
    <div class="about-container mx-auto text-center p-6 rounded-lg">
      <div class="intro-text mx-auto">
        <p class="text-4xl font-extrabold text-black mb-4">About Us!</p>
        <p class="text-lg text-black leading-relaxed mb-8">
          Tre menti giovani e brillanti dell'università stanno dando vita a un progetto ambizioso.
          Uniamo le nostre competenze e la nostra creatività per trasformare idee in realtà e lasciare
          un'impronta nel mondo (circa).
        </p>
        <p class="text-2xl font-semibold text-black">Il team:</p>
      </div>

      <v-container class="team-container mx-auto p-4">
        <v-row no-gutters>
          <v-col cols="12" md="4" class="d-flex">
            <v-card class="team-card ma-3 d-flex flex-column p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-300">
              <v-card-title class="text-2xl font-bold text-blue-800">Anita Scortegagna</v-card-title>
              <v-card-subtitle class="text-lg text-blue-600">Stratega di Progetto</v-card-subtitle>
              <v-card-text class="flex-grow-1 text-gray-800 mt-4">
                Anita è la stratega che tiene tutto in ordine. Con una mente analitica e un occhio attento
                ai dettagli, coordina le attività del team e assicura che ogni fase del progetto sia ben
                pianificata e rispettata.
              </v-card-text>
              <v-card-actions class="mt-auto">
                <v-btn text color="blue" @click="mailto('anita.scortegagna@studenti.unitn.it')">Contatta Anita</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4" class="d-flex">
            <v-card class="team-card ma-3 d-flex flex-column p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-300">
              <v-card-title class="text-2xl font-bold text-blue-800">Pietro Tabladini</v-card-title>
              <v-card-subtitle class="text-lg text-blue-600">Visionario Creativo</v-card-subtitle>
              <v-card-text class="flex-grow-1 text-gray-800 mt-4">
                Pietro è la mente creativa del nostro team, sempre pronto a pensare fuori dagli schemi.
                Con una passione per il design e l'innovazione, trasforma idee astratte in soluzioni
                concrete che catturano l'immaginazione.
              </v-card-text>
              <v-card-actions class="mt-auto">
                <v-btn text color="blue" @click="mailto('pietro.tabladini@studenti.unitn.it')">Contatta Pietro</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" md="4" class="d-flex">
            <v-card class="team-card ma-3 d-flex flex-column p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 border border-gray-300">
              <v-card-title class="text-2xl font-bold text-blue-800">Pietro Mazzocco</v-card-title>
              <v-card-subtitle class="text-lg text-blue-600">Esperto Tecnologico</v-card-subtitle>
              <v-card-text class="flex-grow-1 text-gray-800 mt-4">
                Pietro è il nostro guru della tecnologia, un esperto nel coding e nella risoluzione
                dei problemi. Con la sua esperienza nel backend e nello sviluppo software, garantisce
                che il nostro progetto funzioni senza intoppi e con la massima efficienza.
              </v-card-text>
              <v-card-actions class="mt-auto">
                <v-btn text color="blue" @click="mailto('pietro.mazzocco@studenti.unitn.it')">Contatta Pietro</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <p class="text-lg text-red-600 mt-10 font-semibold">Se incontri un bug, non esitare a contattarci!</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    mailto(email) {
      window.location.href = `mailto:${email}`;
    }
  }
}
</script>

<style scoped>
/* Styles for the entire page */
.about-page {
  min-height: 100vh; /* Ensures full viewport height */
  background: linear-gradient(135deg, #cce7ff, #44acf1, #4a6ef2, #1b59cd);
  background-size: 400% 400%; /* Ensures smooth gradient transition */
  animation: gradientAnimation 15s ease infinite; /* Animation for the gradient */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: relative;
}

/* Styles for the container holding the content */
.about-container {
  max-width: 90%; /* Keeps some margin around the container */
  width: 100%;
  height: auto; /* Adjust height to fit content */
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.8); /* Slightly transparent white background for the content */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

/* Ensure the container content is properly aligned */
.intro-text {
  padding: 20px;
  position: relative; /* Ensures text is above the background image */
  z-index: 1;
}

/* Styles for the team section */
.team-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* Styles for individual team cards */
.team-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.team-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Styles for text within cards */
.v-card-title {
  color: #1e3a8a; /* Dark blue for titles */
}

.v-card-subtitle {
  color: #4a5568; /* Gray for subtitles */
}

.v-card-text {
  color: #4a5568; /* Gray for text */
}

.v-btn {
  font-weight: 500;
  color: #1e3a8a; /* Dark blue for button text */
}

/* Animation for the gradient background */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>
