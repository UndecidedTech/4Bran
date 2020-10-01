<template>
  <div id="app">
    <navBar></navBar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from "./components/navBar"
export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>

<style>
#app {
  display: block;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #eef2ff;
  font-family: arial, helvetica, sans-serif; font-size: 10pt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  background-color: #eef2ff;
}
</style>
