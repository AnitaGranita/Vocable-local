<template>
    <div class="simple-keyboard"></div>
</template>
  
  <script setup>
  import Keyboard from "simple-keyboard";
  import "simple-keyboard/build/css/index.css"
  import { ref, onMounted, watch } from "vue";

  const emit = defineEmits(["onKeyPress"]);

  const props = defineProps({
    guessedLetters: Object,
  });

  const keyboard = ref(null);

  const onKeyPress = (button) => {
    emit("onKeyPress", button);
  };

  onMounted(()=>{
    keyboard.value = new Keyboard("simple-keyboard",{
        layout: {
            default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "{bksp} Z X C V B N M {enter}",
            ],
        },
        onKeyPress: onKeyPress,
        buttonTheme: [ //definizione delle classi per i bottoni schiacciati
          {
          class: "miss",
          buttons: " "
          },
          {
          class: "found",
          buttons: " "
          },
          {
          class: "hint",
          buttons: " "
          }
        ],

    });
  });

 watch(
     ()=>props.guessedLetters,
     (guessedLetters, prevGuessedLetters)=>{ //assegnazione delle classi per i bottoni schiacciati
       keyboard.value.addButtonTheme(
       guessedLetters.miss.join(" "),
       "miss"
       );
       keyboard.value.addButtonTheme(
       guessedLetters.found.join(" "),
       "found"
       );
       keyboard.value.addButtonTheme(
       guessedLetters.hint.join(" "),
       "hint"
       );
     },
     {deep: true}
   );
  </script>

<style>
* {
  font-family: Tahoma, sans-serif;
}
.simple-keyboard.hg-layout-default .hg-button.miss {
background: rgb(157, 157, 157) !important;
color: white;
}
.simple-keyboard.hg-layout-default .hg-button.found {
background: rgb(0, 163, 0) !important;
color: white;
}
.simple-keyboard.hg-layout-default .hg-button.hint:not(.found) {
background: rgb(237, 174, 0) !important;
color: white;
}

</style>