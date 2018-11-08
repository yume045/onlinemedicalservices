import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Question from '@/components/Question'
import Medicine from '@/components/Medicine'
import Homeadmin from '@/components/Homeadmin'
import Menateusers from '@/components/Menateusers'
import ManageDoctor from '@/components/ManageDoctor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Question',
      name: 'Question',
      component: Question
    },
    {
      path: '/Medicine',
      name: 'Medicine',
      component: Medicine
    },
    {
      path: '/Homeadmin',
      name: 'Homeadmin',
      component: Homeadmin
    },
    {
      path: '/Menateusers',
      name: 'Menateusers',
      component: Menateusers
    },
    {
      path: '/ManageDoctor',
      name: 'ManageDoctor',
      component: ManageDoctor
    }
  ]
})
