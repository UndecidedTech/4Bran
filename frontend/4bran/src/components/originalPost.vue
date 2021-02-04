<template>
<div class="container pt-5">
  <div class="d-flex justify-content-center">
    <button id="newThread" type="button" data-target="#formContainer" data-toggle="collapse" aria-expanded="false" aria-controls="formContainer">[ New Thread ]</button>
  </div>
  <div>
      <div id="formContainer" class="collapse">
          <div class="row mt-2 justify-content-center">
            <span class="mr-2 thread-label" for="uploadTitle">Title</span>
            <input v-model="title" class="col-5" type="text" id="uploadTitle"/>
          </div>
          <div class="row mt-2 mb-2 justify-content-center">
            <span class="mr-2 thread-label">Description</span>
            <textarea v-model="content" class="col-5" type="text" rows="" id="uploadContent"/>    
          </div>
          <div class="row justify-content-center">
            <span class="mr-2 thread-label">File</span>
            <div class="col-3">
                <input class="" @change="onFileSelected" type="file" id="uploadImage"/>
            </div>
            <div class="col-2">
                <button class="ml-auto" type="submit" @click="onUpload">Post</button>
            </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import axios from "axios"
export default {
  name: 'originalPost',
  data() {
    return {
      "image": undefined,
      "open": true,
      "title": "",
      "content": ""
    }
  },
  methods: {
      onFileSelected(event) {
        this.image = event.target.files[0];
      },
      async onUpload() {
        const fd = new FormData();
        fd.append("image", this.image, this.image.name);
        fd.append("title", this.title);
        fd.append("content", this.content);

        await axios.post("/api/upload", fd)
          .then(res => {
            location.reload();
          })
       },
       disableButton(){
         document.getElementById("newThread").disabled = true;
       },
       async getThread() {
         await axios.get("/api/thread").then(res => {
           if (res.data.image !== undefined) {
              this.disableButton();
           }
         })
       }
  },
  mounted() {
    this.getThread();
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thread-label {
  text-align: left;
  background-color: #98e;
  padding-left: 2%;
  padding-right: 2%;
  display: block;
  max-height: 25px;
  border: 1px solid #000;
  min-width: 130px;

}
</style>
