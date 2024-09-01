<script setup>

const props = defineProps({ //definisce le props del LetterBox
    letter: { //questa è la lettera in sé
        type: String,
        default: "",
    },
    color: { //colore della lettera
        type: String,
        default: "",
    }
});

</script>

<template>
    <!--definizione in sé della "scatola" della lettera-->
    <div class="lettercontainer" :class="{
        'border-gray-500 bg-gray-500 text-white'
            : color == 'gray',
        'border-green-600 bg-green-600 text-white'
            : color == 'green',
        'border-yellow-500 bg-yellow-500 text-white'
            : color == 'yellow',
    }">
        <!--scriviamo la lettera nei "double mustache", così può "cambiare ogni volta"-->
        {{ letter }}
    </div>
</template>

<style>
.lettercontainer {
  grid-column: span 1 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px; 
  text-transform: uppercase;
  border-width: 2px;
  border-color: rgb(229, 231, 235);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>