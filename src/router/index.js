import Vue from 'vue'
import Home from '@/components/pages/Home.vue'
import BookDetail from '@/components/pages/BookDetail.vue'
import HomeRouters from './home.js'

import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/books/:id',
            name: 'book-detail',
            component: BookDetail
        },
        {
            path: '/topChart',
            name: 'topChart',
            component: Home,
        },
        {
            path: '/newArrivals',
            name: 'newArrivals',
            component: Home,
        },
        {
            path: '/DTTBook',
            redirect: '/DTTBook/home',
            children: [
                ...HomeRouters,
            ]
        }
    ]
})
export default router;