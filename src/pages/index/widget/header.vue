<template>
    <div class="header">
        <c-cHeader :show="header.show">
        </c-cHeader>
    </div>
</template>
<script>
import cHeader from './cHeader.vue';
import {mapActions} from 'vuex';

export default {
    name:'c-header',
    mounted(){
        var self = this;
        // if(this.$route.path == '/weixin'){
        //     this.$refs.cHeader.$on('rightClick',function(){
        //         self.bMenuClose = !self.bMenuClose;
        //     })
        // }
    },
    data(){
        return {
            header:{}
        }
    },
    watch:{
        '$route':{
            handler:function(){            
                const meta = this.$route.meta;
                this.header = meta || {};
            },
            immediate:true
        }
    },
    methods:{
        ...mapActions({
            fSetRightClick:'fSetRightClick'
        }),
        fRightClick(){
            this.fSetRightClick({rightClick:+new Date()});
        }
    },
    components:{
        'c-cHeader':cHeader
    }
}
</script>
<style scoped>
    .tips-menu{position:absolute;width:100px;right:5px;top:53px;padding:2px 10px;background-color:#49484b;
        color:#fff;font-size:dpr(16px);line-height:2;text-align:left;transition:all .2s ease;}
    .tips-menu:before{width:0;height:0;position:absolute;top:-8px;right:15px;content:"";border-width:0 dpr(6px) dpr(8px);
        border-color:rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #49484b rgba(0, 0, 0, 0);border-style:solid;}
    .tip-item:not(:last-child){border-bottom:1px solid #5b5b5d;}
    .tip-item i{margin-right:15px}
    .tips-close{opacity:0;transform:scale(.7);transform-origin:90% 0;}
</style>