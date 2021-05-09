<template>
    <div>
        <b-header/>
        <b-menu 
          :state="state"
          @changeState="changeState"
        ></b-menu>
        <!-- Trang home -->
        <b-content 
          v-if="dataSource && dataSource.length"
          :dataSource="dataSource"
          v-model="dataSource"
          :isGenresFilter="isGenresFilter"
        ></b-content>
        <!-- Trang book-detail -->
        <b-content
          v-if="dataBook && dataBook.length"
          :dataBook="dataBook"
          v-model="dataBook"
        ></b-content>
        <b-footer/>
    </div>
</template>

<script>
import BHeader from '@/components/common/BHeader.vue'
import BMenu from '@/components/common/BMenu.vue'
import BContent from '@/components/common/BContent.vue'
import BFooter from '@/components/common/BFooter.vue'

export default {
    name: 'container',
    components: {
        BHeader,
        BMenu,
        BContent,
        BFooter
    },
    props: {
        state : {
            type: String,
            default: 'home'
        },
        dataSource: {
            type : [Array, Object],
            default : () =>  []
        },
        dataBook: {
            type : [Array, Object],
            default : () =>  []
        },
        isGenresFilter: {
            type : Boolean,
            default: false
        }
    },
    methods:{
        changeState(state){
            this.state = state;
            this.$emit('changeState', this.state);
        }
    }
}
</script>

<style scoped >
    
</style>