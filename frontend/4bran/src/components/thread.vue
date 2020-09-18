<template>
  <div class="content">
      <div class="row">
          <div v-if="!isFetching && thread.content !== undefined" class="opContainer">
            <div class="titleContainer">
                <div>File: <a v-bind:href="thread.image">Image URL ({{ image.nWidth }}x{{image.nHeight}})</a>
                <div class="threadTitle anonymous">
                    Anonymous
                </div>   
                <div class="threadTitle">
                    {{thread.title}}
                </div>    
            </div>
                
            </div>
            <div class="imageContainer">
                <img v-if="!webm" v-bind:width="image.width" v-bind:height="image.height" v-bind:src="thread.image" @click="expandImage"/>
                <video v-else v-bind:width="image.width" v-bind:height="image.height" v-bind:src="thread.image"/>
            </div>
            <div class="threadContent">
                {{thread.content}}
            </div>
            <div class="threadReplies">
                <div  v-for="(reply, index) in thread.replies" :key="index" class="threadReply">

                </div>
            </div>

          </div>
          <div v-else>
          </div>
      </div>
      
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "thread",
    data() {
        return {
            "expanded": false,
            "image": undefined,
            "isFetching": true,
            "thread": {},
            "webm": false,
        }
    },
    methods: {
        getImageSize() {
            let img = new Image();

            img.src = this.thread.image;
            
            var returnValue = {
                "nWidth": img.width,
                "nHeight": img.height
            };

            if (img.width > img.height) {
                let pWidth = 250;
                let percentChange = ((pWidth - img.width) / Math.abs(img.width));
                
                returnValue.pWidth = pWidth;
                returnValue.pHeight = img.height - Math.abs(img.height * percentChange);
                
                returnValue.width = 250;
                returnValue.height = returnValue.pHeight;
            } else {
                let pHeight = 250;
                let percentChange = (pHeight - img.height) / Math.abs(img.height);

                returnValue.pHeight = 250;
                returnValue.pWidth = img.width - Math.abs(img.width * percentChange);
                returnValue.height = 250;
                returnValue.width = returnValue.pWidth;
            }
            return returnValue
        },
        async getThread() {
         await axios.get("http://localhost:3000/api/thread").then(res => {
              this.isFetching = false;
              this.thread.image = `http://localhost:3000/${res.data.image}`;
              this.thread.title = res.data.title;
              this.thread.replies = res.data.replies;
              this.thread.content = res.data.content;
            
            //   if (this.image.endsWith(".webm"))
            //     this.webm = true;

              this.image = this.getImageSize();
         })
        },
        expandImage() {
            if (!this.expanded) {
                this.image.height = this.image.nHeight;
                this.image.width = this.image.nWidth;
                this.expanded = true;
            } else {
                this.image.height = this.image.pHeight;
                this.image.width = this.image.pWidth;
                this.expanded = false;
            }
        },
        getImageType(image) {
            console.log("Here With the Image bud");
            return true;
        }

        // <video src="chrome.webm" type="video/webm">
        //    <p>Your browser does not support the video element.</p>
        // </video>
    },
    created() {
        this.getThread();
    }

}
</script>

<style>
.content {
    margin-right: 12%;
    margin-left: 12%;
}

.opContainer  {
    margin-top: 5%;
    padding: 5px;
    display: block;
    overflow: hidden;
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
}
.titleContainer {
    display: block;
}

.threadTitle {
    padding-left: 10px;
    text-align: start;
    display: inline-block;
}

.threadReply {
    background-color: #d6daf0;
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

.anonymous {
    color: #117743;
}
</style>