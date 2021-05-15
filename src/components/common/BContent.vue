<template>
<div>
    <!-- Trang home -->
    <div 
      v-if="dataSourceX && dataSourceX.length"
      :class="[isGenresFilter?'isGenresFilter':'' ,'content']">
        <div class="box">
            <b-box 
                v-for="(items, id) in dataSourceX" 
                :key="id" 
                :items="items"
                :isGenresFilter="isGenresFilter"
            ></b-box>
        </div>
    </div>
    <!-- Trang book-detail -->
    <div 
      class="content content-book-detail"
      v-if="bookX">
        <div class="left">
            <!-- left top -->
            <div class="l-top flex">
                <img :src="`${bookX.avatar}`" class="book-avatar" alt="">
                <div class="title">
                    <div class="title-one" :title="bookX.book_nm">
                        {{bookX.book_nm}}
                    </div>
                    <div class="title-two flex">
                        <div class="title-two-left col-9 flex align-center">
                            <div class="author-img">
                                <img src="https://play-lh.googleusercontent.com/96MZ8FH_OsoelilPEEzUbDQl1TjNpfJrJ6SUyHG6gKOA2gsuIDMFJc0fuJ1fagYaLw=s64-rw" alt="">
                            </div>
                            <div class="author-name">
                                <div class="name">{{bookX.author_nm}}
                                    <span>{{bookX.publishing_date_name}}</span>
                                </div>
                                <div class="publisher">{{bookX.publisher_nm}}</div>
                            </div>
                        </div>
                        <div class="title-one-right col-3"></div>
                    </div>
                    <div class="title-three">Switch to the audiobook</div>
                </div>
                <div class="order">
                    <button type="button" class="btn btn-primary" @click="btnPaymentClicked">
                        <span class="price">₫{{bookX.price}}</span>
                        <span class="real-price">₫{{bookX.real_price}}</span>
                        Ebook
                    </button>
                </div>
            </div>
            <!-- left summary -->
            <div :class="[expandClicked?'expandClicked':'', 'summary']">
                {{bookX.description}}
            </div>
            <div class="expand">
                <button @click="expand">Read more</button>
            </div>
            <hr/>
            <!-- Review -->
            <div class="review">
                <div class="review-top flex">
                    <div>Reviews</div>
                    <div class="review-policy">
                        <span class="icon">
                            <font-awesome-icon icon="info-circle" class="info-circle"/>
                        </span>
                        Review policy and info
                    </div>
                    <button class="write-a-review" id="review-btn" @click="btnCommentClicked">
                        <font-awesome-icon icon="pen" class="pen" /> Write a Review
                    </button>
                </div>
                <div class="rate flex">
                    <div class="rate-number">{{bookX.rate_point}}</div>
                    <div class="rate-star">
                        <div class="rating">
                        <div class="rating-upper" :style="`width: ${bookX.rate_point*20}%`">
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
                    <div class="rate-total">
                         <font-awesome-icon icon="user" class="user"/> {{bookX.total}} total
                    </div>
                </div>
                <div class="review-box">
                    <b-review-item
                    ></b-review-item>
                    <b-review-item 
                        v-for="(comment, id) in bookX.comment_json" :key="id"  
                        :comment="comment"
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
                  v-for="(dataBookItem, id) in dataBookX.slice(0, 5)" :key="id"
                  v-show="dataBookX && dataBookX.length"
                  :dataBookItem="dataBookItem"
                  v-model="dataBookX"
                  @bookClicked="bookClicked"
                ></b-item-card-2>
            </div>
        </div>
    </div>
    <!-- Popup review -->
    <DxPopup
      v-model="dataReviewPopup"
      :visible.sync="dataReviewPopup.isShowReviewPopup"
      :drag-enabled="true"
      :close-on-outside-click="true"
      :show-close-button="false"
      :show-title="false"
      title=""
      width="705px"
      height="auto"
      container=".dx-viewport"
    >
      <DxPosition
        at="center"
        my="center"
      />
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="closeCommentButtonOptions"
      />
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="submitCommentButtonOptions"
      />
        <div class="review-popup">
            <div class="review-header">{{dataReviewPopup.headerText}}</div>
            <div class="review-content">
                <div class="content-top">Reviews are public and editable. Everyone can see your Google Account name and photo. Developers can also see your country and device information (such as language, model, and OS version) and may use this information to respond to you</div>
                <div class="flex">
                    <div class="left">
                        <img :src="dataReviewPopup.bookAvatar" alt="">
                    </div>
                    <!-- <p>How To: Absurd Scientific Advice for Common Real-World Problems</p> -->
                    <div class="right">
                        <textarea v-model="dataReviewPopup.commnetText" placeholder="Tell others what you think about this book. Would you recommend it, and why?"/>
                        <p>Most helpful reviews have 100 words or more</p>
                        <div class="rating">
                                <div class="rating-upper" 
                                  :style="`width: ${dataReviewPopup.commentStar*100/5}%`"
                                  :title="`${dataReviewPopup.commentStar} star`">
                                    <span @click="() => {dataReviewPopup.commentStar = 1}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 2}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 3}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 4}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 5}">★</span>
                                </div>
                                <div class="rating-lower">
                                    <span @click="() => {dataReviewPopup.commentStar = 1}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 2}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 3}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 4}">★</span>
                                    <span @click="() => {dataReviewPopup.commentStar = 5}">★</span>
                                </div>
                            </div>
                    </div>

                </div>
            </div>
        </div>
    </DxPopup>
    <!-- Popup payment -->
    <DxPopup
      v-model="dataPaymentPopup"
      :visible.sync="dataPaymentPopup.isShowPaymentPopup"
      :drag-enabled="true"
      :close-on-outside-click="true"
      :show-close-button="false"
      :show-title="false"
      title=""
      width="720px"
      height="367px"
      container=".dx-viewport"
    >
      <DxPosition
        at="center"
        my="center"
      />
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="closePaymentButtonOptions"
      />
      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="submitPaymentButtonOptions"
      />
        <div class="payment-popup">
            <img src="https://books.google.com/books/content/images/frontcover/HqxNvKCx04wC?fife=w160-h230" alt="">
            <div>
                <div class="payment-header flex">
                    <div class="title">The De-Textbook: The Stuff You Didn't Know About the Stuff You Thought You Knew</div>
                    <div class="price">₫ 63.098</div>
                </div>
                <div class="payment-content">
                    <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div>
                    <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div>
                    <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div>
                </div>
            </div>
        </div>
    </DxPopup>
