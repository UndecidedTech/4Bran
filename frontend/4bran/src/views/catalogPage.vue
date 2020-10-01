<template>
<div>
    <div>
        <div class="boardBanner">
            <img class="centerImage" src="/image/4bran.jpg"/>
        </div> 
      <div class="boardTitle">
        /{{ board }}/ - {{boardInfo[board]}}
      </div>
    </div>
 
    <div class="threadContent">
      <!-- <div v-for="(thread, index) in threads" :key="index">
          <img :src=""/>
      </div> -->
    </div>
</div>
</template>

<script>
export default {
    name: "catalogPage",
    props: ["board"],
    data() {
        return {
            boardInfo: {
                "a": "Anime and Manga",
                "b": "Random"
            }
        }
    },
    methods: {
        
    },
    mounted() {
        console.log("BRAN IS ONLINE")
    }
}
</script>

<style>
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