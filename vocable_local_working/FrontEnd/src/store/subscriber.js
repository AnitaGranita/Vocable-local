import store from '@/store';
import axios from 'axios';

store.subscribe((mutation, state) => {
    console.log('Mutation detected:', mutation); // Verifica se la mutazione viene catturata

    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            console.log('Processing SET_TOKEN mutation');
            if (mutation.payload) {
                // Salva il token
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
                localStorage.setItem('Token', mutation.payload);
                console.log('Token saved in localStorage:', mutation.payload);
            } else {
                // Rimuovi il token
                delete axios.defaults.headers.common['Authorization'];
                localStorage.removeItem('Token');
                console.log('Token removed from localStorage');
            }
            break;
            case 'email/SET_EMAIL_ERROR':
                console.log('Email error set:', mutation.payload);
                break;
    
            case 'email/CLEAR_EMAIL_ERROR':
                console.log('Email error cleared');
                break;
    }
});
