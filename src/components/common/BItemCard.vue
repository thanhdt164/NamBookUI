<template>
    <div :class="[isGenresFilter?'isGenresFilter':'' ,'item-card']">
        <div class="img" @click="bookClicked(dataX.book_id)">
            <img :src="`${dataX.avatar}`" alt="">
        </div>
        <div class="content">
            <div class="title" @click="bookClicked(dataX.book_id)">
                <a>{{dataX.book_nm}}</a>   
            </div>
            <div class="author">
                <a href="">{{dataX.author_nm?dataX.author_nm:'.'}}</a>
            </div>
            <div class="price">
                {{dataX.price>0?formatCurrency(dataX.price):"."}}
            </div>
            <div class="rate">
                <div class="star col-6">
                    <div class="rating">
                        <div class="rating-upper" :style="`width: ${parseFloat(dataX.rate_point*20)}%`">
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
                <div class="real-price col-6" @click="realPriceClicked(dataX)" >{{dataX.price>0?formatCurrency(dataX.price * (1-dataX.sale)):"Miễn phí"}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'b-item-card',
    data(){
        return {
            dataX: null
        }
    },
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
    watch: {
        data: {
            handler(val){
                this.dataX = val;
                this.dataX.total = JSON.parse(this.dataX.comment_json).length;
                this.dataX.rate_point = this.dataX.total?(JSON.parse(this.dataX.comment_json).map(el => el.star).reduce((a, b) => a+b)/this.dataX.total).toFixed(1) : 0;
                // if(this.dataX.book_nm == 'World of Warcraft: Chronicle Volume 2'){
                //     console.log(this.dataX)
                // }
            },
            immediate: true
        }
    },
    methods: {
        /**
         * Hàm format tiền tệ
         */
        formatCurrency(val){
            return Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(val)
        },
        /**
         * Hàm xử lý khi bấm vào avatar hoặc title book
         * Created by: thanhdt - 09.05.2021
         */
        bookClicked(bookId){
            this.$router.push({ name: 'book-detail', params: {bookId: bookId } })
        },
        /**
         * Chọn mua sách ở trang home
         * Created by: thanhdt 25.05.2021
         */
        realPriceClicked(data){
            this.$emit("paymentHome", data)
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
         /* filter: grayscale(100%); */
         cursor: pointer;
         background-color: gray;
    }
    .img img{
        width: 100%;
        transition: transform .5s ease
    }
    .img img:hover{
        /* transform: scale(1.08); */
        transform: scale(1.1);
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