<template>
    <div class="review-item flex">
        <div class="user-avatar">
            <img src="https://play-lh.googleusercontent.com/a-/AOh14GjHmnnVrJITDaRfcdgEFoFMl9RojF0UoEa14_Bj7Q=w96-h96-n-rw" alt="">
        </div>
        <div>
            <div class="rit-top flex">
                <div class="rit-top-left">
                    <div class="user-name">Rockwell Norman</div>
                    <div class="flex">
                        <div class="star"></div>
                        <div class="date-cmt">July 21, 2015</div>
                    </div>
                </div>
                <div class="rit-top-right flex">
                    <div class="like col-6 p-0">
                        <div class="icon-like"></div>
                    </div>
                    <div class="three-dots col-6 p-0">
                        <div class="icon-three-dots">

                        </div>
                    </div>
                </div>
            </div>
            <div class="rit-bot">
                A good introduction to meditation and mindfullness. About half the book was written by Hanh, the rest are writings from other sources that may be on interest to those going full blown gonzo into Buddhist Zen practice but adds little for the beginner.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-review-item',
    props: {
        review:{
            type: [Array, Object],
            default: () => []
        }
    }
}
</script>

<style scoped >
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
        background-color: #aaa;
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
    }
    .rit-top-right .icon-like, .icon-three-dots{
        background-color: #aaa;
        width: 24px;
        height: 24px;
        align-items: center;
        margin: auto !important;
        justify-content: space-around;
        flex-direction: column;
    }
    .rit-top-right .icon-like:hover, .icon-three-dots:hover{
        cursor: pointer;
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
</style>