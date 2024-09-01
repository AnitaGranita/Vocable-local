<template>
  <div class="wrapper">
    <v-sheet>
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
      </template>

      <v-card class="mx-auto px-6 py-8" max-width="344">
        <img src="/logoVuoto.png" alt="Vocable Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

        <v-form v-model="isFormValid" lazy-validation @submit.prevent="onLogin">
          <v-text-field class="required" type="email" :rules="emailRules" v-model="email" label="Email"
            variant="underlined"></v-text-field>
          <v-text-field class="required" type="password" :rules="passwordRules" v-model="password" label="Password"
            variant="underlined"></v-text-field>
        </v-form>
        <v-btn :disabled="!isFormValid" @click.native="onLogin" color="blue" size="large" variant="elevated"
          block>Login</v-btn>
        <v-card-text> <router-link to="/forgot-password" class="justify-end d-flex text-blue">Dimenticato la
            password?</router-link></v-card-text>
        <span>
          <v-card-text class="black--text ">
            <h3 class="text-center">Non hai ancora un profilo?</h3>
            <router-link to="/registration" id="registerButton" @click="reserve"
              class=" font-semibold whitespace-nowrap  text-blue-700 ">Registrati</router-link>
          </v-card-text>
        </span>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import store from '../store'
import { list } from 'postcss';

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
          this.$router.replace({ name: 'userstats' });
        }


      } catch (error) {
        console.error('Errore durante il login:', error);
        alert('Errore durante il login');
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