</div>    
</template>

<script>
import Bbox from '@/components/common/BBox.vue'
import BItemCard2 from '@/components/common/BItemCard2.vue'
import BReviewItem from '@/components/common/BReviewItem.vue'
import { DxPopup, DxPosition, DxToolbarItem } from 'devextreme-vue/popup';


export default {
    name: 'b-content',
    components: { 
        'b-box': Bbox,
        'b-item-card-2': BItemCard2,
        'b-review-item': BReviewItem,
        DxPopup,
        DxPosition,
        DxToolbarItem
    },
    data(){
        return {
            dataBookX: [],
            bookX: null,
            dataSourceX: [],
            expandClicked: false,
            closeCommentButtonOptions: {
                text: 'Close',
                onClick: () => {
                    this.dataReviewPopup.isShowReviewPopup = false;
                }
            },
            submitCommentButtonOptions:{
                text: 'Submit',
                onClick: () => {
                    this.dataReviewPopup.isShowReviewPopup = false;
                    this.handleComment();
                }
            },
            dataReviewPopup:{
                isShowReviewPopup: false,
                headerText: 'Review by ...',
                bookAvatar: "https://books.google.com/books/content/images/frontcover/HqxNvKCx04wC?fife=w160-h230",
                commnetText: "",
                commentStar: 1
            },
            closePaymentButtonOptions: {
                text: 'Close',
                onClick: () => {
                    this.dataPaymentPopup.isShowPaymentPopup = false;
                }
            },
            submitPaymentButtonOptions:{
                text: 'Submit',
                onClick: () => {
                    this.dataPaymentPopup.isShowPaymentPopup = false;
                    this.handleComment();
                }
            },
            dataPaymentPopup:{
                isShowPaymentPopup: false,
                headerText: 'Review by ...',
                bookAvatar: "https://books.google.com/books/content/images/frontcover/HqxNvKCx04wC?fife=w160-h230",
                commnetText: "",
                commentStar: 1
            },
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
        book :{
            type: Object,
            default: null
        },
        isGenresFilter: {
            type: Boolean,
            default: false
        }
    },
    created(){
        
    },
    methods: {
        /**
         * Hàm xử lý click comment button
         * Created by: thanhdt - 15.05.2021
         */
        btnCommentClicked(){
            this.dataReviewPopup.isShowReviewPopup = true,
            this.dataReviewPopup.bookAvatar = this.bookX.avatar;
            this.dataReviewPopup.headerText = `Review by Thanh Trung`
        },
        /**
         * Hàm xử lý khi submit comment
         * Created by: thanhdt - 15.05.2021
         */
        handleComment(){
            /* set lại giá trị mặc định cho dataReview */
            this.dataReviewPopup.commentStar = 1;
            this.dataReviewPopup.commnetText = "";  
            /* xử lý lưu comment */
        },
        /**
         * Hàm xử lý khi click payent button
         * Created by : thanhdt - 15.05.2021
         */
        btnPaymentClicked(){
            this.dataPaymentPopup.isShowPaymentPopup = true;
        },
        /**
         * Hàm sử lý khi mở click Expand
         * Created by: thanhdt - 09.05.2021
         */
        expand(){
            this.expandClicked = !this.expandClicked;
        },
        /**
         * Hàm xử lý khi chuyển trang detail
         * Created by: thanhdt 10.05.2021
         */
        bookClicked(){
            this.$emit('bookClicked');
        },

        /**
         * Hàm tiền xử lý dữ liệu
         * Created by: thanhdt - 12.05.2021
         */
        earlyProcess(){
            this.bookX.publishing_date_name = this.formatDate(this.bookX.publishing_date, 1);
            this.bookX.price = parseInt(this.bookX.price).toFixed(3);
            this.bookX.real_price = parseInt(this.bookX.price * (1 - this.bookX.sale)).toFixed(3);
            this.bookX.total = JSON.parse(this.bookX.comment_json).length;
            this.bookX.rate_point = this.bookX.total?(JSON.parse(this.bookX.comment_json).map(el => el.star).reduce((a, b) => a+b)/this.bookX.total).toFixed(1) : 0;
            this.bookX.comment_json = JSON.parse(this.bookX.comment_json);
            console.log(this.bookX)
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
        /**
         * Hàm format dữ liệu dạng tiền tệ
         * Created by: thanhdt - 12.05.2021
         */
        formatMoney(money){
            return money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            });
        }
    },
    watch: {
        dataSource: {
            handler(val){
                this.dataSourceX = val;
            },
            immediate: true
        },
        dataBook(val){
            this.dataBookX = val;
            this.earlyProcess();
        },
        book: {
            handler(val){
                this.bookX = val;
            },
            immediate: true,
            deep: true
        },
    }
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
    .content .left{
        width: 720px;
        border: 1px solid #D5D5D5;
        box-shadow: 0 1px 2px 2px rgb(0 0 0 / 10%);
        background-color: #fff;
    }
    .content .right{
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
    .l-top .book-avatar{
        padding: 1px;
    }
    .l-top img{
        width: 200px;
        box-shadow: 0 0 4px #8d8d8d;
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
        padding: 16px 24px;
        /* max-height: 100px; */
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
        padding: 48px 48px 0px;
        color: #616161;;
        font-size: 16px;
        line-height: 24px;
        max-height: 165px;
        transition: max-height 0.3s ease-out;
        font-style: italic;
        overflow: hidden;
    }
    .expandClicked{
        max-height: 1000px;
        transition: max-height 0.3s ease-in;
    }
    .expand{
        padding-top: 32px;
    }
    .expand button{
        border: none;
        color: #01579B;
        text-transform: uppercase;
        font-size: 16px;
        padding: 6px 12px;
        border-radius: 4px;
        background-color: #fff;
        outline: none;
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

    .info-circle{
        color: #5f5f5f;
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
        width: fit-content;
        padding: 20px;
        flex-direction: column;
    }
    .user{
        font-size: 12px;
        line-height: 12px;
        margin-right: 2px;
        color: #777777;
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

/* Style cho popup comment */
    .review-popup{
        height: 100%;
        width: 100%;
        background-color: #fff ;
    }
    .review-header{
        height: 60px;
        line-height: 60px;
        text-align: left;
        font-size: 20px;
        color: #fff;
        background-color: #039be5;
        border-radius: 4px 4px 0px 0px;
        padding-left: 20px;
    }
    .review-content{
        padding: 20px 20px 10px 20px;
        height: 90%;
    }
    .content-top{
        text-align: left;
        font-size: 13px;
        margin-bottom: 10px !important;
    }
    .review-content .left{
        height: 230px;
        width: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    .review-content .left img{
        width: 100%;
    }
    .review-content .left p{
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        height: ;
    }
    .review-content .right {
        height: 183px;
        width: 430px;
        padding: 10px;
    }
    .review-content .right textarea{
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        max-height: 100%;
        background-color: #f5f5f5;
        padding: 16px 20px;
    }
    .review-content .right p{
        font-size: 13px;
        font-style: italic;
        text-align: left;
    }
    .review-content .rating {
        margin: 10px 10px 0 0 !important;
        color: #c5c5c5;
        font-size: 40px;
        line-height: 40px;
    }
    .review-content .rating-upper{
        color: #e49a65;
        text-shadow: 0px 2.5px 0 #a2a2a2;
    }
    .review-content .rating-upper span:hover, .rating-lower span:hover{
        color: #e49a65;
    }

/* Style for payment popup */
    .payment-popup{
        position: relative;
        display: flex;
    }
    .payment-popup img{
        width: 160px;
        height: auto;
        position: absolute;
        left: 20px;
    }
    .payment-header{
        height: 112px;
        padding: 4px 20px 20px 210px;
    }
    .payment-header .title{
        /* width: 371px; */
        text-align: left;
        font-size: 30px;
        color: #333333;
        overflow: hidden;
    }
    .payment-header .price{
        /* min-width: 100px; */
        color: #01579B;
        font-size: 24px;
        white-space: nowrap;
        padding-left: 10px;
    }
    .payment-content{
        padding: 0px 20px 0px 210px;
    }
    .payment-content-item{
        padding: 4px;
        height: 34px;
        align-items: center;
        font-size: 13px;
    }
    .payment-content-item .credit-card{
        font-size: 20px;
    }
    .payment-content-item .credit-card-nm{
        padding-left: 10px;
    }



/* Style lại cho star-rating */
  .rating {
  color: #c5c5c5;
  font-size: 30px;
  line-height: 30px;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  padding: 0;
  text-shadow: 0px 0.5px 0 #a2a2a2;
}

.rating-upper {
  color: #e49a65;
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