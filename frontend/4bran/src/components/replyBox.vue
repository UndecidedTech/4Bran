<template>
  <div v-if="open" id="quickReply" class="extPanel reply d-none">
      <div id="qrHeader" class="drag postblock">Reply to Thread No.<span id="qrTid">{{threadNumber}}</span><img alt="X"
              src="http://localhost:3000/image/cross.png" id="qrClose" class="extButton" @click="hide()" title="Close Window">
      </div>
          <div id="qrForm">
              <div><textarea v-model="comment" name="com" cols="48" rows="4" wrap="soft" tabindex="0" placeholder="Comment"></textarea>
              </div>
              <div>
                  <form enctype="multipart/form-data">
                    <input class="" @change="onFileSelected" type="file" id="uploadReplyImage"/>
                    <button class="ml-auto" type="submit" @click="sendReply()">Submit</button>
                  </form>
            </div>
          </div>
      <div id="qrError"></div>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "./../event-bus";

export default {
    name: "replyBox",
    props: ["threadNumber", "board"],
    data() {
      return {
        "image": undefined,
        "comment": "",
        "open": true,
        }
    },    
    methods: {
        makeDraggable() {
            const replyDiv = $("#quickReply");
            replyDiv.draggable();
        },
        toggleVisibility(){
            const replyDiv = $("#quickReply");

            if (replyDiv.hasClass("d-none"))
                replyDiv.removeClass("d-none");
            else
                replyDiv.addClass("d-none")
        },
        makeVisible() {
            const replyDiv = $("#quickReply");

            if (replyDiv.hasClass("d-none"))
                replyDiv.removeClass("d-none");          
        },
        hide() {
            this.comment = "";
            const replyDiv = $("#quickReply");
            if (!replyDiv.hasClass("d-none"))
                replyDiv.addClass("d-none")
        },
        addComment(id) {
            this.comment = this.comment.concat(`>>${id} \n`);
        },
        onFileSelected(event) {
            console.log(event.target.files[0]);
            this.image = event.target.files[0];
        },
       async sendReply() {
            const fd = new FormData();
            if (this.image !== undefined) {
                fd.append("image", this.image, this.image.name);
            }
            fd.append("comment", this.comment);
            fd.append("board", this.board)
            fd.append("threadNumber", this.threadNumber)
            let res = await axios.post("/api/thread/reply", fd)
            if (res.status === 200) {
                window.location.reload();
            }
       }
    },
    mounted() {
        this.makeDraggable();
        // this.getThread();
        console.log("board", this.board)
        EventBus.$on("thread-number-clicked", (thread) => {
            this.makeVisible();
            if (thread !== undefined)
                this.addComment(thread);
        })
    }
}
</script>

<style>
#quickReply {
    display: block;
    position: fixed;
    padding: 2px;
    font-size: 10pt;
}

.reply {
    background-color: #d6daf0;
    border: 1px solid #b7c5d9;
    border-left: none;
    border-top: none;
    display: table;
    padding: 2px;
    position: static;
    top: 26.705%;
    left: 62.5247%;
}

.extButton {
    cursor: pointer;
    margin-left: 53%;
}
</style>