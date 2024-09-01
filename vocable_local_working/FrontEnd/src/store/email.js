import axios from 'axios';

export default {
    namespaced: true,
    state: {
        emailError: null,
    },
    mutations: {
        SET_EMAIL_ERROR(state, errorMessage) {
            console.log('Mutazione SET_EMAIL_ERROR chiamata con:', errorMessage);
            state.emailError = errorMessage;
        },
        CLEAR_EMAIL_ERROR(state) {
            console.log('Mutazione CLEAR_EMAIL_ERROR chiamata');
            state.emailError = null;
        }
    },
    getters: {
        emailError(state) {
            return state.emailError;
        }
    },
    actions: {
        async register({ commit }, credentials) {
            try {
                // Effettua la chiamata al server per la registrazione dell'utente
                let response = await axios.post('/api/utente/create', credentials);
                
                // Gestisci la risposta del server
                if (response.data.status) {
                    // Registrazione avvenuta con successo
                    console.log('Registrazione avvenuta con successo:', response.data);
                    // Puoi anche considerare di reimpostare l'errore se la registrazione ha successo
                    commit('CLEAR_EMAIL_ERROR');
                    return response;
                } else {
                    // Gestisci l'errore specifico dal server
                    console.log('Errore di registrazione:', response.data.message);
                    if (response.data.message === 'Email già in uso') {
                        commit('SET_EMAIL_ERROR', 'Email già in uso');
                    } else {
                        commit('SET_EMAIL_ERROR', 'Errore durante la registrazione');
                    }
                }
            } catch (error) {
                console.error('Errore durante la registrazione:', error);
                // Gestisci gli errori della rete o imprevisti
                commit('SET_EMAIL_ERROR', 'Errore durante la registrazione');
            }
        },
        setEmailError({ commit }, errorMessage) {
            console.log('Azione setEmailError chiamata con messaggio:', errorMessage);
            commit('SET_EMAIL_ERROR', errorMessage);
        },
        clearEmailError({ commit }) {
            console.log('Azione clearEmailError chiamata');
            commit('CLEAR_EMAIL_ERROR');
        }
    }
};
