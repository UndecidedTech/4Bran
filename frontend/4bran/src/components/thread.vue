<template>
  <div class="content">
      <div>
          <div v-if="!isFetching && thread.content !== undefined" class="opContainer">
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
</template>

<script>
import axios from "axios";
import { EventBus } from "../event-bus";
import imageComponent from "../components/imageComponent";
import replyComponent from "../components/reply";
export default {
    name: "thread",
    data() {
        return {
            "image": undefined,
            "isFetching": true,
            "thread": {},
            "webm": false,
        }
    },
    methods: {
        async getThread() {
         await axios.get("http://localhost:3000/api/thread").then(res => {
              this.isFetching = false;
              this.thread.image = res.data.image;
              this.thread.image.path = `http://localhost:3000/${res.data.image.path}`;
              this.thread.title = res.data.title;
              this.thread.replies = res.data.replies;
              this.thread.content = res.data.content;
              this.thread.postNumber = this.padPostNumber(res.data.postNumber);
              
              this.thread.replies.forEach(reply => {
                  if (reply.image)
                    reply.image.path = `http://localhost:3000/${reply.image.path}`;
              });
              console.log("getThread", res.data.postNumber)
            //   if (this.image.endsWith(".webm"))
            //     this.webm = true;

            //   this.image = this.getImageSize();
         })
        },
        getImageType(image) {
            console.log("Here With the Image bud");
            return true;
        },
        padPostNumber(resNumber) {
            let padAmount = 8 - resNumber.toString().length;
            console.log("padding: ", resNumber.toString.length, padAmount);
            let paddedPost = resNumber.toString();
            paddedPost = paddedPost.padStart(padAmount, "0")
            return paddedPost;
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