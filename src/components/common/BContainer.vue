<template>
    <div> 
        <!-- Trang home -->
        <b-content 
          v-if="dataSourceX && dataSourceX.length"
          :dataSource="dataSourceX"
          v-model="dataSourceX"
          :isGenresFilter="isGenresFilterX"
        ></b-content>
        <!-- Trang book-detail -->
        <b-content
          v-if="bookX"
          :book="bookX"
          :dataBook="dataBookX"
          v-model="bookX"
          @bookClicked="bookClicked"
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
            isGenresFilterX: null
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
    }
}
</script>

<style scoped >
    
</style>