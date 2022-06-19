import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import './assets/styles.scss'

const GStore = reactive({flashMessage: ''})

loadFonts()

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .provide('GStore', GStore)
    .mount('#app')
