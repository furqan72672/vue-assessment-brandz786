import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Manage from "@/views/Manage";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/auth/register',
    name: 'register',
    component: Register
  },
  {
    path: '/todo',
    name: 'manage',
    component: Manage,
    children:[
      {
        //route for create todo
        path:'/',
        component: Manage,
      },
      {
        //route for edit todo
        path:':id',
        component: Manage,
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//per route guard to check users login situation and maintain session
router.beforeEach((to,from,next)=>{
  if(!localStorage.getItem('token')&&!to.fullPath.includes('/auth')) router.push('/auth/login').then()
  next()
})

export default router
