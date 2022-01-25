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
                :isShowSeeMore="isShowSeeMore"
                @paymentHome="paymentHome"
            ></b-box>
            <DxToast
                :visible="isVisibleToast"
                :message="messageToast"
                :type="typeToast"
                position="bottom left"
            />
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
                                <img :src="bookX.author_avatar">
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
                        <span v-show="bookX.price" class="price">{{formatCurrency(bookX.price)}}</span>
                        <span class="real-price">{{bookX.price>0?formatCurrency(bookX.price * (1-bookX.sale)):'Miễn phí'}}</span>
                        {{bookX.price>0?'Đặt sách':''}}
                    </button>
                </div>
            </div>
            <!-- left summary -->
            <div :class="[expandClicked?'expandClicked':'', 'summary']">
                {{bookX.description}}
            </div>
            <div class="expand">
                <button v-if="!expandClicked" @click="expand">Xem thêm</button>
                <button v-else @click="expand">Thu gọn</button>
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
                        <font-awesome-icon icon="pen" class="pen" /> Viết bình luận
                    </button>
                </div>
                <div class="rate flex">
                    <div class="rate-number">{{bookX.rate_point}}</div>
                    <div class="rate-star">
                        <div class="rating">
                        <div class="rating-upper" :style="`width: ${parseFloat(bookX.rate_point)*20}%`">
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
                         <font-awesome-icon icon="user" class="user"/> {{bookX.total}} đánh giá
                    </div>
                </div>
                <div class="review-box">
                    <b-review-item 
                        v-for="(comment, id) in bookX.comment_json" :key="id"  
                        :comment="comment"
                        :userInfo="userInfo"
                        :bookX="bookX"
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
                <div class="title col-8">Sách liên quan</div>
                <div class="see-more col-4">
                    <button v-if="false" type="button" class="btn btn-primary">Xem thêm</button>
                </div>
            </div>
            <div class="r-body">
                <b-item-card-2
                  v-for="(dataBookItem, id) in dataBookX.filter(el=>el.book_id != bookX.book_id).slice(0, 5)" :key="id"
                  v-show="dataBookX && dataBookX.length"
                  :dataBookItem="dataBookItem"
                  v-model="dataBookX"
                  @bookClicked="bookClicked"
                ></b-item-card-2>
            </div>
        </div>
        <DxToast
            :visible="isVisibleToast"
            :message="messageToast"
            :type="typeToast"
            position="bottom left"
        />
    </div>
    <!-- Trang shopping cart -->
    <div 
      v-if="isShoppingCart"
      class="content shoping-cart-content">
        <div class="cart-payment-all" v-if="dataCart && dataCart.length > 0">
            <button class="" @click="paymentClicked">Thanh toán toàn bộ</button>
        </div>
        <div v-else class="no-data">Không có dữ liệu!!</div>
        <div v-for="(itemDataCart,id) in dataCart" :key="id" class="box-cart flex">
            <div class="cart-left">
                <img :src="itemDataCart.bookData.avatar" alt="">
            </div>
            <div class="cart-center col-8">
                <h6>{{itemDataCart.bookData.book_nm}}</h6>
                <p>Tác giả: {{itemDataCart.bookData.author_nm}}</p>
            </div>
            <div class="cart-right">
                <div class="cart-r-t">
                    <div class="cart-amount">
                        Số lượng:
                        <input type="number" step="1" v-model="itemDataCart.amount" :min="1" :max="itemDataCart.maxAmount" @change="changeAmount(itemDataCart)">
                    </div>
                    <font-awesome-icon icon="trash" class="trash" @click="updateCartInfo(itemDataCart, 'delete')"/>
                    <font-awesome-icon v-if="itemDataCart.checked" icon="check-square" class="check-square" @click="itemDataCart.checked=!itemDataCart.checked"/>
                    <font-awesome-icon v-if="!itemDataCart.checked" icon="square" class="check-square" @click="itemDataCart.checked=!itemDataCart.checked"/>
                </div>
                <div class="cart-r-c">
                    <div class="cart-price">{{formatCurrency(parseInt(itemDataCart.amount) * itemDataCart.bookData.price)}}</div>
                    <div class="cart-rate">
                        <div class="rating">
                        <div class="rating-upper" :style="`width: ${parseFloat(itemDataCart.rate_point*20)}%`">
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
                    <div class="cart-sales">{{itemDataCart.bookData.sales}} Lượt bán</div>
                </div>
                <div class="cart-r-b flex">
                    <button class="preview" @click="() => {$router.push({name:'book-detail', params: {bookId: itemDataCart.bookData.book_id }})}">
                        Xem trước
                    </button>
                    <button class="buy" @click="paymentClicked(itemDataCart.bookData)">
                        <font-awesome-icon icon="cart-arrow-down" class="cart-arrow-down"/>
                    </button>
                </div>
            </div>
        </div>
        <DxToast
            :visible="isVisibleToast"
            :message="messageToast"
            :type="typeToast"
            position="bottom left"
        />
    </div>
    <div class="content profile-content" 
        v-if="isProfile">
        <div class="profile-inside">
            <div class="p-background">
                <img src="https://image.shutterstock.com/image-photo/abstract-ocean-art-natural-luxury-600w-1040400583.jpg" alt="">
            </div>
            <div class="p-content">
                <div class="p-avatar">
                    <img :src="userInfo.user_avatar?userInfo.user_avatar:'https://lh3.googleusercontent.com/ogw/ADGmqu9HKP2aukmMBAbPzUiv7aM7E9WJ1sXtDvJr7iXm=s32-c-mo'" alt="">
                </div>
                <div class="p-text">
                    <CRow>
                        <CCol md="12" style="height: 100%">
                            <CCard>
                                <CCardHeader>
                                    <strong>Thông tin chung</strong>
                                </CCardHeader>
                                <CCardBody>
                                    <CForm>
                                    <CInput
                                        description="Thông tin địa chỉ."
                                        label="Địa chỉ"
                                        horizontal
                                        autocomplete="name"
                                        v-model="userInfo.address"
                                        :disabled="!isEditProfile"
                                    />
                                   <!--  <CInput
                                        label="Ngày sinh"
                                        horizontal
                                        :type="isEditProfile?'date':'date'"
                                        description="Thông tin ngày sinh."
                                        v-model="varNgay"
                                        :disabled="!isEditProfile"
                                    /> -->
                                    
                                    <CRow form class="form-group">
                                        <CCol tag="label" sm="3" class="col-form-label">
                                        Giới tính
                                        </CCol>
                                        <CCol>
                                            <CInputCheckbox
                                                :label="userInfo.gender?'Nam':'Nam'"
                                                horizontal
                                                :checked="userInfo.gender"
                                                description="Thông tin giới tính."
                                                :disabled="!isEditProfile"
                                                
                                                @update:checked="changeGender"
                                            />
                                        </CCol>
                                    </CRow>
                                    <CInput
                                        label="Email"
                                        description="Thông tin địa chỉ email."
                                        type="email"
                                        horizontal
                                        autocomplete="email"
                                        v-model="userInfo.email"
                                        :disabled="!isEditProfile"
                                    />
                                    <CInput
                                        label="Số điện thoại"
                                        horizontal
                                        description="Thông tin số điện thoại."
                                        v-model="userInfo.phone_number"
                                        :disabled="!isEditProfile"
                                    />
                                    </CForm>
                                </CCardBody>
                                <CCardFooter>
                                    <CButton v-if="!isEditProfile" @click="editProfileClicked" size="sm" color="primary"><CIcon name="cil-pencil"/> Chỉnh sửa</CButton>
                                    <CButton v-else @click="saveProfileClicked" size="sm" color="success"><CIcon name="cil-check-circle"/> Lưu</CButton>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
                <div class="p-under">
                    <div class="p-name"> {{userInfo.user_nm}} </div>
                    <div class="p-role"> {{userInfo.role_ids.includes("4")?"Quản trị viên":"Người dùng"}}</div>
                </div>
            </div>
        </div>
        <DxToast
            :visible="isVisibleToast"
            :message="messageToast"
            :type="typeToast"
            position="bottom left"
        />
    </div>
    <!-- Popup review -->
    <DxPopup
      v-if="bookX?true:false"
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
                        <textarea v-model="dataReviewPopup.commentText" placeholder="Tell others what you think about this book. Would you recommend it, and why?"/>
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
    <!-- Popup addToCart -->
    <DxPopup
      v-if="dataPaymentPopup.bookData"
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
      <!-- <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="submitPaymentButtonOptions"
      /> -->
        <div class="payment-popup">
            <img :src="dataPaymentPopup.bookData.avatar" alt="">
            <div>
                <div class="payment-header flex">
                    <div class="title">The De-Textbook: The Stuff You Didn't Know About the Stuff You Thought You Knew</div>
                    <div class="price">{{formatCurrency(dataPaymentPopup.bookData.price * (1-dataPaymentPopup.bookData.sale))}}</div>
                </div>
                <div class="payment-content">
                    <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div>
                    <!-- <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div>
                    <div class="payment-content-item flex">
                        <font-awesome-icon icon="credit-card" class="credit-card"/>
                        <div class="credit-card-nm">Add credit or debit card</div>
                    </div> -->
                </div>
            </div>
        </div>
    </DxPopup>
     <!-- Popup Cart Payment -->
    <DxPopup
      v-if="true"
      v-model="bookData"
      :visible.sync="isShowCartPaymentPopup"
      :drag-enabled="true"
      :close-on-outside-click="true"
      :show-close-button="false"
      :show-title="false"
      title=""
      width="720px"
      height="430px"
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
        :options="cartPaymentButtonOptions"
      />
        <div class="cart-payment-popup">
            <div class="cart-payment-header">
                Payment
            </div>
            <div class="cart-payment-content">
                <div v-for="(item,id) in dataCartPopup" :key="id" v-show="item.checked" class="cart-payment-item flex">
                    <div class="cpi-left">
                        <img :src="item.bookData.avatar" alt="">
                    </div>
                    <div class="cpi-center">
                        <div class="title">{{item.bookData.book_nm}}</div>
                    </div>
                    <div class="cpi-right">
                        <div class="price">{{formatCurrency(parseInt(item.amount) * item.bookData.price)}}</div>
                    </div>
                </div>
                <div class="cart-payment-total flex">
                    <div class="total-label">Total:</div>
                    <div class="total-value">{{(totalPricePayment())}}</div>
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
import { DxToast } from 'devextreme-vue/toast';
import cartAPI from '@/api/cartAPI.js'
import userAPI from '@/api/userAPI.js'
import storageAPI from '@/api/storageAPI.js'
import detailOrdersAPI from '@/api/detailOrdersAPI.js'
import commentAPI from '@/api/commentAPI.js'
import moment from 'moment'

