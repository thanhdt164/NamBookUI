<template>
    <div :class="[isGenresFilter?'isGenresFilter':'' ,'item-card']">
        <div class="img">
            <img src="https://books.google.com/books/content/images/frontcover/XDlTjg_kyywC?fife=w160-h230" alt="">
        </div>
        <div class="content">
            <div class="title">
                <a href="">Touching the Earth: Guided Meditations for Mindfulness Practice</a>   
            </div>
            <div class="author">
                <a href="">Thich Nhat Hanh</a>
            </div>
            <div class="price">
                {{230.584}}đ
            </div>
            <div class="rate">
                <div class="star col-6">
                    <fa icon="user-secret"></fa>
                    <fa icon="user-secret"></fa>
                    <fa icon="user-secret"></fa>
                    <fa icon="user-secret"></fa>
                    <fa icon="user-secret"></fa>
                </div>
                <div class="real-price col-6">{{156.797}}đ</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-item-card',
    props:{
        item: {
            type: [Object, Array],
            default: () => {}
        },
        isGenresFilter:{
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped >
    .item-card{
        width: 170px;
        height: 340px;
        display: block;
        padding: 0px 5px;
        font-size: 13px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: 1px solid #D5D5D5;
        box-shadow: 1px 2px #D5D5D5;
        border-radius: 1px;
        background-color: #fff;
    }
    .isGenresFilter{
        margin: 0 4px 8px !important;
    }
    .img{
        width: 100%;
        height: 230px;
        display: flex;
        justify-content: space-around;
    }
    .img:hover{
         filter: grayscale(80%);
         cursor: pointer;
         background-color: #D5D5D5;
    }
    .img img{
        height: 100%;
    }
    .content{
        padding: 7px 10px;
        display: block;
    }
    .content .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
    }
    .content .title a{
        text-align: left;
        display: block;
        width: 100%;
        color: #333333;
    }
    .content .author {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .content .author a{
        display: block;
        width: 100%;
        color: #333333;
        text-align: left;
    }

    .content .price{
        text-align: right;
        color: #aaa;
        margin-top: 10px !important;
        text-decoration-line: line-through;
    }
    .content .rate{
        display: flex;
    }
    .content .star{
        display: flex;
    }
    .checked{
        color: burlywood;
    }
    .content .real-price{
        text-align: right;
        color: #01579B;
    }
    .content .real-price:hover{
        cursor: pointer;
        text-decoration-line: underline;
    }
    .col-6{
        padding: 0;
    }
</style>