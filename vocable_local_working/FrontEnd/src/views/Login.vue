<template>
  <div class="wrapper">
    <v-sheet class="elevation-2 rounded-lg pa-8 login-container">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <div class="text-center">
        <img src="/logoVuoto.png" alt="Vocable Logo" class="logo mb-4" />
        <p class="self-center text-3xl font-semibold whitespace-nowrap dark:text-white mb-6">Login</p>
      </div>

      <v-form v-model="isFormValid" lazy-validation @submit.prevent="onLogin">
        <v-text-field class="required mb-4" type="email" :rules="emailRules" v-model="email" label="Email"
          variant="underlined"></v-text-field>
        <v-text-field class="required mb-4" type="password" :rules="passwordRules" v-model="password" label="Password"
          variant="underlined"></v-text-field>

        <v-btn :disabled="!isFormValid" @click.native="onLogin" color="blue" size="large" variant="elevated"
          block>Login</v-btn>
      </v-form>

      <v-card-text class="d-flex justify-end mt-2">
        <router-link to="/forgot-password" class="text-blue ">Dimenticato la password?</router-link>
      </v-card-text>

      <v-card-text class="black--text mt-4 text-center text-lg">
        <p>Non hai ancora un profilo?</p>
        <router-link to="/registration" class="font-semibold whitespace-nowrap text-blue-500">Registrati</router-link>
      </v-card-text>
    </v-sheet>
  </div>
</template>


<script>
//import axios from 'axios';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
//import store from '../store'
//import { list } from 'postcss';

export default {
  namespaced: true,
  data() {
    return {
      selection: 1,
      isFormValid: false,
      email: '',
      password: '',
      loading: false,
      passwordRules: [
        v => !!v || 'Obbligatorio',
        v => v && v.length >= 6 || 'Password troppo corta, almeno 6 caratteri'
      ],
      emailRules: [
        v => !!v || 'Obbligatorio',
        v => v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
      ]
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },
  methods: {
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    ...mapActions({
      signIn: 'auth/signIn'
    }),

    async onLogin() {
      try {
        this.loading = true;

        const credentials = { //crea un oggetto contenente email e password che verranno usate su auth per loggare
          email: this.email,
          password: this.password
        }

        const response = await this.signIn(credentials);
        if (!response.data.status) {
          alert(response.data.message)
        } else {
          console.log("rerouting to userstats"),
            this.$router.replace({ name: 'userstats' });
        }

      } catch (error) {
        console.error('Errore durante il login:', error);
        alert('Errore durante il login', error);
      } finally {
        this.loading = false;
        setTimeout(() =>
          this.$router.replace({ name: 'userstats' }), 500)
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
  background: linear-gradient(165deg, rgba(89, 158, 255, 0.264), rgb(1, 43, 255));
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.logo {
  max-width: 100px;
  height: auto;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .login-container {
    padding: 24px;
  }

  .logo {
    max-width: 80px;
  }
}
</style>