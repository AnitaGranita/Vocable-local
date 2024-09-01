<template>
  <div v-if="isVisible" class="rules-overlay">
    <div class="rules-modal">
      <!-- Pulsante di chiusura -->
      <button @click="closeRules" class="close-button">X</button>
      <p class="text-h4 font-bold mb-4 text-center">How to play!</p>
      <div class="mb-6 text-center">
        Hai <span class="font-bold text-blue-600 ml-2 mr-2 text-lg">6</span> tentativi per indovinare la parola in base alla definizione
      </div>
      <div class="text-left mb-4">
        <p class="font-semibold text-blue-600">Spiegazione caselle:</p>
        <p>Le caselle ti aiutano a capire se stai indovinando, in base al colore:</p>
      </div>
      <div class="color-explanation">
        <div class="color-box bg-green"></div>
        <div class="color-description">
          <span class="font-bold green-text">Casella verde</span>
          <p>La lettera è corretta e nella posizione giusta.</p>
        </div>
      </div>
      <div class="color-explanation">
        <div class="color-box bg-yellow"></div>
        <div class="color-description">
          <span class="font-bold yellow-text">Casella gialla</span>
          <p>La lettera è corretta ma nella posizione sbagliata.</p>
        </div>
      </div>
      <div class="color-explanation">
        <div class="color-box bg-grey"></div>
        <div class="color-description">
          <span class="font-bold gray-text">Casella grigia</span>
          <p>La lettera non è presente nella parola.</p>
        </div>
      </div>
      <p class="font-semibold mt-10 mb-4 text-blue-500 text-center">Buona fortuna!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    openRules() {
      this.isVisible = true;
    },
    closeRules() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>
.rules-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.rules-modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px; /* Dimensione massima su desktop */
  max-height: 80vh; /* Limita l'altezza su desktop */
  width: 100%;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Aggiungi scroll verticale se necessario */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.color-explanation {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.color-box {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid rgb(74, 74, 74);
  margin-right: 16px;
  margin-bottom: 8px;
}

.color-description {
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: calc(100% - 66px);
}

.color-description span {
  font-weight: bold;
}

.green-text {
  color: #4caf50;
}

.yellow-text {
  color: #efc000;
}

.gray-text {
  color: #9e9e9e;
}

/* Stili responsivi per migliorare l'esperienza su schermi piccoli */
@media (max-width: 600px) {
  .rules-modal {
    padding: 16px;
    max-width: 100%;
    max-height: 80vh;
  }

  .close-button {
    top: 5px;
    right: 5px;
    font-size: 16px;
  }

  .color-box {
    width: 40px;
    height: 40px;
  }

  .color-explanation {
    margin-bottom: 12px;
  }
}
</style>
