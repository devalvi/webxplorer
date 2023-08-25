<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <!-- <nav>
        <RouterLink to="/audio">Audio</RouterLink>
        <RouterLink to="/video">Video</RouterLink>
        <RouterLink to="/document">Document</RouterLink>
      </nav> -->
      <div class="header-left">
        <router-link to="/audio">
          <div class="audio">&nbsp;Music &nbsp;<font-awesome-icon style="color: rgb(127, 177, 210);" icon="headphones-simple" />&nbsp;</div>
        </router-link>
        <router-link to="/video">
          <div class="video">&nbsp;Videos &nbsp;<font-awesome-icon style="color: rgb(127, 177, 210);" icon="clapperboard" />&nbsp;</div>
        </router-link>
        <router-link to="/document">
          <div class="document">&nbsp;Docs &nbsp;<font-awesome-icon style="color: rgb(127, 177, 210);" icon="file-pdf" />&nbsp;</div>
        </router-link>
      </div>
      <div class="header-right">
        <div class="search"><font-awesome-icon style="color: rgb(127, 177, 210);" icon="magnifying-glass" /></div>
        <div class="sort"><font-awesome-icon style="color: rgb(127, 177, 210);" icon="sliders" /></div>
      </div>
  </header>
  <RouterView />  <!-- enabling this shows root router -->
</template>
<style scoped>
a {
  text-decoration: none;
  color: rgb(48, 190, 70);
 }
header {
  padding: 20px;
  display: flex;
  width: 100%;
  font-size: 18.8px;
}
.header-left, .header-right {
  display: flex;
}
.search,  .sort {
  padding: 5px;
  margin: 7px;
}
.header-left > * {
  padding: 2.5px 5px 2.5px 5px;
  margin: 7px;
  border: solid 2px rgb(98, 147, 106);
  border-radius: 7px;

}
.header-right {
  position: absolute;
  right: 1px;
  }
</style>
