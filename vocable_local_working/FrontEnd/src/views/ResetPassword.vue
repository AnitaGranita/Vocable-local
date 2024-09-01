<template>
    <div class="wrapper">
        <v-sheet class="pa-12 mx-auto elevation-2" rounded width="400">
            <v-form ref="form">
                <img src="/logoVuoto.png" alt="Vocable Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

                <v-text-field class="required" type="password" :rules="passwordRules" v-model="newPassword"
                    label="Nuova Password" variant="underlined"></v-text-field>

                <v-text-field class="required" type="password" :rules="passwordRules" v-model="confirmPassword"
                    label="Conferma Password" variant="underlined"></v-text-field>

                <div class="d-flex flex-column">
                    <v-btn class="mt-4" color="blue" size="large" variant="elevated" block @click="resetPassword">
                        Cambia Password
                    </v-btn>

                    <v-btn class="mt-4 text-white" color="blue-500" variant="elevated" block @click="reset">
                        Clear Form
                    </v-btn>

                </div>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
export default {
    data: () => ({
        newPassword: '',
        confirmPassword: '',
        passwordRules: [
            v => !!v || 'Obbligatorio',
            v => v && v.length >= 6 || 'Password troppo corta, almeno 6 caratteri',
            v => (v && v.length <= 15) || 'La password deve essere al massimo 15 caratteri!',
            v => v === this.newPassword || 'Le password non corrispondono'
        ],
    }),

    methods: {
        async resetPassword() {
            const { valid } = await this.$refs.form.validate();
            if (valid) {
                try {
                    const token = this.$route.params.token;
                    await this.$http.post(`/utente/reset-password/${token}`, { newPassword: this.newPassword });
                    alert('Password cambiata con successo');
                } catch (error) {
                    alert('Errore nel cambio della password');
                }
            }
        },
        reset() {
            this.$refs.form.reset();
        },
    },
}
</script>
