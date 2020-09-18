<template>
  <div id="quickReply" class="extPanel reply">
      <div id="qrHeader" class="drag postblock">Reply to Thread No.<span id="qrTid">{{ postNumber }}</span><img alt="X"
              src="//s.4cdn.org/image/buttons/burichan/cross.png" id="qrClose" class="extButton" @click="makeVisible()" title="Close Window">
      </div>
      <form name="qrPost" action="https://sys.4channel.org/wsg/post" method="post" enctype="multipart/form-data"><input
              type="hidden" name="MAX_FILE_SIZE"><input type="hidden" value="regist" name="mode"><input
              id="qrResto" type="hidden" name="resto">
          <div id="qrForm">
              <div><textarea v-model="comment" name="com" cols="48" rows="4" wrap="soft" tabindex="0" placeholder="Comment"></textarea>
              </div>
              <div>
                  <form enctype="multipart/form-data">
                    <input class="" @change="onFileSelected" type="file" id="uploadImage"/>
                    <button class="ml-auto" type="submit" @click="sendReply">Submit</button>
                  </form>
                </div>
          </div>
      </form>
      <div id="qrError"></div>
  </div>
</template>

<script>
export default {
    name: "replyBox",
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
        makeVisible() {
            const replyDiv = $("#quickReply");

            if (replyDiv.hasClass("d-none"))
                replyDiv.removeClass("d-none");
            else
                replyDiv.addClass("d-none");

            
            if (this.open === true)
                replyDiv.addClass("d-none");
        },
        onFileSelected(event) {
            console.log(event.target.files[0]);
            this.image = event.target.files[0];
        },
         async getThread() {
         await axios.get("http://localhost:3000/api/thread").then(res => {
           if (res.data.image !== undefined) {
              this.makeVisible();
           }
         })
       },
       async sendReply() {
            const fd = new FormData();
            fd.append("image", this.image, this.image.name);
            fd.append("comment", this.comment);
            await axios.post("http://localhost:3000/api/reply", fd)
            .then(res => {
                console.log(res)
                location.reload();
            })
       }
    },
    mounted() {
        this.makeDraggable();
        this.getThread();
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
}

</style>