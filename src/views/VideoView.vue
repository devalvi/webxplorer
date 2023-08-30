<script>
import MediaCard from '../components/MediaCard.vue';

export default {
  data(){
    return {
      video_element: null,
      files: null
    }
  },
  methods: {
    async fetchMedia(type, page){
      try {
        const response = await fetch('http://' + location.hostname +':8080/' + type)
        const data = await response.json(response);
        return data.results;
      }
      catch(error){
        console.log(error)
      }
    }
  },
  mounted() {
    this.video_element = document.getElementById('video-main')
  }
  ,
  async beforeMount() {
    this.files = await this.fetchMedia('video')
  }
}
</script>
<template>
        <div v-for="videofile in files" :key="videofile._id">
            <MediaCard :media="videofile" :dom_element="video_element" icon="file-video"/>
        </div>
        <div class="now-playing">
          <!-- has play, pause, next and back and seeking bar-->
          <!-- click mediaCard => change video.src -->
          <video id='video-main' controls autoplay>
              <source src="" type="video/mp4">
          </video>
          <div class="seeking-bar">
            <input type="range" name="seek" id="seek">
          </div>
        </div>
</template>
<style scoped>
.now-playing {
    padding: 0px;
    margin: 0px;
}
video {
    scale: 1.03;
    width: 98vw;
    height: 40vh;
    position: fixed;
    top: -75px;
}
#seek {
  width: 96vw;
  height: 50vh;
}
</style>