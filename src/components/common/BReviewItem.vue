<template>
    <div class="review-item flex">
        <div class="user-avatar">
            <img :src="`${commentX.user_avatar?commentX.user_avatar:'https://play-lh.googleusercontent.com/a-/AOh14GjHmnnVrJITDaRfcdgEFoFMl9RojF0UoEa14_Bj7Q=w96-h96-n-rw'}`" alt="">
        </div>
        <div>
            <div class="rit-top flex">
                <div class="rit-top-left">
                    <div class="user-name">{{commentX.user_nm?commentX.user_nm:'Rockwell Norman'}}</div>
                    <div class="flex">
                        <div class="star">
                            <div class="rating">
                                <div class="rating-upper" :style="`width: ${commentX.star*100/5}%`" :title="`${commentX.star} star`">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                </div>
                                <div class="rating-lower">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                </div>
                            </div>
                        </div>
                        <div class="date-cmt">{{commentX.comment_date_name?commentX.comment_date_name:'July 21, 2015'}}</div>
                    </div>
                </div>
                <div class="rit-top-right flex">
                    <div class="like col-6 p-0">
                        <div class="icon-like">
                            <font-awesome-icon icon="thumbs-up" class="thumbs-up"/>
                        </div>
                        <div class="like-count">{{commentX.voted && commentX.voted.length ?commentX.voted.length:0}}</div>
                    </div>
                    <div class="three-dots col-6 p-0">
                        <div class="icon-three-dots">
                            <font-awesome-icon icon="ellipsis-v" class="ellipsis-v"/>
                        </div>
                        <div class="like-count"></div>
                    </div>
                </div>
            </div>
            <div class="rit-bot">
                {{commentX.content?commentX.content:'A good introduction to meditation and mindfullness. About half the book was written by Hanh, the rest are writings from other sources that may be on interest to those going full blown gonzo into Buddhist Zen practice but adds little for the beginner.'}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-review-item',
    data(){
        return{
            commentX: {}
        }
    },
    props: {
        comment:{
            type: Object,
            default: () => {}
        }
    },
    watch:{
        comment:{
            handler(val){
                this.commentX = val
                this.preProcess();
            }
        }
    },
    created(){
        // this.preProcess();
    },
    methods:{
        /**
         * Hàm tiền xử lý dữ liệu comment
         * Created by: thanhdt 13.05.2021
         */
        preProcess(){
            this.commentX.comment_date_name = this.formatDate(this.commentX.comment_date, 2);
        },
        /**
         * Hàm format dữ liệu dạng ngày tháng
         * Created by: thanhdt - 12.05.2021
         */
        formatDate(date, type){
            date = new Date(date)
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
            if (type == 1) {
                return `${mo} ${ye}`
            }
            if (type == 2) {
                return `${mo} ${da}, ${ye}`
            }
        },
    }
}
</script>

<style scoped >
* { margin: 0 !important; }
    .p-0{
        padding: 0 !important;
    }
    .flex{
        display: flex;
    }
    .review-item{
        /* height: 100px; */
    }
    .user-avatar{
        height: 100%;
        width: 48px;
        position: relative;
    }
    .user-avatar img{
        height: 48px;
        width: 48px;
        border-radius: 50%;
        position: absolute;
        top: 6px;
        left: 0;
    }
    .rit-top{
        width: 574px;
        height: 55px;
        padding: 4px 4px 4px 9px;
        position: relative;
    }
    .rit-top-left{
        width: 100%;
        height: 100%;
    }

    .rit-top-left .user-name{
        text-align: left;
        font-size: 14px;
        color: #333333;
    }
    .rit-top-left .star{
        height: 24px;
        width: 70px;
    }
    .rit-top-left .date-cmt{
        height: 24px;
        font-size: 12px;
        padding: 0 4px;
        vertical-align: middle;
        display: inline-block;
        white-space: nowrap;
        color: #aaa;
        line-height: 24px;
    }
    
    .rit-top-right{
        height: calc(100% - 8px);
        width: 100px;
        position: absolute;
        right: 4px;
    }
    .rit-top-right .like, .three-dots{
        display: flex;
        flex-direction: column;
    }
    .rit-top-right .icon-like, .icon-three-dots{
        width: 24px;
        height: 24px;
        align-items: center;
        margin: auto auto 0 !important;
        justify-content: space-around;
        flex-direction: column;
    }

    .thumbs-up{
        color: #757575;
        font-size: 20px;
    }
    .thumbs-up-active{
        color: #333333;
    }
    .thumbs-up:active{
        color: #333333;
    }
    .ellipsis-v{
         color: #757575;
    }
    .ellipsis-v:active{
         color: #333333;
    }
    .rit-top-right .icon-like:hover, .icon-three-dots:hover{
        cursor: pointer;
    }
    .rit-top-right .like-count{
        align-self: center;
        font-size: 11px;
        position: relative;
        height: 14px;
    }
    
    .rit-bot{
        width: 574px;
        max-height: 70px;
        text-align: left;
        font-size: 14px;
        color: #333333;
        padding: 4px 4px 4px 9px;
        overflow: hidden;
    }

/* Style lại cho star-rating */
  .rating {
  color: #c5c5c5;
  font-size: 15px;
  line-height: 24px;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  padding: 0;
  text-shadow: 0px 0.5px 0 #a2a2a2;
}

.rating-upper {
  color: #646161;
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