import Vue from 'vue'
import Home from '@/components/pages/Home.vue'

import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/home',
            name: 'home',
            component: Home,
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
    ]
})
export default router;