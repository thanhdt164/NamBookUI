import Home from '@/components/pages/Home.vue'

const routes = [{
        path: 'home',
        name: 'home',
        exact: true,
        component: Home,
    },
    {
        path: 'topChart',
        name: 'topChart',
        component: Home,
    },
    {
        path: 'newArrivals',
        name: 'newArrivals',
        component: Home,
    },
]

export default routes;