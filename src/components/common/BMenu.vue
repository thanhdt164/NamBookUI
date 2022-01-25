<template>
    <div class="menu">
        <div class="left col-2">
            <img src="../../assets/book.jpg" alt="">
        </div>
        <div class="center col-8">
            <ul>
                <li @click="genresClicked" :class="[stateX=='book-by-genres'?'active':'', 'flex']"><a>Thể loại</a>
                    <div class="drop-icon">
                        <font-awesome-icon icon="caret-down" class="caret-down"/>
                    </div>
                </li>
                <div class="vl"></div>
                <li :class="[stateX=='home'?'active':'']" @click="changeHomeState"><a>Trang chủ</a></li>
                <li :class="[stateX=='top-chart'?'active':'']" @click="ChangeTopChartState"><a>Xếp hạng</a></li>
                <li :class="[stateX=='new-arrivals'?'active':'']" @click="changeNewArrivalsState"><a>Mới cập nhật</a></li>
            </ul>
            <div :class="[isOpenGenresMenu?'genres-menu-enable':'', 'genres-menu']">
                <div class="top-genres-menu">
                    EBooks
                </div>
                <hr>
                <div @click="filterBookByGenres(genresItem.genres_id)" class="genres-menu-item" v-for="(genresItem, id) in genresX" :key="id">
                    {{genresItem.genres_nm}}
                </div>
                
            </div>
        </div>
        <div class="right col-2"></div>
    </div>
</template>

<script>
import genresAPI from '@/api/genresAPI.js'

export default {
    name: 'b-menu',
    data(){
        return {
            genresX: null,
            stateX: null,
            isOpenGenresMenu: false
        }
    },
    props:{
        state:{
            type: String,
            default : null
        }
    },
    created(){
        this.getGenres();
    },
    methods : {
        changeHomeState(){
            if(this.stateX != 'home'){
                this.$router.push({ name: 'home'});
                this.stateX = 'home';
                this.$emit('changeState', this.stateX);
            }
        },
        ChangeTopChartState(){
            if(this.stateX != 'top-chart'){
                this.$router.push({ name: 'top-chart'});
                this.stateX = 'top-chart';
                this.$emit('changeState', this.stateX);
            }
        },
        changeNewArrivalsState(){
            if(this.stateX != 'new-arrivals'){
                this.$router.push({ name: 'new-arrivals'});
                this.stateX = 'new-arrivals';
                this.$emit('changeState', this.stateX);
            }
        },
        /**
         * Hàm lấy toàn bộ genres
         * Created by: thanhdt - 09.05.2021
         */
        getGenres(){
            genresAPI.getAll( res => {
                this.genresX = res;
            })
        },
        /**
         * Hàm click vào genres menu
         * Created by: thanhdt - 09.05.2021
         */
        genresClicked(){
            this.isOpenGenresMenu = !this.isOpenGenresMenu;
        },
        /**
         * Hàm lấy chuyển trang sang màn lọc sách theo filter
         * Created by: thanhdt - 09.05.2021
         */
        filterBookByGenres(genresId){
            this.isOpenGenresMenu = !this.isOpenGenresMenu;
            if(this.$route.params.genresId != genresId){
                this.stateX = 'book-by-genres';
                this.$emit('changeState', this.stateX);
                this.$router.push({name : 'book-by-genres', params: { genresId: genresId } });
            }
        }

    },
    watch: {
        state:{
            handler(val){
                this.stateX = val;
            },
            immediate: true
        }
    }
}
</script>

<style scoped >
    .flex {
        display: flex;
        align-items: center;
    }
    .menu{
        /* height: 50px; */
        display: flex;
        align-items: center;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background: #fff;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
        z-index: 100;
        height: 43px;
    }
    .vl{
        margin-right: 2px;
        height: 28px;
        width: 2px;
        background: #D6D6D6;
        position: relative;
        top: 8px;
    }
    .left, .center, .right{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .left img{
        height: 43px;
        margin-left: 10px !important;
    }
    .center{
        padding: 0;
        position: relative;
    }
    .center ul{
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
    }
    .center li{
        height: 100%;
        cursor: pointer;
        padding: 8px 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .center li:hover{
        background-color: #F1F1F1;
    }
    .center li a{
        text-decoration: none;
        color: #737373;
    }
    .center li.active a{
        color: #333333  !important;
    }
    .center .active{
        border-bottom: 3px solid #039BE5;
    }

    .drop-icon{
        /* width: 25px;
        height: 25px; */
        padding: 5px 0px 3px 5px;
        display: flex;
        align-items: center;
    }
    .caret-down{
        font-size: 15px;
        color: #7D7D7D;
    }
    .genres-menu{
        position: absolute;
        left: 0;
        top: 40px;
        z-index: 100;
        background-color: #fff;
        max-width: 404px;
        box-shadow: 0 2px 40px rgb(0 0 0 / 40%);
        justify-content: space-between;
        border-radius: 2px;
        display: flex;
        flex-wrap: wrap;
        display: none;
    }
    .genres-menu-enable{
        display: flex;
    }
    .top-genres-menu{
        padding: 6px 14px;
        color: #333333;
        font-size: 15px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: left;
        width: 100%;
    }
    .genres-menu hr{
        width: 94%;
        position: relative;
        left: 3%;
    }
    .genres-menu-item{
        padding: 6px 14px;
        color: #333333;
        font-size: 13px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 200px;
        height: 30px;
        text-align: left;
    }
    .genres-menu-item:hover{
        cursor: pointer;
        background-color: #F1F1F1;
    }
    .genres-menu-item:active{
        background-color: #D6D6D6;
    }
</style>