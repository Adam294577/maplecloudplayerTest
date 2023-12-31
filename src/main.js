import { createApp } from 'vue'
import App from './App.vue'
// import App from './App2.vue'
import router from './router'
import store from "./store";

import VueMeta from 'vue-meta';
const app = createApp(App).use(router).use(store)

app.directive("testFn",{
    mounted(el) {
        console.log(el);
    }
})


// app.use(VueMeta, {
//     refreshOnceOnNavigation: true,
//   });

app.mount('#app')


  

