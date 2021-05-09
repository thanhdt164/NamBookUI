<template>
<div>
    <!-- Trang home -->
    <div 
      v-if="dataSource && dataSource.length"
      :class="[isGenresFilter?'isGenresFilter':'' ,'content']">
        <div class="box">
            <b-box 
                v-for="items in dataSource" 
                :key="items" 
                :items="items"
                :isGenresFilter="isGenresFilter"
            ></b-box>
        </div>
    </div>
    <!-- Trang book-detail -->
    <div 
      class="content content-book-detail"
      v-if="dataBook && dataBook.length">
        <div class="left">
            <!-- left top -->
            <div class="l-top flex">
                <img src="https://books.google.com/books/publisher/content/images/frontcover/MXCRDQAAQBAJ?fife=w160-h230" alt="">
                <div class="title">
                    <div class="title-one">
                        The Four Agreements: A Practical Guide to Personal Freedom
                    </div>
                    <div class="title-two flex">
                        <div class="title-two-left col-9 flex align-center">
                            <div class="author-img">
                                <img src="https://play-lh.googleusercontent.com/96MZ8FH_OsoelilPEEzUbDQl1TjNpfJrJ6SUyHG6gKOA2gsuIDMFJc0fuJ1fagYaLw=s64-rw" alt="">
                            </div>
                            <div class="author-name">
                                <div class="name">THICH NHAT HANH
                                    <span>Apr 1996</span>
                                </div>
                                <div class="publisher">Beacon Press</div>
                            </div>
                        </div>
                        <div class="title-one-right col-3"></div>
                    </div>
                    <div class="title-three">Switch to the audiobook</div>
                </div>
                <div class="order">
                    <button type="button" class="btn btn-primary">
                        <span class="price">₫184,421</span>
                        <span class="real-price">₫138,316</span>
                        Ebook
                    </button>
                </div>
            </div>
            <!-- left summary -->
            <div class="summary">
                In The Heart of the Buddha’s Teaching, now revised with added material and new insights, Nhat Hanh introduces us to the core teachings of Buddhism and shows us that the Buddha’s teachings are accessible and applicable to our daily lives.
                Covering such significant teachings as the Four Noble Truths, the Noble Eightfold Path, the Three Doors of Liberation, the Three Dharma Seals, and the Seven Factors of Awakening, The Heart of the Buddha’s Teaching is a radiant beacon on Buddhist thought for the initiated and uninitiated alike.
            </div>
            <div class="expand">
                <button>expand</button>
            </div>
            <hr/>
            <!-- Review -->
            <div class="review">
                <div class="review-top flex">
                    <div>Reviews</div>
                    <div class="review-policy">
                        <div class="icon">
                            <i></i>
                        </div>
                        Review policy and info
                    </div>
                    <button class="write-a-review">
                        <i></i>
                        Write a Review
                    </button>
                </div>
                <div class="rate flex">
                    <div class="rate-number">4.5</div>
                    <div class="rate-star">

                    </div>
                    <div class="rate-total">
                        <i></i>21 total
                    </div>
                </div>
                <div class="review-box">
                    <b-review-item
                    ></b-review-item>
                </div>
            </div>
            <hr/>
            <div class="addition-info">
                <img src="../../assets/addition-info.jpg" alt="">
            </div>
            <hr/>
        </div>
        <!-- Similar books -->
        <div class="right">
            <div class="r-top">
                <div class="title col-8">Similar ebooks</div>
                <div class="see-more col-4">
                    <button type="button" class="btn btn-primary">See more</button>
                </div>
            </div>
            <div class="r-body">
                <b-item-card-2
                  v-for="book in data[0].slice(0, 5)" :key="book"
                ></b-item-card-2>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
import Bbox from '@/components/common/BBox.vue'
import BItemCard2 from '@/components/common/BItemCard2.vue'
import Book from '@/models/Book.js'
import BReviewItem from '@/components/common/BReviewItem.vue'

export default {
    name: 'b-content',
    components: { 
        'b-box': Bbox,
        'b-item-card-2': BItemCard2,
        'b-review-item': BReviewItem,
    },
    data(){
        return {
            data: [
                [{
                        title: 'More like Think Like a Monk',
                    },
                    {
                        name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                        author: 'Thich Nhat Hanh',
                        price: 230.584,
                        realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},],
                [{
                        title: 'More like Think Like U',
                    },
                    {
                    name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                    author: 'Thich Nhat Hanh',
                    price: 230.584,
                    realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},],
                [{
                        title: 'More like Hoon',
                    },
                    {
                    name: 'Touching the Earth: Guided Meditations for Mindfulness Practice',
                    author: 'Thich Nhat Hanh',
                    price: 230.584,
                    realPrice: 156.797
                    },
                    {},{},{},{},{},{},{},]
            ],
            dataBookX: [],
            dataSourceX: []
        }
    },
    props: {
        dataSource :{
            type: [Array, Object],
            default: () => []
        },
        dataBook :{
            type: [Array, Object],
            default: () => []
        },
        isGenresFilter: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        dataBook:{
            handler(val){
                if(val){
                    this.dataBookX = val;
                    this.getDataBook();
                }
            }
        },
        dataSource: {
            handler(val){
                if(val){
                    this.dataSourceX = val;
                }
            }
        }
    },
    methods: {
        getDataBook(){
            this.bookX = Book.init();
            console.log(this.bookX);
        }
    },
}
</script>

