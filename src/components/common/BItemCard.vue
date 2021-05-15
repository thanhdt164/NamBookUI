<template>
    <div :class="[isGenresFilter?'isGenresFilter':'' ,'item-card']">
        <div class="img" @click="bookClicked(data.book_id)">
            <img :src="`${data.avatar}`" alt="">
        </div>
        <div class="content">
            <div class="title" @click="bookClicked(data.book_id)">
                <a>{{data.book_nm}}</a>   
            </div>
            <div class="author">
                <a href="">{{data.author_nm}}</a>
            </div>
            <div class="price">
                {{data.price}}đ
            </div>
            <div class="rate">
                <div class="star col-6">
                    <div class="rating">
                        <div class="rating-upper" style="width: 82%">
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
                <div class="real-price col-6" >{{data.price * (1-data.sale)}}đ</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-item-card',
    props:{
        data: {
            type: [Object, Array],
            default: () => {}
        },
        isGenresFilter:{
            type: Boolean,
            default: false
        }
    },
    created(){
        
    },
    methods: {
        /**
         * Hàm xử lý khi bấm vào avatar hoặc title book
         * Created by: thanhdt - 09.05.2021
         */
        bookClicked(bookId){
            this.$router.push({ name: 'book-detail', params: {bookId: bookId } })
        }
    },
    
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
         filter: grayscale(100%);
         cursor: pointer;
         background-color: gray;
    }
    .img img{
        width: 100%;
        transition: transform .5s ease
    }
    .img img:hover{
        transform: scale(1.08);
        /* border: 2px solid #fff; */
        box-shadow: 1px 2px #D5D5D5;
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
        cursor: pointer;
    }
    .content .title a:hover{
        text-decoration: underline;
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