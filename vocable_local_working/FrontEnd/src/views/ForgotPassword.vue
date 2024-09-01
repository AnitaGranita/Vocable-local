<template>
    <div class="wrapper">
        <v-sheet class="pa-12 mx-auto elevation-2" rounded width="400">
            <v-form ref="form">
                <img src="/logoVuoto.png" alt="Vocable Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

                <v-text-field class="required" type="email" :rules="emailRules" v-model="email"
                    label="Email" variant="underlined"></v-text-field>

                <div class="d-flex flex-column">
                    <v-btn class="mt-4" color="blue" size="large" variant="elevated" block @click="sendResetLink">
                        Invia link di reset
                    </v-btn>

                </div>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        email: '',
        emailRules: [
            v => !!v || 'Obbligatorio',
            v => v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
        ],
    }),

    methods: {
        async sendResetLink() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                try {
                    await axios.post('api/utente/forgot-password', { email: this.email });
                    alert('Link di reset inviato, controlla la tua email');
                } catch (error) {
                    alert('Errore nell\'invio del link di reset');
                }
            }
        },
    },
}
</script>
