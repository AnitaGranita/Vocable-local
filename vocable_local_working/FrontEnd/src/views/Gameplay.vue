<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue';
import axios from 'axios';
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
  gameFinished: false,
});

const wonGame = computed(() =>
  state.guesses[state.currentGuessIndex - 1] === state.solution.word
);

const lostGame = computed(() => !wonGame.value && state.currentGuessIndex >= 6);


const keyboardReset = ref(false);

const refreshPage = async () => {
  state.solution = getRandomWord(); // Genera una nuova parola casuale
  state.guesses = ["", "", "", "", "", ""]; // Resetta le ipotesi
  state.currentGuessIndex = 0; // Resetta l'indice delle ipotesi
  state.guessedLetters = { miss: [], found: [], hint: [] }; // Resetta guessedLetters
  state.statsSaved = false; // Imposta il salvataggio delle statistiche su false
  state.gameFinished = false; // Imposta lo stato del gioco come non finito
  keyboardReset.value = true; // Imposta il flag per resettare la tastiera
  await nextTick();
  setTimeout(() => {
    keyboardReset.value = false; // Reimposta il flag per evitare che si resetti continuamente
  }, 0);
};

// Funzione per gestire l'input da tastiera
const handleInput = (key) => {
  console.log('Handling input:', key); // Log per monitorare la chiave che viene gestita
  if (!state.statsSaved) {
    if ((wonGame.value || lostGame.value) && !state.statsSaved) {
      console.log('Il gioco è terminato. Aggiorno le statistiche...');
      updateUserStats(wonGame.value, state.currentGuessIndex); // Aggiorna le statistiche
      state.statsSaved = true;
      state.gameFinished = true; // Imposta lo stato del gioco come finito
      return;
    }

    const currentGuess = state.guesses[state.currentGuessIndex];
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
        if ((wonGame.value || lostGame.value) && !state.statsSaved) {
          console.log('Il gioco è terminato. Aggiorno le statistiche...');
          updateUserStats(wonGame.value, state.currentGuessIndex); // Aggiorna le statistiche
          state.statsSaved = true;
          state.gameFinished = true; // Imposta lo stato del gioco come finito
        }
      }
    } else if (key == "{bksp}") {
      state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
    } else if (currentGuess.length < state.solution.word.length) {
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
        : e.code == "Backspace"
          ? "{bksp}"
          : e.code == "Tab"
            ? ""
            : e.code == "ControlLeft"
              ? ""
              : e.code == "ControlRight"
                ? ""
                : e.code == "ShiftLeft"
                  ? ""
                  : e.code == "CapsLock"
                    ? ""
                    : e.code == "AltRight"
                      ? ""
                      : e.code == "AltLeft"
                        ? ""
                        : e.key;
    handleInput(key);
  });
});
</script>

<template>
  <v-responsive>
    <v-sheet class="content-wrapper">
      <div class="wrapperwords">
        <div>
          <word-row v-for="(guess, i) in state.guesses" :key="i + state.solution.word" :value="guess"
            :solution="state.solution.word" :submitted="i < state.currentGuessIndex" class="word-row" />
        </div>

        <template v-if="wonGame && state.gameFinished" class="text-center">
          <p class="win-message">
            Congratulazioni! Hai trovato la soluzione!
          </p>
        </template>

        <template v-else-if="lostGame && state.gameFinished" class="lose-wrapper">
          <p class="lose-message-warn">
            Peccato, hai perso!
          </p>
          <span class="lose-message">
            <p class="lose-message-word">La parola era: </p>
            <p class="lose-message-solution">{{ state.solution.word }}</p>
          </span>
        </template>

        <div class="definition-container">
          <span>
            <p class="definition-title">Definizione:</p>
            <p class="definition-text cutive-regular mt-2">
              {{ state.solution.definition }}
            </p>
          </span>
        </div>

        <simple-keyboard @onKeyPress="handleInput" :guessedLetters="state.guessedLetters"
          :resetKeyboard="keyboardReset" />

        <div class="button-wrapper">
          <v-btn rounded="xl" size="x-large" elevation="8" v-ripple color="#5865f2" class="refresh-button"
            v-if="state.gameFinished" @click="refreshPage">
            Prossima parola
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-responsive>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cutive&display=swap');

.cutive-regular {
  font-family: "Cutive", serif;
  font-weight: 400;
  font-style: normal;
}

.content-wrapper {
  margin-top: 20px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  font-family: 'Roboto', sans-serif;
}

.wrapperwords {
  flex: 1;
  width: 100%;
  padding: 0 10px;
}


.button-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}


.refresh-button {
  display: flex;
  align-items: center;
  justify-content: center;
}


.win-message {
  font-size: 1.5rem;
  font-weight: 700;
  color: #28a745;
  text-align: center;
}


.lose-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
}

.lose-message-warn {
  font-size: 1.5rem;
  font-weight: 700;
  color: #dc3545;
  margin-bottom: 10px;
  text-align: center;
}

.lose-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.lose-message-word,
.lose-message-solution {
  font-size: 1.25rem;
}

.lose-message-solution {
  font-weight: 700;
  color: #dc3545;
}


.definition-container {
  text-align: center;
  margin: 20px 0;
}

.definition-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #007bff;
}

.definition-text {
  font-size: 1.125rem;
  font-weight: 400;
  color: #212529;
}


@media (max-width: 600px) {
  .wrapperwords {
    padding: 0 5px;
  }

  .refresh-button {
    width: 80%;
  }

  .win-message,
  .lose-message-warn,
  .definition-title {
    font-size: 1.25rem;
  }

  .lose-message-word,
  .lose-message-solution,
  .definition-text {
    font-size: 1rem;
  }
}
</style>