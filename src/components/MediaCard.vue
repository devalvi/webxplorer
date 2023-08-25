<template>
    <div class="media-card">
        <div class="media-icon"><font-awesome-icon style="color: rgb(127, 177, 210);" icon="compact-disc" /></div>
        <div class="media-meta">
            <div class="media-name">{{ media.name }}</div>
            <div class="media-size">{{ media.size }}</div>
            <div class="media-date">{{ media.date }}</div>
        </div>
        <div class="media-actions"><font-awesome-icon style="color: rgb(127, 177, 210);" icon="bars" /></div>
    </div>
    <br/>
</template>
<script setup>
defineProps({
  media: {
    type: Object,
    required: true
  }
})
</script>
<style scoped>

.media-card {
    /* border: solid 1px red; */
    font-family: 'Product Sans';
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: rgb(1, 14, 7);
    margin: 15px;
    height: 80px;
    border-radius: 10px;
    color: rgb(163, 201, 226);
    border-bottom: 1px solid rgb(163, 201, 226);
}
.media-icon {
    padding: 15px;
    height: 80px;
    width: 70px;
    border-radius: 10px 0px 0px 10px;
    font-size: 39px;
}
.media-meta {
    margin: 10px;
    /* border: solid 1px blue; */
}
.media-name {
    margin-bottom: 10px;
    font-size: 18.7px;
    overflow: hidden;
    height: 25px;
    color: rgb(31, 180, 71)
    /* border: solid 1px green; */
}
.media-size, .media-date {
    display: inline;
    margin-right: 10px;
    color: rgb(153, 172, 184);
}
.media-actions {
    /* border: solid 1px peachpuff; */
    width: 70px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>