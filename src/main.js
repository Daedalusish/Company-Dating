import Vue from 'vue'
import App from './App.vue'
import VuePapaParse from 'vue-papa-parse'
import VueCsvDownloader from 'vue-csv-downloader'
import './assets/css/tailwind.css'

Vue.config.productionTip = false
Vue.use(VuePapaParse)
Vue.use(VueCsvDownloader)
new Vue({
  render: h => h(App),
}).$mount('#app')