export default {
    name: 'b-content',
    components: { 
        'b-box': Bbox,
        'b-item-card-2': BItemCard2,
        'b-review-item': BReviewItem,
        DxPopup,
        DxPosition,
        DxToolbarItem,
        DxToast,
    },
    data(){
        return {
            userInfo: null,
            dataBookX: [],
            bookX: null,
            dataSourceX: [],
            expandClicked: false,
            closeCommentButtonOptions: {
                text: 'Đóng',
                onClick: () => {
                    this.dataReviewPopup.isShowReviewPopup = false;
                }
            },
            submitCommentButtonOptions:{
                text: 'Gửi bình luận',
                onClick: () => {
                    this.dataReviewPopup.isShowReviewPopup = false;
                    this.handleComment();
                }
            },
            dataReviewPopup:{
                isShowReviewPopup: false,
                headerText: 'Review by ...',
                bookAvatar: "https://books.google.com/books/content/images/frontcover/HqxNvKCx04wC?fife=w160-h230",
                commentText: "",
                commentStar: 1
            },
            closePaymentButtonOptions: {
                text: 'Thêm vào giỏ hàng',
                onClick: () => {
                    this.dataPaymentPopup.isShowPaymentPopup = false;
                    this.addToCart();
                }
            },
            submitPaymentButtonOptions:{
                text: 'Thanh toán',
                onClick: () => {
                    this.dataPaymentPopup.isShowPaymentPopup = false;
                    this.handlePayment();
                }
            },
            dataPaymentPopup:{
                isShowPaymentPopup: false,
                bookData: null
            },
            dataCart:[
                {
                    bookData: {
                        book_id: 1,
                        book_nm: "Dear Bob: Bob Hope's Wartime Correspondence with the G.I.s of World War II",
                        price: 80.658,
                        sale: 0.1,
                        sales: 123,
                        author_nm: "Thích Nhat Hanh",
                        comment_json: {

                        }
                    },
                    checked: true,
                    totalPrice: null,
                    maxAmount: 5,
                    amount: 1
                },
                {
                    bookData: {
                        book_id: 1,
                        book_nm: "Dear Bob: Bob Hope's Wartime Correspondence with the G.I.s of World War II",
                        price: 80.658,
                        sale: 0.1,
                        sales: 123,
                        author_nm: "Thích Nhat Hanh",
                        comment_json: {

                        }
                    },
                    checked: true,
                    totalPrice: null,
                    maxAmount: 5,
                    amount: 1
                },
            ],
            dataCartPopup: [],
            isShowCartPaymentPopup: false,
            cartPaymentButtonOptions:{
                text: 'Payment',
                onClick: () => {
                    this.isShowCartPaymentPopup = false;
                    this.handleCartPayment();
                }
            },
            dataPaymentCart: [],
            /* Thông báo */
            isVisibleToast: false,
            messageToast: "Thành công",
            typeToast: "success",
            /* Profile */
            isEditProfile: false,

            varNgay: "2010-07-06",
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
        },
        isShowSeeMore: {
            type: Boolean,
            default: true
        },
        isShoppingCart : {
            type: Boolean,
            default: false
        },
        dataShoppingCart: {
            type: Object,
            default: null
        },
        isProfile:{
            type: Boolean,
            default: false
        }
    },
    created(){
        /* Lấy thông tin người dùng */
        let accountName = localStorage.getItem('acc-name')
        let expiredTime = new Date(localStorage.getItem('exp-time'))
        let now = new Date(moment())
        if(expiredTime > now){
            userAPI.getUserInfo(accountName, (res)=>{
                this.userInfo = res;
                // this.getDataShoppingCart(this.userInfo.cart_id);
            })
        }else{
            this.$router.push({ name: 'Login'})
        }
    },
    methods: {
        changeGender(val){
            this.userInfo.gender = val?1:0;
        },
        editProfileClicked(){
            this.isEditProfile = true;
        },
        saveProfileClicked(){
            // Lưu dữ liệu người dùng
            userAPI.Update(this.userInfo, (res) => {
                console.log(res)
            })
            this.showToast();
            this.isEditProfile = false;
        },
        /**
         * Hiển thị thông báo
         */
        showToast(message = "Thành công", type = true) {
            this.isVisibleToast = false;
            setTimeout(() => {
                this.isVisibleToast = true;
            }, 0);
            this.messageToast = message;
            this.typeToast = type? 'success' : 'error';
        },
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
         * Thêm sách vào cart
         * Created by: thanhdt - 05.06.2021
         */
        addToCart(){
            var bookId = this.dataPaymentPopup.bookData.book_id;
            storageAPI.getAmountInstorage({book_id: bookId}, (res) => {
                if(res[0]>0){
                    let dataAddToCart= {
                        bookData: this.dataPaymentPopup.bookData,
                        amount: 1,
                        checked: true,
                        totalPrice: null,
                        maxAmount: res[0],
                    }
                    let cartModel = null
                    /* Lấy thông tin shopping cart của user */
                    cartAPI.getCartInfo(this.userInfo.user_id, (res) => {
                    cartModel = res;
                    cartModel.cart_json = JSON.parse(cartModel.cart_json)
                    cartModel.cart_json.push(dataAddToCart)
                    cartModel.cart_json = JSON.stringify(cartModel.cart_json)

                    /* Cập nhật lại thông tin shopping cart */
                        cartAPI.updateCart(cartModel)
                        this.showToast();
                    })
                }else{
                    this.showToast("Sách đã hết", false);
                }
            })

            
        },
        /**
         * Hàm tính tổng tiền trước thanh toán
         * Created by: thanhdt - 05.06.2021
         */
        totalPricePayment(){
            let rs = 0;
            this.dataCartPopup.forEach(el=>{
                if(el.checked){
                    rs += el.bookData.price * el.amount;
                }
            })
            return this.formatCurrency(rs);
        },
        /**
         * Hàm xử lý trước thanh toán
         * Created by: thanhdt - 05.06.2021
         */
        paymentClicked(bookData){
            if(bookData.book_id){
                this.dataCartPopup = this.dataCart.filter(el => el.bookData.book_id == bookData.book_id);
                /* Set giá trị cho dataPaymentCart */
                this.dataPaymentCart = this.dataCart.filter(el => el.bookData.book_id == bookData.book_id && el.checked);
            }else{
                this.dataCartPopup = this.dataCart;
                /* Set giá trị cho dataPaymentCart */
                this.dataPaymentCart = this.dataCart.filter(el => el.checked);
            }
            this.openCartPaymentPopup();
        },
        /**
         * Hàm mở popup payment cart
         * Created by: thanhdt - 05.06.2021
         */
        openCartPaymentPopup(){
            this.isShowCartPaymentPopup = true;
        },
        /**
         * Hàm xử lý thay đổi số lượng sách mua
         */
        changeAmount(item){
            if(parseInt(item.amount)>item.maxAmount){
                item.amount = item.maxAmount;
            }else if(parseInt(item.amount)<1){
                item.amount = 1;
            }
        },
        /**
         * Hàm xác nhận thank toán
         */
        handleCartPayment(){
            var me = this;
            // Sử dụng dataPaymentCart để làm parram
            var param = {
                book_ids: [],
                user_id: this.userInfo.user_id,
                amounts: []
            };
            this.dataPaymentCart.forEach(el => {
                param.book_ids.push(el.bookData.book_id);
                param.amounts.push(el.amount);
            })
            detailOrdersAPI.insertDetailOrders(param, (res) => {
                // Thanh toán thành công
                me.showToast("Thành công", res?true:true)
                // Thực hiển bỏ sách khỏi giỏ hàng
                me.updateCartInfo(me.dataPaymentCart, 'delete')

            })
        },

        /**
         * Hàm xử lý payment ở trang home
         * Created by: thanhdt 25.05.2021
         */
        paymentHome(book){
            this.dataPaymentPopup.isShowPaymentPopup = true;
            this.dataPaymentPopup.bookData = book;
        },
        /**
         * Hàm xử lý click comment button
         * Created by: thanhdt - 15.05.2021
         */
        btnCommentClicked(){
            this.dataReviewPopup.isShowReviewPopup = true,
            this.dataReviewPopup.bookAvatar = this.bookX.avatar;
            this.dataReviewPopup.headerText = `Bình luận bởi ${this.userInfo.user_nm}`
        },
        /**
         * Hàm xử lý khi submit comment
         * Created by: thanhdt - 15.05.2021
         */
        handleComment(){
            /* xử lý lưu comment */
            var newComment = {
                comment_date: new Date(),
                comment_date_name: null,
                content: this.dataReviewPopup.commentText,
                star: this.dataReviewPopup.commentStar,
                user_avatar: this.userInfo.user_avatar,
                user_id: this.userInfo.user_id,
                user_nm: this.userInfo.user_nm,
                voted: []
            }
            
            this.bookX.comment_json.push(newComment)
            this.bookX.total +=1;
            this.bookX.rate_point = (((this.bookX.total-1)*parseInt(this.bookX.rate_point)+this.dataReviewPopup.commentStar)/this.bookX.total).toFixed(1);
            commentAPI.updateComment({
                comment_id: this.bookX.book_id,
                comment_json: JSON.stringify(this.bookX.comment_json)
            }).then(res => {
                console.log(res)
            }).catch(er => console.log(er))

            /* set lại giá trị mặc định cho dataReview */
            this.dataReviewPopup.commentStar = 1;
            this.dataReviewPopup.commentText = "";  
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
            this.bookX.price = (parseInt(this.bookX.price));
            this.bookX.real_price = (parseInt(this.bookX.price * (1 - this.bookX.sale)));
            this.bookX.total = JSON.parse(this.bookX.comment_json).length;
            this.bookX.rate_point = this.bookX.total?(JSON.parse(this.bookX.comment_json).map(el => el.star).reduce((a, b) => a+b)/this.bookX.total).toFixed(1) : 0;
            this.bookX.comment_json = JSON.parse(this.bookX.comment_json);
        },

        /**
         * Hàm tiền xử lý dữ liệu
         * Created by: thanhdt - 12.05.2021
         */
        earlyProcess2(){
            this.dataCart.forEach(el => {
                el.total = JSON.parse(el.comment_json).length;
                el.rate_point = el.total?(JSON.parse(el.comment_json).map(it => it.star).reduce((a, b) => a+b)/el.total).toFixed(1) : 0;
                el.comment_json = JSON.parse(el.comment_json);
                console.log(el)
            })
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
            if(type == 3){
                return `${mo} ${da} ${ye}`
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
        },
        /**
         * Hàm cập nhật dữ liệu cart
         * Created by: thanhdt - 12.05.2021
         */
        updateCartInfo(val, action){
            if(action == 'delete'){
                if(val.length){
                    val.forEach(item => {this.dataCart = this.dataCart.filter(el => el.bookData.book_id != item.bookData.book_id)})
                }else{
                    this.dataCart = this.dataCart.filter(el => el.bookData.book_id != val.bookData.book_id);
                }
                 /* Lấy thông tin shopping cart của user */
                cartAPI.getCartInfo(this.userInfo.user_id, (res) => {
                    let cartModel = res;
                    cartModel.cart_json = JSON.stringify(this.dataCart)
                    /* Cập nhật lại thông tin shopping cart */
                    cartAPI.updateCart(cartModel)
                })
            }
        },
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
                this.dataPaymentPopup.bookData = val;
            },
            immediate: true,
            deep: true
        },
        dataShoppingCart:{
            handler(val){
                this.dataCart = val.cart_json;
                this.earlyProcess2();
                this.dataCartPopup = this.dataCart;
            }
        },
    }
}
</script>

