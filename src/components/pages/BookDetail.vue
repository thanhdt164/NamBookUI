<template>
      <div class="main-container">
            <b-header/>
            <b-menu></b-menu>
            <b-container 
              :dataBook="dataBook"
              :book="book"
              v-model="book"
              @bookClicked="bookClicked"
            ></b-container>
    </div>
</template>

<script>
import BHeader from '@/components/common/BHeader.vue'
import BMenu from '@/components/common/BMenu.vue'
import BContainer from '@/components/common/BContainer.vue'
import bookAPI from '@/api/bookAPI.js'

export default {
    name: 'book-detail',
    data(){
        return{
            dataBook: [],
            book: null,
        }
    },
    components: {
        BHeader,
        BMenu,
        BContainer,
    },
    created(){
        this.getBook();
    },
    methods: {
        /**
         * Hàm lấy dữ liệu sách trang detail theo id trên route
         * Created by: thanhdt - 09.05.2021
         */
        getBook(){
            var self = this;
            var bookId = self.$route.params.bookId;
            bookAPI.getBookInfor(bookId, (res) => {
                self.book = res;
                self.getDataBook();
            });
            
        },
        /**
         * Hàm lấy dữ liệu sách theo genresIds
         * Created by: thanhdt - 09.05.2021
         */
        getDataBook(){
            var genresIds = this.book.genres_ids;
            genresIds = genresIds.split(";");
            bookAPI.getBooksByGenresId(genresIds, (res) => {
                this.dataBook = res;
            });
        },
        /**
         * Hàm xử lý khi chuyển trang detail
         * Created by: thanhdt - 10.05.2021
         */
        bookClicked(){
            this.getBook();
        }
    },
    
    
}
</script>

<style scoped >
    
</style>