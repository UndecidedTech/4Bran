<template>
    <div v-if="bannerData" class="text-center">
        <router-link :to="`/${bannerData.board}/catalog`">
        <img :src="`${bannerData.path}`"/>
        </router-link>
    </div> 
</template>

<script>
import axios from "axios"
export default {
    name: "boardbanner",
    props: ["boardName"],
    data() {
        return {
            bannerData: undefined
        }
    },
    methods: {
        async getBanner() {
            let res = await axios.get("/api/banner", {
                "board": this.boardName
            })
            console.log(res);
            if (res.status === 200) {
                this.bannerData = res.data;

                if (window.location.origin === "http://localhost:8080") {
                    this.bannerData.path = `http://localhost:3000/${this.bannerData.path}`
                } else {
                    this.bannerData.path = `${window.location.origin}/${this.bannerData.path}`
                }
            }
        }
    },
    created() {
        this.getBanner();
    }
}
</script>

<style>

</style>



    
          