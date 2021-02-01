<template>
  <div class="content">
            <div class="titleContainer">
                 <div class="threadTitle">File: <a v-bind:href="thread.image.path"> Image URL ({{ thread.image.size.nWidth }}x{{thread.image.size.nHeight}})</a>
            </div>

            </div>    
            <div class="imageContainer">
                <imageComponent v-if="!thread.image.webm" v-bind:image="thread.image"/>
                <video v-else v-bind:width="image.width" v-bind:height="image.height" v-bind:src="thread.image"/>
            </div>
            
           <div class="opInfo"> 
                 <span class="threadTitle subject">
                    {{thread.title}}
                 </span>

                <span class="threadTitle anonymous">
                    Anonymous
                </span>
                <button class="threadTitle postNumber ml-2" @click="emitGlobalClickEvent()"> 
                    No. {{thread.postNumber}}
                </button>

                </div>


            <div class="threadContent postMessage">
                {{thread.content}}
            </div>
            <div  v-for="(reply, index) in thread.replies" :key="index" class="threadReplies">
                <replyComponent :replyData="reply"/>
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
                console.log("ORIGIN: ", window.location.origin);
                console.log("THREAD OBJECT: ", this.thread)

                if (window.location.origin === "http://localhost:8080")
                    this.thread.image.path = `http://localhost:3000/${this.thread.image.path}`;
                else
                    this.thread.image.path = `${window.location.origin}/${this.thread.image.path}`;

            
                this.thread.replies.map((reply) => {
                    if (reply.image) {
                        if (window.location.origin === "http://localhost:8080")
                            reply.image.path = `http://localhost:3000/${reply.image.path}`
                        else
                            reply.image.path = `${window.location.origin}/${reply.image.path}`
                    }
                })
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


.post {
    margin: 4px 0;
    overflow: hidden;
}


.threadContent {
    text-align:start;
    display: inline;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    padding: 0px;
}
.imageContainer {
    float: left;
    display: block;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 3px;
    margin-bottom: 3px;

}

.opInfo {
    display: block;
}

.titleContainer {
    display: block;
}

.threadTitle {
    padding-left: 0px;
    text-align: start;
    display: inline;
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
  display: inline;
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