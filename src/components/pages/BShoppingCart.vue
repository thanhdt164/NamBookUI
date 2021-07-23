<template >
    <div class="main-container">
            <b-header :userInfo="userInfo"/>
            <b-menu 
              :state="state"
            ></b-menu>
            <b-container 
              :dataShoppingCart="dataShoppingCart"
              v-model="dataShoppingCart"
              :isShoppingCart="true"
            ></b-container>
    </div>
</template>
<script>
import BHeader from '@/components/common/BHeader.vue'
import BMenu from '@/components/common/BMenu.vue'
import BContainer from '@/components/common/BContainer.vue'
import userAPI from '@/api/userAPI.js'
import cartAPI from '@/api/cartAPI.js'
import storageAPI from '@/api/storageAPI.js'

export default {
    name: 'shopping-cart',
    data() {
        return{
            state: 'shopping-cart',
            userInfo: null,
            dataSource: [],
            /* Trang hiển thị là lọc theo genres không */
            isGenresFilter : false,
            pageName : 'home',
            isCreate: false,

            dataStorage: null,
            dataShoppingCart: []
        }
    },
    components: {
        BContainer,
        BHeader,
        BMenu
    },
    async created(){
        /* Lấy thông tin các sách trong kho */
        await this.getStorageInfo();
        /* Lấy thông tin người dùng */
        let accountName = localStorage.getItem('acc-name')
        userAPI.getUserInfo(accountName, (res)=>{
            this.userInfo = res,
            this.getDataShoppingCart(this.userInfo.user_id);
        })
    },
    methods: {
        /**
         * Hàm lấy thông tin sách trong kho
         * Created by: thanhdt - 06.06.2021
         */
        getStorageInfo(){
            storageAPI.getAll((res)=>{
                this.dataStorage = res;
            })
        },
        /**
         * Hàm lấy thông tin shopping cart theo người dùng
         * Created by: thanhdt 05.06.2021
         */
        getDataShoppingCart(userId){
           cartAPI.getCartInfo(userId, (res) => {
               this.dataShoppingCart = res;
               this.dataShoppingCart.cart_json = JSON.parse(this.dataShoppingCart.cart_json)
               this.dataShoppingCart.cart_json.forEach(el => {
                   el.maxAmount = this.dataStorage.filter(it => it.book_id == el.bookData.book_id)?this.dataStorage.filter(it => it.book_id == el.bookData.book_id)[0].amount:5;
               });
           })
       }
    }
}
</script>

<style scoped>

</style>