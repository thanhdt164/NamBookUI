<template>
    <div class="box">
            <div class="header-box">
                <div class="title">{{items[0].title}}</div>
                <div class="see-more" v-if="!isGenresFilter">
                    <button type="button" class="btn btn-primary">See more</button>
                </div>
            </div>
            <div :class="[isGenresFilter?'isGenresFilter':'' ,'content-box']">
                <b-item-card 
                    v-for="(item, index) in items" 
                    v-show="index>0" 
                    :key="item"  
                    :data="item"
                    :isGenresFilter="isGenresFilter"
                ></b-item-card>
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
            type: [Array, Object],
            default: () => []
        },
        isGenresFilter: {
            type: Boolean,
            default: false
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
        background-color: #039be5;
        font-size: 14px;
    }

    .content-box{
        height: 348px;
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: row; */
        justify-content: space-between;
        /* overflow:auto; */
        overflow: hidden;
    }
    .isGenresFilter{
        height: auto;
        overflow: initial;
        justify-content: left;
    }
</style>