import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Storage from 'vue-ls';

const storageOptions = {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local'
}
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Storage, storageOptions)
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
