import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Gameplay from '../views/Gameplay.vue'
import UserStats from '../views/UserStats.vue'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import RegistrationComplete from '@/views/RegistrationComplete.vue'
import store from '@/store'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue';
import EmailSent from '@/views/EmailSent.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/about', component: About, name: 'about' },
  { path: '/gameplay', component: Gameplay, name: 'gameplay' },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/user-stats', component: UserStats, name: 'userstats',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  { path: '/registration', component: Registration, name: 'registration' },
  { path: '/registrationcomplete', component: RegistrationComplete, name: 'registrationcomplete' },
  { path: '/forgot-password', component: ForgotPassword, name: 'forgotpassword' },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
    props: true 
  },
  { path: '/resetpsw-emailsent', component: EmailSent, name: 'email-sent' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
