<template>
  <head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet" />
  </head>
  <div class="wrapper">
    <nav class="border-blue-custom bg-indigo-accent-3 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
      <!--logo con scritta di fianco-->
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logoVuoto.png" class="h-8" alt="Vocable Logo" />
          <span class="self-center text-2xl font-extrabold whitespace-nowrap text-white">Vocable</span>
        </router-link>

        <!--hamburger menu-->
        <button data-collapse-toggle="navbar-solid-bg" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <!--menu in-line-->
        <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul
            class="flex flex-col font-medium mt-2 text-lg rounded-lg bg-blue-400 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <router-link to="/" v-ripple
                :class="{'font-semibold': isActive('/')}"
                class="block py-2 px-3 md:p-0 text-white rounded hover:bg-blue-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/gameplay" v-ripple
                :class="{'font-semibold': isActive('/gameplay')}"
                class="block py-2 px-3 md:p-0 text-white rounded hover:bg-blue-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Gioca</router-link>
            </li>
            <li>
              <router-link to="/about" v-ripple
                :class="{'font-semibold': isActive('/about')}"
                class="block py-2 px-3 md:p-0 text-white rounded hover:bg-blue-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About
                Us</router-link>
            </li>
            <template v-if="authenticated">
              <li>
                <router-link to="/user-stats" v-ripple
                  :class="{'font-semibold': isActive('/user-stats')}"
                  class="block py-2 px-3 md:p-0 text-white rounded hover:bg-blue-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Statistiche</router-link>
              </li>
              <li>
                <a href="#" @click.prevent="signOut" class="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
              </li>
            </template>
            <template v-else>
              <li>
                <router-link to="/login" v-ripple
                  :class="{'font-semibold': isActive('/login')}"
                  class="block py-2 px-3 md:p-0 text-white rounded hover:bg-blue-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 dark:text-white md:dark:hover:text-blue-300 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Accedi</router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>


<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { initFlowbite } from 'flowbite'

// Inizializza store e router
const store = useStore()
const router = useRouter()
const route = useRoute()

// Computed per verificare se l'utente è autenticato e ottenere i dati dell'utente
const authenticated = computed(() => store.getters['auth/authenticated'])
const user = computed(() => store.getters['auth/user'])

// Funzione per la disconnessione dell'utente
async function signOut() {
  await store.dispatch('auth/signOut')
  router.replace({ name: 'home' }) 
}

// Funzione per controllare se la route è attiva
const isActive = (path) => {
  return route.path === path
}

// Inizializza Flowbite quando il componente è montato
onMounted(() => {
  initFlowbite()
})

</script>