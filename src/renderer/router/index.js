import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'study-support',
      component: require('@/components/login').default
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
      path: '/markdownEditor',
      name: 'markdownEditor',
      component: require('@/components/markdownEditor').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/signup',
      name: 'signup',
      component: require('@/components/signup').default
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/components/main').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
