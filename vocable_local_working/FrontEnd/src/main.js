// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import './store/subscriber';

import '../node_modules/flowbite-vue/dist/index.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

// Configura la promessa per il recupero del token e il tentativo di autenticazione
const initializeAuth = async () => {
    const token = localStorage.getItem('Token');
    if (token) {
        try {
            await store.dispatch('auth/attempt', token);
        } catch (error) {
            console.error('Autenticazione fallita:', error);
        }
    }
};

// Inizializza l'autenticazione prima di montare l'app
initializeAuth().then(() => {
    app.use(store);
    app.use(router);
    app.use(vuetify);
    app.use(axios);
    app.mount('#app');
});
