<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['onKeyPress']);

const props = defineProps({
  guessedLetters: Object,
  resetKeyboard: Boolean,
});

const keyboard = ref(null);

const onKeyPress = (button) => {
  emit('onKeyPress', button);
};

const resetKeyboard = () => {
  console.log('Resetting keyboard...');
  try {
    if (keyboard.value) {
      const allButtons = 'Q W E R T Y U I O P A S D F G H J K L Z X C V B N M';
      keyboard.value.removeButtonTheme(allButtons, 'miss found hint');
    } else {
      console.error('Keyboard not initialized');
    }
  } catch (error) {
    console.error('Error during keyboard reset:', error);
  }
};

onMounted(() => {
  console.log('Component mounted');
  keyboard.value = new Keyboard('simple-keyboard', {
    layout: {
      default: [
        'Q W E R T Y U I O P',
        'A S D F G H J K L',
        '{bksp} Z X C V B N M {enter}'
      ]
    },
    onKeyPress: onKeyPress,
    buttonTheme: [
      {
        class: 'miss',
        buttons: ' '
      },
      {
        class: 'found',
        buttons: ' '
      },
      {
        class: 'hint',
        buttons: ' '
      }
    ]
  });
});

watch(
  () => props.resetKeyboard,
  (reset) => {
    if (reset) {
      console.log('Reset Keyboard Prop:', reset);
      resetKeyboard();
    }
  }
);

watch(
  () => props.guessedLetters,
  (guessedLetters) => {
    console.log('Guessed Letters Updated:', guessedLetters);

    if (keyboard.value) {
      keyboard.value.addButtonTheme(
        guessedLetters.miss.join(' '),
        'miss'
      );
      keyboard.value.addButtonTheme(
        guessedLetters.found.join(' '),
        'found'
      );
      keyboard.value.addButtonTheme(
        guessedLetters.hint.join(' '),
        'hint'
      );
    }
  },
  { deep: true }
);
</script>

<style>
* {
  font-family: Tahoma, sans-serif;
}
.simple-keyboard.hg-layout-default .hg-button.miss {
  background: rgb(158, 158, 158) !important;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.found {
  background: rgb(67, 160, 71) !important;
  color: white;
}
.simple-keyboard.hg-layout-default .hg-button.hint:not(.found) {
  background: rgb(255, 235, 59) !important;
  color: white;
}
</style>
