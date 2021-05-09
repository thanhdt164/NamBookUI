<template>
      <div class="main-container">
            <b-container 
              :state="state"
              :dataBook="dataBook"
              v-model="dataSource"
              @changeState="changeState"
              :isGenresFilter="isGenresFilter"
            ></b-container>
    </div>
</template>

<script>
import BContainer from '@/components/common/BContainer.vue'
export default {
    name: 'book-detail',
    data(){
        return{
            dataBook: [
                {}
            ]
        }
    },
    components: {
        BContainer
    }
}
</script>

<style scoped >
    
</style>