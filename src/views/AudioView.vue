<script>
import MediaCard from '../components/MediaCard.vue';

export default {
  data(){
    return {
      audio_element: null,
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
    const audio_el = document.getElementById('audio-main');
    this.audio_element = audio_el
    audio_el.ontimeupdate = function(){
      console.log(audio_el.currentTime)
    }
  }
  ,
  async beforeMount() {
    this.files = await this.fetchMedia('audio')
  }
}
</script>
<template>
        <div v-for="audiofile in files" :key="audiofile._id">
            <MediaCard :media="audiofile" :dom_element="audio_element" icon="compact-disc"/>
        </div>
        <div class="now-playing">
          <!-- has play, pause, next and back and seeking bar-->
          <!-- click mediaCard => change audio.src -->
          <audio id='audio-main' controls autoplay>
              <source src="" type="audio/mpeg">
          </audio>
          <div class="seeking-bar">
            <input type="range" name="seek" id="seek">
          </div>
        </div>
</template>
<style scoped>
.now-playing {
  position: fixed;
  bottom: 0px;
}
#seek {
  width: 96vw;
}
</style>