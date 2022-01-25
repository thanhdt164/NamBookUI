<template>
      <div class="main-container">
            <b-header/>
            <b-menu></b-menu>
            <b-container 
              :isProfile="isProfile"
            ></b-container>
    </div>
</template>

<script>
import BHeader from '@/components/common/BHeader.vue'
import BMenu from '@/components/common/BMenu.vue'
import BContainer from '@/components/common/BContainer.vue'

export default {
    name: 'book-detail',
    data(){
        return{
            isProfile: true,
        }
    },
    components: {
        BHeader,
        BMenu,
        BContainer,
    },
    created(){
        
    },
    methods: {
        
    },
}
</script>

<style scoped >
    
</style>