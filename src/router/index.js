import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/HomeView.vue')
    },
    {
        path: '/publish',
        name: 'publish',
        component: () => import(/* webpackChunkName: "about" */ '../views/publish/PublishView.vue')
    },
    {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/collect/CollectView.vue')
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/help/HelpView.vue')
    }
]
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
}
const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'nav_active'
})

export default router
