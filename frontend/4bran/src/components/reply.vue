<template>
    <div>
      <div class="sideArrows">>></div>
        <div class="reply post" :id="padPostNumber(replyData.postNumber)">
            <div class="postInfo">
                <span class="anonymous">
                    Anonymous
                </span>
                <span v-if="replyData.image !== undefined">File: <a :href="replyData.image.path">Image URL ({{ replyData.image.size.nWidth }}x{{replyData.image.size.nHeight}})</a> </span>
                <span class="postNumber ml-2" @click="emitGlobalClickEvent(replyData.postNumber)">No.{{ padPostNumber(replyData.postNumber) }}</span>
            </div>
            <!-- <img v-if="reply.image !== undefined" v-bind:src="`http://localhost:3000/${reply.image.path}`"/> -->
            <div class="postMessage">
                <imageComponent v-if="replyData.image" :image="replyData.image" class="imageMessage"/>
                <!-- {{ parseContent(replyData.comment) }} -->
                <span v-html="parseContent(replyData.comment)"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "./../event-bus";
import imageComponent from "../components/imageComponent";
export default {
    name: "replyComponent",
    props: ["replyData"],
    components: {
        imageComponent
    },
    methods: {
        padPostNumber(resNumber) {
            let padAmount = 8 - resNumber.toString().length;
            console.log("padding: ", resNumber.toString.length, padAmount);
            let paddedPost = resNumber.toString();
            paddedPost = paddedPost.padStart(padAmount, "0")
            return paddedPost;
        },
        emitGlobalClickEvent() {
            EventBus.$emit("thread-number-clicked", this.padPostNumber(this.replyData.postNumber));
        },
        parseContent(comment) {
            let htmlOutput = "";
            htmlOutput = comment.replace("\n", "<br>").replace(/>>[0-9]{7}/g, (id) => {
                console.log(`<button class="quoteLink">${id}</button>`)
                return `<button class="quoteLink" id="${id.substr(2)}">${id}</button>`;
            })
            return htmlOutput;
        },
        scrollToPost(id) {
            let element = document.getElementById(id);
            element.scrollIntoView();
        }
    },
    mounted(){
        var buttons = document.getElementsByClassName("quoteLink");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
                console.log("Clicked ", this.scrollToPost(buttons[i].id));
            })
        }
        
    }
}
</script>

<style>
.replyTarget {
    background: #d6bad0!important;
    border: 1px solid #ba9dbf!important;
    border-left: none!important;
    border-top: none!important;
    padding: 2px;
}

.quoteLink {
    background: none!important;
    border: none;
    color: #d00!important;
    text-decoration: underline;
    cursor: pointer;
    padding: 0!important;
}

.postInfo {
    text-align: start;
    display: block;
}
.reply {
    display:table;
    border: 1px solid #b7c5d9;
    border-left: none;
    border-top: none;
    display: table;
    padding: 2px;
}

.post {
    margin: 4px 0;
    overflow: hidden;
}

.imageMessage {
    display: block;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 3px;
    margin-bottom: 5px;


}
.postMessage {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
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

.anonymous {
    color: #117743;
}
.threadTitle {
    padding-left: 10px;
    text-align: start;
    display: inline-block;
}


.oldopContainer  {
    margin-top: 5%;
    padding: 5px;
    display: block;
    overflow: hidden;
    background-color: #d6daf0;
    border: 1px solid #b7c5d9!important;
    min-width: 80vw;
}
.sideArrows {
    color: #b7c5d9;
    float: left;
    margin-right: 2px;
    margin-top: 0;
    margin-left: 2px;
}
</style>