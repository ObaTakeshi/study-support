<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'study-support'
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
