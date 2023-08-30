<template>
    <div @click='player(media._id)' class="media-card">
        <div class="media-icon"><font-awesome-icon style="color: rgba(127, 177, 210, 0.849);" :icon="icon" /></div>
        <div class="media-meta">
            <div class="media-name">{{ media.path.slice(1 + media.path.lastIndexOf('\\'), media.path.length) }}</div>
            <div class="media-size">{{ Math.round(media.size/(1024*1000)) }} MB</div>
            <div class="media-date">{{ new Date(media.time_modified).toLocaleString() }}</div>
        </div>
    </div>
</template>
<script>
export default {
    // data can be accessed by this.$data.<variable> or this.<variable> , it is reactive
    data() {
        return {
         
        }
    },
    props: {
        media: {
        type: Object,
        required: true
        },
        dom_element: {
            type: Object,
            required: true
        },
        icon: String
    },
    methods: {
        player(id){
            // const beat = new Audio('http://' + location.hostname + ':8080/media/' + id)
            // beat.play()
            this.dom_element.src = 'http://' + location.hostname + ':8080/media/' + id;
            console.log(this.dom_element)
        },
        play_next(){
            
        }

    },
    created(){
        // Any code here is run on every instance of MediaCard
    }
}
</script>
<style scoped>

.media-card {
    /* border: solid 1px red; */
    font-family: 'Product Sans';
    display: grid;
    grid-template-columns: 60px auto;
    background-color: rgba(3, 14, 18, 0.586);
    margin: 15px;
    height: 80px;
    border-radius: 10px;
    /* color: rgb(163, 201, 226); */
    border-bottom: 1px solid rgb(26, 29, 32);
}
.media-icon {
    padding: 15px;
    height: 80px;
    border-radius: 10px 0px 0px 10px;
    font-size: 39px;
    /* border: solid 1px red; */
}
.media-meta {
    padding: 10px;
    /* border: solid 1px blue; */
}
.media-name {
    margin-bottom: 10px;
    font-size: 18.7px;
    overflow: hidden;
    height: 25px;
    color: rgb(17, 125, 46)
    /* border: solid 1px green; */
}
.media-size, .media-date {
    display: inline;
    margin-right: 10px;
    color: rgb(72, 119, 148);
}
</style>