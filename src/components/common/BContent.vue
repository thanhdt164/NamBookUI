<template>
    <div class="content">
        <div class="box">
            <b-box v-for="items in dataSource" :key="items" :items="items"></b-box>
        </div>
    </div>
</template>

<script>
import Bbox from '@/components/common/BBox.vue'

export default {
    name: 'b-content',
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
            ]
        }
    },
    props: {
        dataSource :{
            type: [Array, Object],
            default: () => []
        }
    },
    components: { 
      'b-box': Bbox,
    }
}
</script>

<style scoped >
    .content{
        background-color: #F1F1F1;
        min-height: 100vh;
        padding: 30px 10% 30px 16%;
    }
    .box{
        margin-bottom: 20px;
        border-radius: 4px;
    }
    .header-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
    }
    .header-box .title{
        font-size: 28px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #333333;
    }
    .header-box button{
    
    }

    .content-box{
        padding: 8px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
    }
</style>