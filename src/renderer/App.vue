<template>
  <div id="app">
    <div class="top">
      <stopwatch/>
      <headerItem/>
    </div>
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
  ::-webkit-scrollbar {
    display: none;
  }

  .top {
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 24;
  }
</style>
