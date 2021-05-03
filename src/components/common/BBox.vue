<template>
    <div class="box">
            <div class="header-box">
                <div class="title">{{items[0].title}}</div>
                <div class="see-more">
                    <button type="button" class="btn btn-primary">See more</button>
                </div>
            </div>
            <div class="content-box" >
                <b-item-card v-for="(item, index) in items" v-show="index>0" :key="item"  :data="item"></b-item-card>
            </div>
    </div>
</template>

<script>
import BItemCard from '../common/BItemCard.vue'
export default {
    name: 'template',
    data(){
        return {

        }
    },
    components:{
        'b-item-card': BItemCard
    },
    props : {
        items : {
            typeof: [Array, Object],
            default: []
        }
    }

}
</script>

<style scoped >
    .box{
        margin-bottom: 20px !important;
        border-radius: 4px;
    }
    .header-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
    }
    .header-box .title{
        font-size: 28px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #333333;
    }
    .header-box button{
    
    }

    .content-box{
        height: 340px;
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: row; */
        justify-content: space-between;
        /* overflow:auto; */
        overflow: hidden;
    }
</style>