<template>
    <div class="wrapper d-flex align-center justify-center">
        <v-sheet class="pa-6 elevation-2 text-center pa-10" rounded max-width="500px" width="100%">
            <v-form ref="form" @submit.prevent="resetPassword">
                <img src="/logoVuoto.png" alt="Vocable Logo" class="logo-img" />
                <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white mb-4">Reset
                    password</span>

                <v-text-field class="required mt-4" type="password" :rules="passwordRules" v-model="newPassword"
                    label="Nuova Password" variant="underlined"></v-text-field>

                <v-text-field class="required" type="password" :rules="passwordRules" v-model="confirmPassword"
                    label="Conferma Password" variant="underlined"></v-text-field>


                <v-btn class="mt-8 button" color="blue-500" size="x-large" variant="elevated" rounded="xl" block
                    @click="resetPassword">
                    Cambia Password
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<style scoped>
.wrapper {
    min-height: 96vh;
    padding: 16px;
    background: linear-gradient(110deg, rgba(89, 125, 255, 0.2), rgb(14, 1, 255));
    align-items: center;
    justify-content: center;
}

.logo-img {
    max-width: 100px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 16px;
}

.button {
    transition: background-image 0.4s ease, transform 0.4s ease;
    color: white;
}

.button:hover {
    transform: translateY(-4px);
}

.button:active {
    transform: translateY(-2px);
}

@media (max-width: 600px) {
    .wrapper {
        padding: 8px;
    }

    .v-sheet {
        padding: 16px !important;
    }

    .logo-img {
        max-width: 80px;
    }
}
</style>



<script>
import axios from 'axios';
export default {
    props: ['token'],
    data: () => ({
        newPassword: '',
        confirmPassword: '',
        passwordRules: [
            v => !!v || 'Obbligatorio',
            v => v && v.length >= 6 || 'Password troppo corta, almeno 6 caratteri'
        ]
    }),

    methods: {
    async resetPassword() {
        console.log('resetPassword chiamato');
        console.log('Token:', this.token);
        console.log('New Password:', this.newPassword);
        console.log('Confirm Password:', this.confirmPassword);

        // Validazione delle password
        if (this.newPassword !== this.confirmPassword) {
            alert('Le password non corrispondono');
            return;
        }

        try {
            // Invia la richiesta di reset della password al server
            const response = await axios.post('/api/utente/reset-password', {
                token: this.token,
                newPassword: this.newPassword
            });

            if (response.data.status) {
                alert('Password resettata con successo');
                // Redirigi l'utente alla pagina di login o a un'altra pagina
                this.$router.push({ name: 'login' });
            } else {
                alert('Errore nel reset della password: ' + response.data.message);
            }
        } catch (error) {
            console.error('Errore durante il reset della password:', error);
            alert('Errore durante il reset della password');
        }
    }
}


}
</script>
