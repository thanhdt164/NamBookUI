<template>
    <div class="menu">
        <div class="left col-2">
            <img src="../../assets/book.jpg" alt="">
        </div>
        <div class="center col-8">
            <ul>
                <li :class="[state=='genres'?'active':'']"><a>Genres</a></li>
                <div class="vl"></div>
                <li :class="[state=='home'?'active':'']" @click="home"><a>Home</a></li>
                <li :class="[state=='topChart'?'active':'']" @click="topChart"><a>Top chart</a></li>
                <li :class="[state=='newArrivals'?'active':'']" @click="newArrivals"><a>New arrivals</a></li>
            </ul>
        </div>
        <div class="right col-2"></div>
    </div>
</template>

<script>
export default {
    name: 'b-menu',
    props:{
        state:{
            type: String,
            default : 'home'
        }
    },
    methods : {
        home(){
            this.$router.push({ name: 'home'});
            this.state = 'home';
        },
        topChart(){
            this.$router.push({ name: 'topChart'});
            this.state = 'topChart';
            this.$emit('changeState', this.state);
        },
        newArrivals(){
            this.$router.push({ name: 'newArrivals'});
            this.state = 'newArrivals';
        }
    }
}
</script>

<style scoped >
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
        /* border-bottom: 3px solid #F1F1F1; */
    }
    .center li a{
        text-decoration: none;
        color: #737373;
    }
    .center .active{
        color: #333333  !important;
        border-bottom: 3px solid #039BE5;
    }
</style>