<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';  // Assicurati di avere axios installato
import SimpleKeyboard from '../components/SimpleKeyboard.vue';
import WordRow from '../components/WordRow.vue';
import { getRandomWord } from '../components/Words.vue';

const state = reactive({
  solution: getRandomWord(),
  guesses: ["", "", "", "", "", ""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: [],
  },
  statsSaved: false,
});

// Computed per verificare se il gioco è stato vinto o perso
const wonGame = computed(() =>
  state.guesses[state.currentGuessIndex - 1] === state.solution.word
);

const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);

// Funzione per ricaricare la pagina e iniziare un nuovo gioco
const refreshPage = () => {
  window.location.reload(); // Ricarica la pagina corrente
};

// Funzione per gestire l'input da tastiera
const handleInput = (key) => {
  if(!state.statsSaved){
  // Controlla se il gioco è terminato
  if ((wonGame.value || lostGame.value) && !state.statsSaved) {
    console.log('Il gioco è terminato. Aggiorno le statistiche...');
    updateUserStats(wonGame.value, state.currentGuessIndex); // Aggiorna le statistiche
    state.statsSaved = true;
    return;
  }

  const currentGuess = state.guesses[state.currentGuessIndex];
  // Gestione del tasto "enter"
  if (key == "{enter}") {
    if (currentGuess.length == state.solution.word.length) {
      for (let i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.word.charAt(i)) {
          state.guessedLetters.found.push(c.toUpperCase());
        } else if (state.solution.word.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c.toUpperCase());
        } else {
          state.guessedLetters.miss.push(c.toUpperCase());
        }
      }
      state.currentGuessIndex++;

      // Controllo immediato di vittoria o sconfitta
      if ((wonGame.value || lostGame.value)&& !state.statsSaved) {
        console.log('Il gioco è terminato. Aggiorno le statistiche...');
        updateUserStats(wonGame.value, state.currentGuessIndex); // Aggiorna le statistiche
        state.statsSaved = true;
      }
    }
  } 
  // Gestione del tasto "backspace"
  else if (key == "{bksp}") {
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
  } 
  // Aggiunta del carattere se non è già completo
  else if (currentGuess.length < state.solution.word.length) {
    const alphaRegex = /[A-Za-z]/;
    if (alphaRegex.test(key)) {
      state.guesses[state.currentGuessIndex] += key.toLowerCase();
    }
  }
}
};

// Funzione per aggiornare le statistiche dell'utente
const updateUserStats = async (won, attempts) => {
  try {
    console.log(`Updating stats: won=${won}, attempts=${attempts}`);
    await axios.post('/api/utente/update-stats', { won, attempts });
    console.log('Statistiche aggiornate con successo');
  } catch (error) {
    console.error('Errore durante l\'aggiornamento delle statistiche:', error);
  }
};

// Aggiunge il listener per la tastiera una volta montato il componente
onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key =
      e.code == "Enter"
      ? "{enter}"
      : e.code== "Backspace"
      ? "{bksp}"
      : e.code== "Tab"
      ? ""
      : e.code== "ControlLeft"
      ? ""
      : e.code== "ControlRight"
      ? ""
      : e.code== "ShiftLeft"
      ? ""
      : e.code== "CapsLock"
      ? ""
      : e.code== "AltRight"
      ? ""
      :e.key;
    handleInput(key);
  });
});
</script>

<template>
  <v-sheet class="content-wrapper">
    <div class="wrapperwords">
      <div>
        <!-- Mostra le righe delle parole -->
        <word-row
          v-for="(guess, i) in state.guesses"
          :key="i"
          :value="guess"
          :solution="state.solution.word"
          :submitted="i < state.currentGuessIndex"
        />
      </div>

      <!-- Messaggio di vittoria o sconfitta -->
      <p v-if="wonGame" class="text-center">
        Congratulazioni! Hai trovato la soluzione!
      </p>
      <p v-else-if="lostGame" class="text-center">
        Hai perso! Riprova, magari la prossima la indovini!
      </p>

      <!-- Definizione della parola -->
      <div class="text-center ma-10">
        <span>
          <p class="rounded font-semibold text-h5 text-blue-700">Definizione:</p>
          <p class="rounded font-medium font-italic text-h6 text-black">
            {{ state.solution.definition }}
          </p>
        </span>
      </div>

      <!-- Componente della tastiera -->
      <simple-keyboard @onKeyPress="handleInput" :guessedLetters="state.guessedLetters" />

      <!-- Bottone per ricaricare la pagina e iniziare un nuovo gioco -->
      <div class="button-wrapper">
        <v-btn
          rounded="xl"
          size="x-large"
          elevation="8"
          v-ripple
          color="blue"
          class="refresh-button"
          v-if="wonGame || lostGame"
          @click="refreshPage"
        >
          Prossima parola
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped>
.content-wrapper {
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  overflow-y: auto; /* Abilitare lo scrolling verticale se necessario */
}

.wrapperwords {
  flex: 1;
}

.button-wrapper {
  display: flex;
  justify-content: center; 
  margin-top: 20px; 
}

.refresh-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

  
</style>
