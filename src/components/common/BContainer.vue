<template>
    <div> 
        <!-- Trang home -->
        <b-content 
          v-if="dataSourceX && dataSourceX.length"
          :dataSource="dataSourceX"
          v-model="dataSourceX"
          :isGenresFilter="isGenresFilterX"
          :isShowSeeMore="isShowSeeMoreX"
        ></b-content>
        <!-- Trang book-detail -->
        <b-content
          v-if="bookX"
          :book="bookX"
          :dataBook="dataBookX"
          v-model="bookX"
          @bookClicked="bookClicked"
        ></b-content>
        <!-- Trang shopping cart -->
        <b-content
          v-if="dataShoppingCartX"
          v-model="dataShoppingCartX"
          :isShoppingCart="isShoppingCartX"
          :dataShoppingCart="dataShoppingCartX"
        ></b-content>
        <!-- Trang Profile -->
        <b-content
          v-if="isProfile"
          :isProfile="isProfile"
        ></b-content>
        <b-footer/>
    </div>
</template>

<script>

import BContent from '@/components/common/BContent.vue'
import BFooter from '@/components/common/BFooter.vue'

export default {
    name: 'container',
    data(){
        return {
            dataSourceX: null,
            stateX: null,
            dataBookX: null,
            bookX: null,
            isGenresFilterX: null,
            isShowSeeMoreX: null,
            dataShoppingCartX: null,
            isShoppingCartX: null
        }
    },
    components: {
        BContent,
        BFooter
    },
    props: {
        dataSource: {
            type : [Array, Object],
            default : () =>  []
        },
        dataBook: {
            type : [Object, Array],
            default : () => []
        },
        book: {
            type: Object,
            default: null
        },
        isGenresFilter: {
            type : Boolean,
            default: false
        },
        isShowSeeMore: {
            type : Boolean,
            default: true
        },
        dataShoppingCart: {
            type: [Object, Array],
            defalt: () => []
        },
        isShoppingCart:{
            type : Boolean,
            default: false
        },
        isProfile:{
            type: Boolean,
            default: false
        }
    },
    created(){
    },
    methods:{
        /**
         * Hàm xử lý khi chuyển trang detail
         * Created by: thanhdt - 10.05.2021
         */
        bookClicked(){
            this.$emit('bookClicked');
        }
    },
    watch: {
        dataSource: {
            handler(val){
                this.dataSourceX = val;
            },
            immediate: true
        },
        dataBook: {
            handler(val){
                this.dataBookX = val;
            },
            immediate: true,
            deep: true
        },
        book: {
            handler(val){
                this.bookX = val;
            },
            immediate: true,
            deep: true
        },
        isGenresFilter: {
            handler(val){
                this.isGenresFilterX = val;
            },
            immediate: true
        },
        isShowSeeMore: {
            handler(val){
                this.isShowSeeMoreX = val;
            },
            immediate: true
        },
        dataShoppingCart: {
            handler(val) {
                this.dataShoppingCartX = val
            },
            immediate: true
        },
         isShoppingCart: {
            handler(val){
                this.isShoppingCartX = val;
            },
            immediate: true
        },
    }
}
</script>

<style scoped >
    
</style>