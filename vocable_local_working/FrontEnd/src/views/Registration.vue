<template>
  <div class="wrapper">
    <v-sheet>
      <v-card class="mx-auto px-6 py-8" max-width="344">
        <img src="/logoVuoto.png" alt="Vocable Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

        <v-form v-model="isFormValid" lazy-validation @submit.prevent="onRegistrati">
          <v-text-field class="required" type="nickname" :rules="nicknameRules" v-model="nickname" label="Nickname"
            variant="underlined"></v-text-field>
          <v-text-field class="required" type="email" :rules="emailRules" v-model="email" label="Email"
            variant="underlined"></v-text-field>
          <v-text-field class="required" type="password" :rules="passwordRules" v-model="password" label="Password"
            variant="underlined"></v-text-field>
        </v-form>

        <!-- Alert per l'errore -->
        <v-alert v-if="currentEmailError" type="error" dismissible>
          {{ currentEmailError }}
        </v-alert>

        <v-btn :disabled="!isFormValid" @click.native="onRegistrati" color="blue" size="large" variant="elevated" block>
          Registrati
        </v-btn>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import store from '@/store';



export default {
  data() {
    return {
      isFormValid: false,
      email: '',
      password: '',
      nickname: '',
      loading: false,
      nicknameRules: [
        v => !!v || 'Obbligatorio',
        v => v.length >= 3 || 'Username troppo corto, almeno 3 caratteri',
      ],
      passwordRules: [
        v => !!v || 'Obbligatorio',
        v => v.length >= 6 || 'Password troppo corta, almeno 6 caratteri',
      ],
      emailRules: [
        v => !!v || 'Obbligatorio',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida',
      ],
    };
  },

  computed: {
    ...mapState('email', ['emailError']),
    currentEmailError() {
      console.log('Stato corrente di emailError:', this.emailError);
      return this.emailError;
    }
  },

  methods: {
    ...mapActions('email', ['setEmailError', 'clearEmailError']),
    ...mapActions('email', ['register']),

    async onRegistrati() {
      this.loading = true;

      try {
        // Pulisci eventuali errori precedenti
        this.clearEmailError();

        // Effettua la chiamata al modulo email per la registrazione
        const response = await this.register({
          email: this.email,
          password: this.password,
          nickname: this.nickname
        });

        if (response.data.status) {
          await axios.post('/api/utente/createstats', {
            email: this.email,
            gameswon: 0,
            gameslost: 0,
            totalgames: 0,
            won1: 0,
            won2: 0,
            won3: 0,
            won4: 0,
            won5: 0,
            won6: 0,
          });
          this.$router.replace({ name: 'registrationcomplete' });
        } 
      } catch (error) {
        console.log('Errore durante la registrazione:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};

</script>

<style scoped>
.wrapper {
  display: block;
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 15px;
  text-align: center;
  padding-top: 5%;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 15%;
  height: auto;
}
</style>
