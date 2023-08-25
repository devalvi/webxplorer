import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faClapperboard, faCompactDisc, faFileAudio, faFileLines, faFilePdf, faFileVideo, faFileWord, faFilter, faHeadphonesSimple, faMagnifyingGlass, faMusic, faSliders, faVideo } from '@fortawesome/free-solid-svg-icons'

library.add(faBars ,faCompactDisc ,faMagnifyingGlass ,faHeadphonesSimple, faMusic, faSliders, faVideo, faClapperboard, faFileVideo, faFileAudio, faFileWord, faFilePdf, faFilter, faFileLines)


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
