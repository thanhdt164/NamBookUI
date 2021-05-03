<template>
    <header class="b-container ">
        <div class="logo col-2">
            <img src="https://www.gstatic.com/android/market_images/web/play_prism_hlock_2x.png" alt="">
        </div>
        <div class="search col-6">
            <input type="text" placeholder="Search">
            <button type="button" class="btn btn-primary">
                <i class="fas fa-search" style="width: 20px; height: 20px"></i>
            </button>
            
        </div>
        <div class="space col-2"></div>
        <div class="avatar col-2">
            <div class="toggle"></div>
            <div class="img">
                <img src="https://lh3.googleusercontent.com/ogw/ADGmqu9HKP2aukmMBAbPzUiv7aM7E9WJ1sXtDvJr7iXm=s32-c-mo" alt="">
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'b-header',
}
</script>

<style scoped>
    .b-container{
        height: 60px;
        background-color: #F1F1F1;
        display: flex;
        align-items: center;
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
    }
    .avatar img{
        height: 32px;
        width: 32px;
        border-radius: 50%;
    }
    .avatar .toggle{
        width: 220px;
    }
</style>