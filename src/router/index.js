import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Question from '@/components/Question'
import Medicine from '@/components/Medicine'
import Homeadmin from '@/components/Homeadmin'
import ManageDoctor from '@/components/ManageDoctor'
import Manage from '@/components/Manage'
import Editprofile from '@/components/Editprofile'
import news from '@/components/news'
import ManagePharmacist from '@/components/ManagePharmacist'
import ManageOption from '@/components/ManageOption'
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
      path: '/ManageDoctor',
      name: 'ManageDoctor',
      component: ManageDoctor
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/Editprofile',
      name: 'Editprofile',
      component: Editprofile
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/ManagePharmacist',
      name: 'ManagePharmacist',
      component: ManagePharmacist
    },
    {
      path: '/ManageOption',
      name: 'ManageOption',
      component: ManageOption
    }
  ]
})
