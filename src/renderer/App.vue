<template>
  <div id="app">
    <stopwatch/>
    <headerItem/>
      <router-view></router-view>
  </div>
</template>

<script>
  import stopwatch from './components/stopwatch'
  import headerItem from './components/header'
  export default {
    name: 'study-support',
    components: {
      stopwatch,
      headerItem
    }
  }
</script>

<style>
  /* CSS */
</style>
