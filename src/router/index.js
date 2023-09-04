import Vue from 'vue'
import VueRouter from 'vue-router'
import ListRestaurant from '@/components/ListRestaurant'
import Restaurant from '@/components/Restaurant'
import SearchRestaurant from '@/components/SearchRestaurant'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ListRestaurant',
      component: ListRestaurant
    },
    {
      path: '/restaurant/:id',
      name: 'Restaurant',
      props: true,
      component: Restaurant
    },
    {
      path: '/search/:name',
      name: 'SearchRestaurant',
      props: true,
      component: SearchRestaurant
    }
  ],
  mode: 'history'
})
