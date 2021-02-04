<template>
    <div>
      <div class="sideArrows">>></div>
        <div class="reply post" :id="replyData.postNumber">
            <div class="postInfo">
                <span class="anonymous">
                    Anonymous
                </span>
                <span v-if=" replyData.image !== undefined && replyData.image.type === 'image'">File: <a :href="replyData.image.path">Image URL ({{ replyData.image.size.nWidth }}x{{replyData.image.size.nHeight}})</a></span>
                <span v-else-if="replyData.image !== undefined && replyData.image.type === 'webm'">File: <a :href="replyData.image.path">Image URL (0x0)</a><span v-show="expanded">-[<span class="hoverTag" @click="expand()">Close</span>]</span></span>
                <span class="postNumber ml-2" @click="emitGlobalClickEvent(replyData.postNumber)">No.{{replyData.postNumber}}</span>
            </div>
            <!-- <img v-if="reply.image !== undefined" v-bind:src="`http://localhost:3000/${reply.image.path}`"/> -->
            <div class="postMessage">
                <imageComponent v-if="replyData.image !== undefined && replyData.image.type === 'image'" :image="replyData.image" class="imageMessage"/>
                <!-- {{ parseContent(replyData.comment) }} -->
                <span v-else-if="replyData.image !== undefined && replyData.image.type === 'webm'">
                    <video v-if="!expanded" width="250" height="150" :src="replyData.image.path" class="imageMessage" @click="expand()"/>
                    <video controls width="auto" v-if="expanded">
                        <source width="auto" height="auto" type="video/webm" v-bind:src="replyData.image.path"/>
                    </video>
                </span>
                <span v-html="parseContent(replyData.comment)"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from "./../event-bus";
import imageComponent from "../components/imageComponent";
import ImageComponent from './imageComponent.vue';
export default {
    name: "replyComponent",
    props: ["replyData"],
    components: {
        imageComponent
    },
    data() {
        return {
            "expanded": false
        }
    },
    methods: {
        emitGlobalClickEvent() {
            EventBus.$emit("thread-number-clicked", this.replyData.postNumber);
        },
        parseContent(comment) {
            let htmlOutput = "";
            
            htmlOutput = comment.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\n", "<br>").replaceAll(/&gt;&gt;[0-9]{1,9}/g, (id) => {
                console.log(id.substr(8))
                return `<a class="quoteLink" id="${id.substr(8)}">${id}</a>`;
            }).replace(/\[spoiler\].*\[\/spoiler\]/g, (spoilerText) => {
                spoilerText = spoilerText.replace("[spoiler]", "");
                spoilerText = spoilerText.replace("[/spoiler]", "");
                return `<s>${spoilerText}</s>`;
            })
            let newOutput = [];

            htmlOutput = htmlOutput.split("<br>");
            htmlOutput.forEach((sentence) => {
                if (sentence.split("&gt;").length === 2 && sentence.startsWith("&gt;")){
                    sentence = `<span class="quote">${sentence}</span><br>`;
                    newOutput.push(sentence);
                } else {
                    newOutput.push(`${sentence}<br>`)
                }
            });

            newOutput = newOutput.join("\n");
        
            return newOutput;
        },
        expand() {
            if (this.expanded)
                this.expanded = false
            else
                this.expanded = true
        }
    },
    mounted(){
        var buttons = document.getElementsByClassName('quoteLink');
        for (var i in Object.keys(buttons)) {
            buttons[i].onclick = function () {
                console.log(this.id)
                let id = `${this.id}`
                console.log(id);

                // let element = document.getElementById(id);
                EventBus.$emit("reply-target-clicked", id);
                // element.classList.add("replyTarget")
                // element.scrollIntoView()

            }
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

s, s a:not(:hover) {
    color: #000!important;
    background: #000!important;
    text-decoration: none;
}

s:hover,s:focus,s:hover a {
    color: #fff!important
}

s:hover a {
    text-decoration: underline
}

span.spoiler {
    color: #000!important;
    background: #000!important
}

span.spoiler:hover,span.spoiler:focus {
    color: #fff!important
}

.quote {
    color: #789922;
}

.hoverTag {
    color: #34345c
}

.hoverTag:hover {
    color: red im !important;
    text-decoration: underline;
    cursor: pointer;
}

</style>