<template>
  <div id="app">
    <originalPost/>
    <thread/>
    <reply-box/>
  </div>
</template>

<script>
import originalPost from './components/originalPost.vue'
import thread from './components/thread.vue'
import replyBox from './components/replyBox.vue'
export default {
  name: 'App',
  components: {
    originalPost,
    thread,
    replyBox
  }
}
</script>

<style>
#app {
  background-color: #eef2ff;
  font-family: arial,helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  background-color: #eef2ff;
}
</style>
