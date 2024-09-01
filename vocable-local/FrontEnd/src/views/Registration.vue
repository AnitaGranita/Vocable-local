<template>
  <div class="wrapper">
    <v-sheet class="elevation-2 rounded-lg pa-8 register-container">
      <div class="text-center">
        <img src="/logoVuoto.png" alt="Vocable Logo" class="logo mb-4" />
        <p class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white mb-4">Registrazione</p>
      </div>

      <v-form v-model="isFormValid" lazy-validation @submit.prevent="onRegistrati">
        <v-text-field class="required mb-4" type="text" :rules="nicknameRules" v-model="nickname" label="Nickname"
          variant="underlined"></v-text-field>
        <v-text-field class="required mb-4" type="email" :rules="emailRules" v-model="email" label="Email"
          variant="underlined"></v-text-field>
        <v-text-field class="required mb-4" type="password" :rules="passwordRules" v-model="password" label="Password"
          variant="underlined"></v-text-field>

        <!-- Alert per l'errore -->
        <v-alert v-if="currentEmailError" type="error" dismissible class="text-center mt-2">
          {{ currentEmailError }}
        </v-alert>

        <v-btn :disabled="!isFormValid" @click.native="onRegistrati" color="blue" size="large" variant="elevated"
          block>Registrati</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
//import store from '@/store';



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
          await axios.post('https://vocable-g48-production-a10a.up.railway.app/api/utente/createstats', {
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 15px;
  text-align: center;
  background: linear-gradient(185deg, rgba(34, 126, 255, 0.563), rgba(33, 33, 255, 0.93)); 
}

.register-container {
  width: 100%;
  max-width: 400px;
}

.logo {
  max-width: 100px;
  height: auto;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .register-container {
    padding: 24px;
  }

  .logo {
    max-width: 80px;
  }
}
</style>