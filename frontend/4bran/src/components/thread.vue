<template>
<div>
  <div class="content">
      <div>
          <div v-if="thread.content !== undefined" class="opContainer">
            <div class="titleContainer">
                <div class="threadTitle subject">
                    {{thread.title}}
                </div>    
                <div class="threadTitle">File: <a v-bind:href="thread.image.path">Image URL ({{ thread.image.size.nWidth }}x{{thread.image.size.nHeight}})</a>
                <div class="threadTitle anonymous">
                    Anonymous
                </div>
                <button class="threadTitle postNumber ml-2" @click="emitGlobalClickEvent()"> 
                    No. {{thread.postNumber}}
                </button>
            </div>
            </div>
            <div class="imageContainer">
                <imageComponent v-bind:image="thread.image"/>
                <!-- <video v-else v-bind:width="image.width" v-bind:height="image.height" v-bind:src="thread.image"/> -->
            </div>
            <div class="threadContent postMessage">
                {{thread.content}}
            </div>
            <div  v-for="(reply, index) in thread.replies" :key="index" class="threadReplies">
                <replyComponent :replyData="reply"/>
            </div>
            </div>
          <div v-else>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../event-bus";
import imageComponent from "../components/imageComponent";
import replyComponent from "../components/reply";
export default {
    name: "threadComponent",
    props: ["threadNumber", "board"],
    data() {
        return {
            "image": undefined,
            "isFetching": true,
            "webm": false,
            "thread": {}
        }
    },
    methods: {
        async getThread() {
            console.log("HAHAHA", this.board, this.threadNumber) 
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
        emitGlobalClickEvent() {
            EventBus.$emit("thread-number-clicked", this.thread.postNumber);
        }

        // <video src="chrome.webm" type="video/webm">
        //    <p>Your browser does not support the video element.</p>
        // </video>
    },
    created() {
        this.getThread();
    },
    components: {
        imageComponent,
        replyComponent
    }

}
</script>

<style>
.opContainer  {
    padding: 5px;
    display: inline;
    overflow: hidden;
}

.post {
    margin: 4px 0;
    overflow: hidden;
}


.threadContent {
    font-size: 12pt;
    text-align:start;
    display: inline;
    overflow: hidden;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 20px;
    margin-inline-end: 20px;
}
.imageContainer {
    float: left;
    display: block;
    margin-left: 20px;
    margin-right: 20px;

}
.titleContainer {
    display: block;
}

.threadTitle {
    padding-left: 10px;
    text-align: start;
    display: inline-block;
}

.post {
    margin: 4px 0;
    overflow: hidden;
}

.anonymous {
    color: #117743;
}

.postNumber {
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/
  /*input has OS specific font-family*/
  cursor: pointer;
}

.postNumber:hover {
  color: red;
}
.postMessage {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
}

.subject {
    color: #0f0c5d;
    font-weight: 700;
}

</style>