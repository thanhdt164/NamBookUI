<template>
    <div class="main-container">
            <b-container 
              :state="state"
              :dataSource="dataSource"
              v-model="dataSource"
              @changeState="changeState"
              :isGenresFilter="isGenresFilter"
            ></b-container>
    </div>
</template>

<script>

import BContainer from '@/components/common/BContainer.vue'
import bookAPI from '@/api/bookAPI.js'
// import Book from '@/models/Book.js'

export default {
    name: 'home',
    data() {
        return{
            state: 'home',
            dataSource: [
                [{
                        title: 'More like Think Like a Monk',
                    },
                    {
                        name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                        author: 'Thich Nhat Hanh',
                        price: 230.584,
                        realPrice: 156.797
                    },
                    {},{},{},{},{},{},],
                [{
                        title: 'More like Think Like U',
                    },
                    {
                    name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                    author: 'Thich Nhat Hanh',
                    price: 230.584,
                    realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},],
                [{
                        title: 'More like Hoon',
                    },
                    {
                    name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                    author: 'Thich Nhat Hanh',
                    price: 230.584,
                    realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},]
            ],
            isGenresFilter : false,
            books: null
        }
    },
    components: {
        BContainer
    },
    created(){
        this.getBooks();
    },
    methods: {
        /**
         * Hàm thay đổi trạng thái
         * Created by: thanhdt - 01.05.2021
         */
        changeState(state){
            this.state = state;
            this.getDataSource();
        },
        /**
         * Hàn lấy dữ liệu đổ vào dataSource
         * Created by: thanhdt - 01.05.2021
         */
        getDataSource(){
            this.dataSource = [[{
                        title: 'More like Think Like a Monk',
                    },
                    {
                        name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                        author: 'Thich Nhat Hanh',
                        price: 230.584,
                        realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},],];
        },
        /**
         * Hàm lấy dữ liệu sách
         * Created by: thanhdt - 01.05.2021
         */
        getBooks(){
            bookAPI.getAll((res) => {
                console.log(res)
            });
        },
        /**
         * Hàm lấy dữ liệu trang Home
         * Created by: thanhdt - 01.05.2021
         */
        getHomeDataSource(){

        }
    }
}
</script>
<style>
* { margin: 0 !important; }
</style>

<style scoped >
    .main-container{
        margin: 0;
        padding: 0;
    }
</style>