<style lang="scss">
.dx-toast-content {
    min-width: 300px;
    max-width: 400px;
}
.form-text{
    margin-top: 0 !important;
    margin-bottom: 1rem;
}
</style>
<style scoped lang="scss" >
.card-body{
    height: 389px;
}
* { margin: 0 !important; }
    .col-2{
        padding: 0;
    }
    .content{
        background-color: #F1F1F1;
        min-height: 100vh;
        padding: 30px 10% 30px 16%;
        background-image: url("https://images.unsplash.com/photo-1512903491135-76ec8a4510b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60");
        // background-image: url("https://images.unsplash.com/photo-1514466256797-efd55fa1bf4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=663&q=80");
        background-size: 100vw;
        // background-repeat: no-repeat;
    }
    .isGenresFilter{
        padding: 30px 8% 30px 16%;
    }
    .box{
        margin-bottom: 20px;
        border-radius: 4px;
    }
    .shoping-cart-content{
        padding: 30px 15% 30px 20%;    
        .no-data{
            font-size: 28px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            color: #333333;
            color: #fff;
        }
    }
    .cart-payment-all{  
    
    }
    .cart-payment-all button {
        font-size: 14px;
        font-weight: bold;
        color: #666666;
        height: 36px;
        line-height: 34px;
        padding: 0 20px;
        border-radius: 4px;
        border: 1px solid #a2a2a2;
        background-color: #fff;
        position: relative;
        left: 84.4%;
        margin-bottom: 10px !important;
    }
    .cart-payment-all button:hover{
        box-shadow: 0 1px 0 0 rgb(0 0 0 / 27%);
        cursor: pointer;
        color: hsl(87, 58%, 45%);
        border-color: hsl(87, 58%, 45%);
    }
    .box-cart{
        padding: 16px;
        position: relative;
        height: 228px;
        background-color: #fff;
        border-radius: 4px;
        font-family: "Roboto", sans-serif;
        margin-bottom: 10px !important;
    }
    .cart-left img{
        height: 196px;
        width: auto;
        border-radius: 2px;
    }
    .cart-center{
        padding: 0px 10px !important;
        font-family: "Roboto", sans-serif;
    }
    .cart-center h6{
        font-weight: bold;
        line-height: 30px;
    }
    .cart-center p{
        font-size: 13px;
        line-height: 20px;
        /* padding-left: 10px; */
    }
    .cart-center h6:hover{
        text-decoration: underline;
    }
    .cart-right{
        position: absolute;
        top: 16px;
        right: 16px;
        height: calc(100% - 32px);
        border-left: 1px solid hsl(0, 0%, 90%);
        padding: 0 10px;
    }
    .cart-r-t{
        height: 36px;
        line-height: 36px;
        position:relative;
    }
    .cart-r-t .check-square{
        font-size: 23px;
        position: absolute;
        right: 4px;
        top: 7px;
        cursor: pointer;
    }
    .cart-r-t .trash{
        font-size: 20px;
        position: absolute;
        right: 36px;
        top: 7px;
        cursor: pointer;
    }
    .cart-amount{
        font-size: 14px;
        color: #666666;
        font-weight: bold;
    }
    .cart-amount input{
        width: 50px;
        height: 27px;
        border: none;
        outline: none;
        font-family: "Roboto", sans-serif;
        font-weight: bold;
        padding-left: 4px;
    }

    .cart-r-c{
        height: calc(100% - 76px);
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .cart-r-c .cart-price{
        font-size: 18px;
        color: #4d4d4d;
        font-weight: bold;
    }

    .cart-r-c .cart-rate .rating{
        font-size: 20px;
    }
    .cart-r-c .cart-sales{
        font-size: 13px;
    } 
    .cart-r-b{
        height: 40px;
    }
    .cart-r-b .preview{
        width: 175px;
        height: 100%;
        font-size: 14px;
        font-weight: bold;
        color: #666666;
        border: 1px solid;
        border-color: hsl(0, 0%, 80%);
        outline: none;
        border-radius: 3px;
        margin-right: 4px !important;
        background-color: #fff;
    }
    .cart-r-b .preview:hover{
        background-color: #CCCCCC;
        color: #fff;
    }
    .cart-r-b .buy{
        height: 40px;
        width: 40px;
        border: 1px solid;
        border-color: hsl(87, 58%, 45%);
        border-radius: 3px;
        background-color: #fff;
    }
    .cart-r-b .buy:hover{
        background-color: hsl(87, 58%, 45%);
        .cart-arrow-down{
            color: #fff;
        }
    }
    .cart-r-b .buy .cart-arrow-down{
        color: hsl(87, 58%, 45%);
    }
    .cart-r-b .buy .cart-arrow-down:hover{
        color: #fff;
    }

/* Cart payment popup */
    .cart-payment-popup{
        font-family: "Roboto", sans-serif;
    }
    .cart-payment-header{
        height: 60px;
        background-color: #039be5;
        color: #fff;
        padding-left: 20px;
        font-size: 20px;
        line-height: 60px;
        border-radius: 4px 4px 0px 0px;
    }
    .cart-payment-content{
        overflow-x: hidden;
        height: 260px;
        margin: 10px 0 !important;
    }
    .cart-payment-item{
        margin-bottom: 12px !important;
       
    }
    .cpi-left{
        width: 92px;
        display: flex;
        justify-content: space-around;
    }
    .cpi-left img{
        height: 120px;
        width: auto;
    }
    .cpi-center{
        padding: 10px 20px;
        width: 450px;
        border-bottom: 1px solid #AAA;
        margin-right: 10px !important;
    }
    .cpi-right{
        display: flex;
        align-items: center;
        width: 100px;
        padding-left: 10px;
        border-bottom: 1px solid #AAA;
    }
    .cart-payment-total{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        color: #666666;
        font-weight: bold;
    }
    .cart-payment-total .total-label{
        width: 500px;
        text-align: right;
    }
    .cart-payment-total .total-value{
        padding-left: 8px;
        font-weight: bold;
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
        color: #fff;
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
        position: relative;
        left: 42%;
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
        position: relative;
        left: 20%;
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
        align-self: center;
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
        top: 10px;
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

    /* Style cho trang profile */
    .profile-content{
        // padding: 30px 15% 30px 20%;    
        height: 100%;
        .profile-inside{
            // height: calc(100vh - 60px);
            height: calc(100vh - 31px);
            background-color: #fff;
            border-radius: 16px;
            .p-background{
                img{
                    object-fit: cover;
                    object-position: 0% 0%;
                    // width: 1251px;
                    width: 100%;
                    height: 300px;
                    border-radius: 16px 16px 0 0;
                }
            }
            .p-content{
                position: relative;
                .p-avatar{
                    height: 212px;
                    width: 212px;
                    position: absolute;
                    border-radius: 50%;
                    // left: calc(50% - 106px);
                    left: 50px;
                    top: -100px;
                    padding: 6px;
                    background-color: #fff;
                    img{
                        object-fit: cover;
                        object-position: 0% 0%;
                        width: 200px;
                        height: 200px;
                        border-radius: 50%;
                    }
                }
                .p-text{
                    position: absolute;
                    left: 312px;
                    width: calc(100% - 312px);
                }
                .p-under{
                    position: absolute;
                    top: 120px;
                    right: calc(100% - 312px);
                    width: 312px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .p-name{
                        font-size: 30px;
                        font-weight: 500;
                        line-height: 50px;
                        overflow: hidden;
                        white-space: nowrap;
                        max-width: 250px;
                        text-overflow: ellipsis;
                    }
                    .p-role{
                        font-size: 24px;
                        background-color: #005977;
                        padding: 4px 24px;
                        border-radius: 30px;
                        color: #fff;
                        font-weight: 400;
                        vertical-align: center;
                        margin-top: 10px !important;
                    }
                }
            }
        }
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