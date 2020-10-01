<template>
<div>
    <div>
      <banner/>
      <div class="boardTitle">
        /{{ board }}/ - {{boardInfo[board]}}
      </div>
      <hr class="abovePostLine">
      <div class="togglePostFormLink" v-if="!threadPrompt">
        [
          <span class="startThread" @click="openThread">Start a New Thread</span>
        ]
      </div>
      <div v-if="threadPrompt">
          <div class="row mt-2 justify-content-center">
            <span class="mr-2 thread-label" for="uploadTitle">Title</span>
            <input v-model="title" class="col-5" type="text" id="uploadTitle"/>
          </div>
          <div class="row mt-2 mb-2 justify-content-center">
            <span class="mr-2 thread-label">Description</span>
            <textarea v-model="content" class="col-5" type="text" rows="8" cols="48" wrap="soft" tabindex="4"/>    
          </div>
          <div class="row justify-content-center">
            <span class="mr-2 thread-label">File</span>
            <div class="col-3">
                <input class="" @change="onFileSelected" type="file" id="uploadImage"/>
            </div>
            <div class="col-2 text-center">
                <button type="submit" @click="onUpload">Post</button>
            </div>
          </div>
      </div>
      <hr class="belowPostLine">
    </div>
    <div class="content">
    <div class="threadsList extended-small">
      <div class="thread" v-for="(thread, index) in threadList" :key="index">
          <img class="thumb" :width="thread.image.size.width" :height="thread.image.size.height" :src="thread.image.path"/>
          <div class="meta">R: <b>0</b> / I: <b>0</b></div>
          <div class="teaser">
              <b>{{thread.title}}</b>: {{thread.content}}
          </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from "axios"
import banner from "../components/banner"
export default {
    name: "catalogPage",
    props: ["board"],
    components: {
        banner
    },
    data() {
        return {
            "boardInfo": {
                "a": "Anime and Manga",
                "b": "Random"
            },
            "threadPrompt": false,
            "title": "",
            "content": "",
            "image": undefined,
            "threadList": []
        }
    },
    methods: {
        openThread() {
            this.threadPrompt = true;
        },
        onFileSelected(event) {
        console.log(event.target.files[0]);
        this.image = event.target.files[0];
        },
        async onUpload() {
        const fd = new FormData();
        fd.append("image", this.image, this.image.name);
        fd.append("title", this.title);
        fd.append("content", this.content);
        fd.append("board", this.board);

        console.log(fd);
        await axios.post("/api/thread", fd)
          .then(res => {
            console.log(res)
            location.reload();
          })
       },
       async loadBoard() {
        //    this.threadList = await axios.get(`/api/board/${this.board}`).data
        let res = await axios.get(`/api/board/${this.board}`);

        if (res.status === 200) {
            this.threadList = res.data.threads

            this.threadList.forEach((thread) => {
                if (window.location.origin === "http://localhost:8080")
                    thread.image.path = `http://localhost:3000/${thread.image.path}`;
                else
                    thread.image.path = `${window.location.origin}/${thread.image.path}`;
                console.log(thread.image)
            })
        }
       }
    },
    mounted() {
        this.loadBoard()
    }
}
</script>

<style>
.content {
    text-align: center;
}
.meta {
    cursor: help;
    font-size: 11px;
    line-height: 8px;
    margin-top: 2px;
    margin-bottom: 1px;
}
.thumb {
    margin: auto;
    z-index: 2;
    box-shadow: 0 0 5px rgba(0,0,0,.25);
    min-height: 50px;
    min-width: 50px;
}

.teaser {
    padding: 0 15px;
}

.threadList {
    padding: 20px 0;
    text-align: center;
}

.extended-small .thread {
    width: 180px;
    max-height: 320px;
}

.thread {
    vertical-align: top;
    display: inline-block;
    word-wrap: break-word;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 20px;
    padding: 5px 0 3px;
    position: relative;
}

.thread-label {
  text-align: left;
  background-color: #98e;
  padding-left: 2%;
  padding-right: 2%;
  display: block;
  max-height: 100%;
  border: 1px solid #000;
  width: 130px;

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
.threadContent {
    padding: 20px 0;
    text-align: center;
}

.boardTitle {
    font-family: Tahoma,sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-top: 0;
    text-align: center;
    color: #af0a0f;

}

.centerImage {
    max-width: 100%;
    overflow: hidden;
    margin: auto;
}
</style>