<template>
  <div>
      <div>
          <banner/>
          <div class="boardTitle">
            /{{ board }}/ - {{boardInfo[board]}}
          </div>
          <hr class="abovePostLine">
      </div>
      <div class="togglePostFormLink">
        [
          <span class="startThread" @click="emitGlobalClickEvent()">Post a Reply</span>
        ]
      </div>
      <threadComponent v-bind:threadNumber="threadNumber" v-bind:board="board"/>
      <reply-box v-bind:threadNumber="thread.postNumber" v-bind:board="board" ref="replyBox"/>
  </div>
</template>

<script>
import axios from "axios"
import { EventBus } from "../event-bus";

import banner from "../components/banner";

import originalPost from '../components/originalPost'
import threadComponent from '../components/thread.vue'
import replyBox from '../components/replyBox.vue'

export default {
    name: "threadPage",
    components: {
        threadComponent,
        replyBox,
        banner
    },
    data() {
        return {
            "boardInfo": {
                "a": "Anime and Manga",
                "b": "Random"
            },
            thread: {}
        }
    },
    props: ["board", "threadNumber"],
    methods: {
        async getThread() { 
            let res = await axios.get("/api/thread", {
                params: {
                    "threadNumber": this.threadNumber,
                    "board": this.board
                }
            });
            if (res.status === 200){
                this.thread = res.data;
                console.log(this.thread)
            }
        },
        emitGlobalClickEvent(post) {
            console.log("triggrd")
            EventBus.$emit("thread-number-clicked");
        }
    },
    created() {
        this.getThread();
    }
}
</script>

<style>

hr {
    border: none;
    border-top: 1px solid #b7c5d9;
    height: 0;
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
}

.abovePostLine {
    width: 90%;
}

.belowPostLine {
    width: 99%;
}

.togglePostFormLink {
    font-size: 22px;
    font-weight: 700;
    text-align: center;
}

.togglePostFormLink span {
    background: none!important;
    border: none;
    padding: 0!important;
    cursor: pointer;
    color: #34345c;
}

.togglePostFormLink span:hover {
    color: red;
}


</style>