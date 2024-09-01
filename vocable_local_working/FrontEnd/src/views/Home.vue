<template>
  <div id="home">
    <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
    </head>
    <img src="/logoVuoto.png" class="h-5" alt="Vocable Logo" />
    <span class="vocableText">Vocable</span>
    <div class="descrizione mb-6">
      <span class="desc">Leggi la definizione, indovina la parola!</span>
    </div>
    <v-btn :to="{ path: '/Gameplay' }" class="button" size="x-large" color="primary" rounded="xl">
      Gioca!
    </v-btn>
    <!-- Pulsante Regole -->
    <v-btn @click="showRules" class="rules-button" size="x-large" rounded="xl" variant="outlined" color="blue-400">
    How to play
  </v-btn>
    <!-- Componente Rules -->
    <Rules ref="rulesComponent" />
  </div>
</template>

<script>
import Rules from '@/components/Rules.vue';

export default {
  name: 'Home',
  components: {
    Rules
  },
  methods: {
    showRules() {
      this.$refs.rulesComponent.openRules();
    }
  }
}
</script>

<style scoped>
#home {
  width: 100vw; 
  height: 100vh; 
  margin: 0;
  padding: 10px;
  text-align: center;
  background: linear-gradient(rgba(0, 119, 255, 0.2), rgba(0, 34, 255, 0.5)), url('@/assets/home_background.jpg') no-repeat center center;
  background-size: cover; 
  position: relative;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 18%;
  height: auto;
}

.descrizione {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.desc {
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: block;
  color: white;
  font-size: 1.5rem;
}

.vocableText {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 600;
  white-space: nowrap;
  color: #ffffff;
}

.button, .rules-button {
  width: 80%;
  max-width: 300px;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.2rem; 
  margin: 10px auto;
  cursor: pointer;
  transition: background-image 0.4s ease, transform 0.4s ease;
}

.button {
  background-image: linear-gradient(to right, hsl(242, 100%, 50%), hsl(203, 100%, 59%));
  border: none;
  color: white;
}

.button:hover {
  background-image: linear-gradient(to left, rgb(4, 0, 255), rgb(0, 157, 255));
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  transform: translateY(-4px);
}

.button:active {
  transform: translateY(-2px); 
}

.rules-button {
  color: white !important; 
  background-color: transparent;
}

.rules-button:hover {
  transform: translateY(-4px); 
}

.rules-button:active {
  transform: translateY(-2px); 
}


@media (max-width: 768px) {
  .vocableText {
    font-size: 1.8rem; 
  }

  .button, .rules-button {
    width: 90%;
    max-width: none; 
    font-size: 1rem;
    padding: 10px 20px;
  }

  .descrizione {
    width: 90%; 
  }
}

@media (max-width: 480px) {
  .vocableText {
    font-size: 1.5rem; 
  }

  .button, .rules-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
