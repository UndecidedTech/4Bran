<template>
  <div>
    <img :width="newImage.width" :height="newImage.height" :src="image.path" @click="expandImage"/>
  </div>
</template>

<script>
export default {
    name: "imageComponent",
    props: ["image"],
    data() {
        return {
            newImage: {
                width: 0,
                height: 0
            },
            expanded: false
        }
    },
    methods: {
        expandImage() {
            if (!this.expanded) {
                this.newImage.width = this.image.size.nWidth;
                this.newImage.height = this.image.size.nHeight;
                this.expanded = true;
            } else {
                this.newImage.width = this.image.size.pWidth;
                this.newImage.height = this.image.size.pHeight;
                this.expanded = false;
            }
        }
    },
    created() {
        this.newImage.height = this.image.size.height;
        this.newImage.width = this.image.size.width;
    }
}
</script>

<style>

</style>