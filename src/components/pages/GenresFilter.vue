<template>
    <div class="main-container">
            <b-container 
              :state="state"
              :dataSource="dataSource"
              v-model="dataSource"
              @changeState="changeState"
            ></b-container>
    </div>
</template>

<script>
import BContainer from '@/components/common/BContainer.vue'

export default {
    name: 'genres-filter',
    components: {
        BContainer
    },
}
</script>

<style scoped >
    .main-container{
        margin: 0;
        padding: 0;
    }
</style>