<style scoped >
    .content{
        background-color: #F1F1F1;
        min-height: 100vh;
        padding: 30px 10% 30px 16%;
    }
    .isGenresFilter{
        padding: 30px 8% 30px 16%;
    }
    .box{
        margin-bottom: 20px;
        border-radius: 4px;
    }

    /* css book-detail */
    .content-book-detail{
        padding: 30px 15% 30px 20%;
        display: flex;
        justify-content: space-between;
    }
    .left{
        width: 720px;
        border: 1px solid #D5D5D5;
        box-shadow: 0 1px 2px 2px rgb(0 0 0 / 10%);
        background-color: #fff;
    }
    .right{
        width: 330px;
        height: fit-content;
        margin-top: 50px !important;
    }
    .r-top{
        display: flex;
        margin-bottom: 16px !important;
        align-content: center;
        width: 100%;
        height: 35px;
    }
    .r-top .title{
        font-size: 20px;
        line-height: 28px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: left;
        color: #333333;
        font-weight: 400;
        align-self: center;
    }
    .col-8, .col-4, .col-3, .col-9{
        padding: 0;
    }
    .r-top button{
        background-color: #039be5;
        font-size: 14px;
        color: #fff;
        position: absolute;
        right: 0;
    }

    .flex{
        display: flex;
    }
    .align-center{
        align-items: center;
    }
    .l-top{
        height: fit-content;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .l-top img{
        width: 200px;
    }
    .l-top .title{
        width: calc(720px - 200px);
        height: 100%;
    }

    .title-one{
        width: 100%;
        color: #212121;
        font-size: 25px;
        text-align: left;
        padding: 12px 24px;
        max-height: 100px;
        overflow: hidden;
    }

    .title-two{
        padding-left: 24px;
    }
    .title-two-left{

    }

    .title-two .author-img{
        height: 35px;
        width: 35px;
        border-radius: 50%;
        border: 1px solid #333333;
    }
    .title-two img{
        height: 32px;
        width: 32px;
        border-radius: 50%;
    }

    .title-two .author-name{
        padding: 0 12px;
        max-width: 335px;
        text-align: left;
    }
    .title-two .author-name .name{
        color: #01579B;
    }
    .title-two .author-name span{
        padding: 0 12px;
        font-size: 13px;
        color: #616161;
        text-decoration: none;
    }

    .title-two .author-name .publisher{
        font-size: 13px;
        color: #616161;
    }

    .title-three{
        padding: 8px 24px;
        text-align: left;
        color: #01579B;
        font-size: 13px;
    }
    .order{
        position: absolute;
        right: 24px;
        bottom: 0;
    }
    .order button{
        font-size: 13px;

    }
    .order .price{
        color: #AAA;
        text-decoration: line-through;
        padding: 0 4px;
    }
    .order .real-price{
        padding: 0 4px;

    }

    .summary{
        text-align: justify;
        padding: 48px 48px 24px;
        color: #616161;;
        font-size: 16px;
        line-height: 24px;
        max-height: 300px;
        font-style: italic;
        overflow: hidden;
    }
    .expand button{
        border: none;
        color: #01579B;
        text-transform: uppercase;
        font-size: 16px;
        padding: 6px 12px;
        border-radius: 4px;
        background-color: #fff;
    }
    .expand button:hover{
        background-color: #F1F1F1;
    }
    .expand button:active{
        background-color: #74a0c2;
    }

    hr{
        margin: 32px 0 !important;
        padding: 0 5% !important;
    }

    .review{
        padding: 0 48px;
    }
    .review-top{
        height: 80px;
        justify-content: space-between;
        position: relative;
    }
    .review-top>div{
        text-transform: uppercase;
        font-size: 16px;
    }
    .review-top .review-policy{
        text-transform: none;
        font-size: 13px;
    }
    .review-top>button{
        height: 36px;
        line-height: 34px;
        padding: 0 20px;
        box-shadow: 0 1px 0 0 rgb(0 0 0 / 27%);
        border: 1px solid rgba(0,0,0,0.17);
        color: #737373;
        border-radius: 4px;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 14px;
        font-weight: 500;
    }
    .review-top>button:active{
        background-color: #D5D5D5;
    }
    .rate{
        height: 162px;
        width: 160px;
        padding: 20px;
        flex-direction: column;
    }
    .rate-number{
        font-size: 64px;
        height: 64px;
        width: 120px;
        color: #333333;
        line-height: 1;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 100;
    }
    .rate-star{
        width: 120px;
        height: 24px;
        margin: 4px !important;
    }
    .rate-total{
        font-size: 14px;
        margin-top: 16px !important;
    }

    .addition-info img{
        width: 720px;
        padding: 0 4px;
    }
</style>