<template>
    <header class="b-container ">
        <div class="logo col-2">
            <img src="https://www.gstatic.com/android/market_images/web/play_prism_hlock_2x.png" alt="">
        </div>
        <div class="search col-6">
            <input type="text" placeholder="Search">
            <button type="button" class="btn btn-primary" >
                <font-awesome-icon icon="search" class="icon-search"/>
            </button>
            
        </div>
        <div class="space col-2"></div>
        <div class="avatar col-2">
            <div class="toggle">
                <font-awesome-icon icon="shopping-cart" class="shopping-cart" @click="cartClicked"/>
                <CBadge color="danger" class="mfs-auto" @click="cartClicked">{{2}}</CBadge>
            </div>
            <div class="img" >
                <!-- <img id="id-avatar" src="https://lh3.googleusercontent.com/ogw/ADGmqu9HKP2aukmMBAbPzUiv7aM7E9WJ1sXtDvJr7iXm=s32-c-mo" alt=""> -->
                <BDropdownHeader :userInfo="userInfoX"/>
            </div>
        </div>
    </header>
</template>

<script>
import BDropdownHeader from '@/containers/BDropdownHeader.vue'
export default {
    name: 'b-header',
    data(){
        return {
            userInfoX : null
        }
    },
    components:{
        BDropdownHeader
    },
    props:{
        userInfo: {
            type: Object,
            default: null
        }
    },
    watch:{
        userInfo: {
            handler(val){
                this.userInfoX = val
            },
            immediate: true
        }
    },
    methods: {
        cartClicked(){
            this.$emit("cardClicked")
            this.$router.push({ name: 'shopping-cart'})
        }
    },
}
</script>

<style scoped>
    .b-container{
        height: 68px;
        background-color: #F1F1F1;
        display: flex;
        align-items: center;
        background-image: url("../../assets/header.png");
        background-size: 214px;
    }
    .logo, .search, .space, .avatar{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .logo img{
        padding: 8px 8px 8px 10px;
        height: 50px;
        max-width: 100%;
    }
    .search input{
        padding-left: 10px;
        width: 600px;
        height: 32px;
        font-size: 15px;
        border: none;
        border-radius: 4px 0px 0px 4px;
        outline: none;
    }
    .search button{
        height: 32px;
        width: 60px;
        border-radius: 0px 4px 4px 0px;
        line-height: 16px;
    }
    .avatar img{
        height: 32px;
        width: 32px;
        border-radius: 50%;
        position: relative;
        left: 175px;
    }
    .avatar .toggle{
        position: relative;
        left: 165px;
        font-size: 20px;
        top: 56px;
        z-index: 1000;
    }
    .shopping-cart{
        font-size: 20px;
        color: #6D6D6D;
        cursor: pointer;
    }
    .shopping-cart:active{
        color: #333;
    }
    .badge{
        position: absolute;
        top: 0;
        right: -3px;
        font-size: 8px;
        border-radius: 40%;
        cursor: pointer;
    }

    .icon-search{
        size: 16px;
    }
</style>