<template>
    <div class="wrapper d-flex align-center justify-center">
        <v-sheet class="pa-6 elevation-2" rounded max-width="500px" width="100%">
            <v-form ref="form">
                <div class="text-center mb-4">
                    <img src="/logoVuoto.png" alt="Vocable Logo" class="logo-img" />
                    <span class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Password
                        dimenticata</span>
                    <v-card-text class="text-h6">Inserisci il tuo indirizzo email, dopodiché ti arriverà una mail che ti
                        chiederà di resettare la password.</v-card-text>
                </div>

                <v-text-field class="required ma-5" type="email" :rules="emailRules" v-model="email" label="Email"
                    variant="underlined"></v-text-field>

                <div class="d-flex flex-column mt-5 mb-5">
                    <v-btn class="mt-4 button" color="blue-500" size="x-large" variant="elevated" rounded="xl" block
                        @click="sendResetLink">
                        Invia link di reset
                    </v-btn>
                </div>
            </v-form>
        </v-sheet>
    </div>
</template>

<style scoped>
.wrapper {
    min-height: 96vh;
    padding: 16px;
    background: linear-gradient(135deg, rgba(89, 158, 255, 0.2), rgb(1, 43, 255));
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
import emailjs from 'emailjs-com'
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

                    const response = await axios.post('https://vocable-g48-production-a10a.up.railway.app/api/utente/forgot-password', { email: this.email });

                    if (response.data.status) {
                        const resetToken = response.data.resetToken;
                       

                        const resetLink = `https://vocable-g48-production-a10a.up.railway.app/reset-password/${resetToken}`;
                       

                        emailjs.init("LxMUIwv2KBoQWjQDz");

                        const templateParams = {
                            email: this.email,
                            message: `${resetLink}`,
                        };

              
                        const emailResponse = await emailjs.send('default_service', 'template_o30m3uc', templateParams);
                        console.log("Risposta dall'invio email:", emailResponse); // Log della risposta da emailjs

                        alert('Link di reset inviato con successo');
                        this.$router.push({ name: 'email-sent' });

                    } else {
                        console.error('Errore durante la generazione del token:', response.data.message); // Log in caso di errore nella generazione del token
                        alert('Errore durante la generazione del token');
                    }
                } catch (error) {
                    console.error("Errore durante l'invio del link di reset:", error); // Log dell'errore catturato
                    alert('Errore durante l\'invio del link di reset');
                }
            }
        }

    }
}
</script>
