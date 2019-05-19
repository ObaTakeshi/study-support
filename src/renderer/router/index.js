import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'study-support',
      component: require('@/components/taskList').default
    },
    {
      path: '/taskList',
      name: 'taskList',
      component: require('@/components/taskList').default
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: require('@/components/calendar').default
    },
    {
      path: '/newEvent',
      name: 'newEvent',
      component: require('@/components/newEvent').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
