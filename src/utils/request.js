import axios from 'axios'
import {Notification} from 'element-ui';
import {VueAxios} from './axios'
import Vue from 'vue'
import RegisterOrLogin from "@/views/login/RegisterOrLogin.vue";

const TOKEN = "token"

let apiBaseUrl = window._CONFIG['baseUrl'];
// 创建 axios 实例
const service = axios.create({
    baseURL: apiBaseUrl, // api base_url
    timeout: 60 * 1000 + 5000 // 请求超时时间
})


const err = (error) => {
    if (error.response) {
        let data = error.response.data
        const token = Vue.ls.get(TOKEN)
        switch (error.response.data.code) {
            case "404":
                // notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
                break
            case "401":
                Notification.error({title: '系统提示', message: '未授权，请登录'})
                if (token) {
                    Vue.ls.remove('userInfo')
                    Vue.ls.remove('token')
                }
                let app = new Vue({
                    render: (h) => h(RegisterOrLogin), // 渲染 RegisterOrLogin 组件
                }).$mount("#app"); // 手动挂载到一个虚拟元素
                // 获取组件实例并调用 init 方法
                let registerOrLoginComponent = app.$children[0];
                registerOrLoginComponent.init();
                break
            default:
                Notification.error({
                    title: '系统提示',
                    message: data.message,
                    duration: 0
                })
                break
        }
    }
    return Promise.reject(error)
};

service.interceptors.request.use(config => {
    const token = Vue.ls.get(TOKEN)
    if (token) {  //正常 token存在的时候
        config.headers[TOKEN] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


// response interceptor
service.interceptors.response.use((response) => {
    return response.data
}, err)

const installer = {
    vm: {},
    install(Vue, router = {}) {
        Vue.use(VueAxios, router, service)
    }
}

export {
    installer as VueAxios,
    service as axios
}

