<script setup>
import LetterBox from './LetterBox.vue'; //qui importiamo l'applicazione "LetterBox" e di conseguenza le sue proprietà
import {ref, watch, reactive} from "vue"; // importiamo i metodi "ref" e "watch" da vue


const props = defineProps({ //definiamo i props dell'applicazione WordRow
    value: String,   //valore: string submitted (le guess che l'utente fa)
    solution: String, //soluzione: soluzione del problema
    submitted: Boolean, //submitted: se la guess è stata inviata
});

const colors = ref(["", "", "", "", "", "", "", ""]); //"template" che definisce quante caselle verrano colorate

watch( //metodo di vue
    ()=>props.submitted, //se l'utente "submitta" una guess, il metodo funziona 
    async(submitted, prevSubmitted) => {
        if (props.submitted) {
            let s = props.solution;
            let v = props.value;

            let temp = ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray" ]; //Temp è l'array temporaneo dei colori
            let letterPool = []; //letterPool è l'array dove verranno salvate le lettere della soluzione non verdi
            for (let i = 0; i < props.solution.length; i++) { // con questo for  scorriamo la guess con la soluzione
                if (s.charAt(i)==v.charAt(i)) {
                    temp[i] = "green";  //se la lettera nella stessa posizione è uguale, allora la casella diventa verde
                } else {
                    letterPool.push(s.charAt(i)); //le altre lettere della soluzione, quelle grigie, vengono messe in letterPool
                }
            }
            for (let i = 0; i < props.solution.length; i++) {  //con questo for verifichiamo se ci sono lettere di posizione gialla
                if (temp[i]=="gray") {  // questo controllo trascura le caselle verdi
                    if (letterPool.indexOf(v.charAt(i)) != -1) {  //se la lettera è presente in letterPool (quindi diversa da -1) si entra nell'if
                        letterPool.splice(letterPool.indexOf(v.charAt(i)), 1) // viene poi rimossa la lettera in questione
                        temp[i] = "yellow"; //viene poi messa gialla
                    }
                }
                colors.value[i] = temp[i];  //valori definiti
                await new Promise((resolve) => setTimeout(resolve, 500)); 
            }
        }
    }
);

</script>

<template>

    <div class="wordrowcss">
        <letter-box
        v-for ="i in solution.length"
        :key="i"
        :letter="value[i-1]" 
        :color="colors[i-1]"
     />

        
    </div>
</template>

<style>
    .wordrowcss{
        display: grid;
        grid-template-rows: 70px;
        grid-auto-rows: 100px;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
        gap: 10px;
    }
</style>