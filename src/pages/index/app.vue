<template>
    <div id="app">
        <header class="top-fixed">
            <c-header></c-header>
        </header>
        <section class="body">
            <footer class="bottom-fixed" v-show="bShowFooter">
                <c-footer :routeName="routeName"></c-footer>
            </footer>
            <div class="content">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import header from './widget/header.vue';
import footer from './widget/footer/footer.vue';

export default {
    created(){
        var self = this;  
    },
    data(){
        return {
            bShowWelcome:false,
            bPc:false,
            routeName:'appList',
            title:''
        }
    },
    watch:{
        '$route.name':{
           handler:function(val){
                this.routeName = val;
           },
           immediate:true
        }
    },
    computed:{
        bShowFooter(){
            return this.routeName != 'login'
        }
    },
    methods:{
        fIsMobile(){
            return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
    },
    components:{
        'c-header':header,
        'c-footer':footer
    }
} 
</script>
<style lang="sass" scoped>
    #app{
        height:100%;
        width:100%;
    }
    .body{
        width: 100%;
        height: 100%;  
        overflow:hidden;
        min-width:1100px;
    }
    .bottom-fixed{
        float:left;
        width:220px;
        height:100%;
    }
    .content{
        margin:0;
        height:100%;
        overflow-x:hidden;
        overflow-y:auto;
        -webkit-overflow-scrolling:touch;
    }
</style>