<template >
    <div class="main-container">
            <b-header/>
            <b-menu 
              :state="state"
              @changeState="changeState"
            ></b-menu>
            <b-container 
              :dataSource="dataSource"
              v-model="dataSource"
              :isGenresFilter="isGenresFilter"
            ></b-container>
    </div>
</template>

<script>
import BHeader from '@/components/common/BHeader.vue'
import BMenu from '@/components/common/BMenu.vue'
import BContainer from '@/components/common/BContainer.vue'
import bookAPI from '@/api/bookAPI.js'

export default {
    name: 'home',
    data() {
        return{
            state: 'home',
            dataSource: [],
            /* Trang hiển thị là lọc theo genres không */
            isGenresFilter : false,
            pageName : 'home',
            isCreate: false
        }
    },
    components: {
        BContainer,
        BHeader,
        BMenu
    },
    watch:{
        isGenresFilter:{
            handler(val){
                console.log(val)
            }
        }
    },
    created(){
        this.getDataSource();
    },
    methods: {
        /**
         * Hàm lấy dữ liệu đổ vào dataSource
         * Created by: thanhdt - 10.05.2021
         */
        getDataSource(){
            this.specifyPageName();
            setTimeout(() => {
                /* Lấy dữ liệu dataSource dựa vào pageName */
                switch(this.$route.name){
                    case 'home':
                        this.getHomeDataSource()
                        break
                    case 'top-chart':
                        this.getHomeDataSource()
                        break
                    case 'new-arrivals':
                        this.getHomeDataSource()
                        break
                    case 'book-by-genres':
                        this.getBookByGenres()
                        break
                }
            }, 0);
        },
        /**
         * Hàm xác dịnh pageName
         * Created by: thanhdt - 10.05.2021
         */
        specifyPageName(){
            switch(this.$route.name){
                case 'home':
                    this.pageName = 'home'
                    this.state = 'home'
                    break
                case 'top-chart':
                    this.pageName = 'top-chart'
                    this.state = 'top-chart'
                    break
                case 'new-arrivals':
                    this.pageName = 'new-arrivals'
                    this.state = 'new-arrivals'
                    break
                case 'book-by-genres':
                    this.pageName = 'book-by-genres'
                    this.state = 'book-by-genres'
                    break
            }
        },
        /**
         * Hàm thay đổi trạng thái
         * Created by: thanhdt - 01.05.2021
         */
        changeState(state){
            this.state = state;
            this.pageName = state
            this.getDataSource();
        },
        /**
         * Hàm lấy dữ liệu trang Home
         * Created by: thanhdt - 01.05.2021
         */
        getHomeDataSource(){
            this.isGenresFilter = false;
            bookAPI.getHomeBooks((res) => {
                this.dataSource = res;
            });
        },
        /**
         * Hàm lọc dữ liệu theo genres
         * Created by: thanhdt - 10.05.2021
         */
        getBookByGenres(){
            this.isGenresFilter = true;
            bookAPI.getHomeBooks((res) => {
                this.dataSource = res;
            });
        }
    }
}
</script>
<style>
* { margin: 0 !important; }
/* Style for star-rating */
.rating {
  unicode-bidi: bidi-override;
  color: #c5c5c5;
  font-size: 15px;
  line-height: 15px;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  padding: 0;
  text-shadow: 0px 0.5px 0 #a2a2a2;
}

.rating-upper {
  color: #e49a65;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
}

.rating-lower {
  padding: 0;
  display: flex;
  z-index: 0;
}
</style>

<style scoped >
    .main-container{
        margin: 0;
        padding: 0;
    }
</style>