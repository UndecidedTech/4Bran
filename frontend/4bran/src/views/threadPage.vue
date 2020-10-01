<template>
  <div>
      <originalPost/>
      <thread/>
      <reply-box ref="replyBox"/>
  </div>
</template>

<script>
import originalPost from '../components/originalPost'
import thread from '../components/thread.vue'
import replyBox from '../components/replyBox.vue'

export default {
    name: "threadPage",
    components: {
        originalPost,
        thread,
        replyBox
    },
    props: ["board", "threadNumber"]
}
</script>

<style>

</style>