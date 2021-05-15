import Vue from 'vue'
import Home from '@/components/pages/Home.vue'
import BookDetail from '@/components/pages/BookDetail.vue'

import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
            path: '/DTTBook/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/DTTBook/genres/:genresId',
            name: 'book-by-genres',
            component: Home,
        },
        {
            path: '/DTTBook/books/:bookId',
            name: 'book-detail',
            component: BookDetail
        },
        {
            path: '/DTTBook/top-chart',
            name: 'top-chart',
            component: Home,
        },
        {
            path: '/DTTBook/new-arrivals',
            name: 'new-arrivals',
            component: Home,
        }
    ]
})
export default router;