<template>
    <div class="footer rel">
        <div class="allApp abs f16 footBg">全部应用 <i class="abs arrows footBg"></i>
           <div class="listW abs">
               <router-link to="appList" class="appA footBg f14 cursor">全部应用</router-link>
               <div v-for="item in systemsList">
                   <router-link :to="'appList?system='+item.id" class="appA footBg f14 cursor" :class="item.name">{{item.name}}</router-link>
               </div>
           </div>
        </div>
        <router-link :class="{'active':sNavActiveName==item.name}" v-for="item in aNav" :key="'nav' + item" :to="{name:item.name}" class="leftNav">
            <div @click="fNavClick(item)">
                <i class="icon" :class="[item.icon]"></i>
                <span class="f12" v-text="item.text"></span>
            </div>
        </router-link>
    </div>
</template>
<script>
import Vue from "vue";
import api from 'apiConfig/apiConfig';
export default {
    name:'c-footer',
    className: 'footer',
    props:{
        routeName:{
            type:String,
            default:''
        }
    },
    created(){
        this.getSystems();
    },
    data(){
        return {
            aNav:[
                 {
                    name:'appList',
                    icon:'icon-list',
                    text:'应用列表'
                },
                {
                    name:'app',
                    icon:'icon-app',
                    text:'应用管理'
                }
            ],
            sNavActiveName: this.routeName,
            systemsList:''
        }
    },
    watch:{
        routeName:{
            handler(val){
                this.sNavActiveName = val;
            },
            immediate:true
        }
    },
    computed:{
       
    },
    methods:{
        fNavClick(item){
            this.sNavActiveName = item.name;
        },
        getSystems(){
            var self=this;
            this.$http.get(api.systems).then(function(res){
                if(res.status==200){
                    self.systemsList=res.body.results;
                }
            })
        }
    }
}
</script>
<style lang="sass" scoped>
    .footer{
        padding-top:80px;
        height:100%;
        color:#5D656B;
        background-color:#3d4751;
        font-size:24px;
        .f12{
            vertical-align:5px;
        }
        .leftNav{
            display:block;
            width:100%;
            height:55px;
            line-height:55px;
            color:#fff;
            padding:0 16px;
            box-sizing:border-box;
        }
        i{
           background:url('./images/icon.png') 0 0 no-repeat;bakcground-size:18px 43px;height:18px;width:18px; 
        }
        .leftNav:hover{
            background:#343c45;
        }
        .icon-app{
             background-position:0 -24px;
        }
        .footBg{
            background:#4a535d url("./images/footIcon.png") 10px 10px no-repeat;
            bakcground-size:19px 200px;
        }
        .allApp{
            top:20px;
            left:15px;
            padding-left:40px;
            box-sizing:border-box;
            width:188px;
            height:40px;
            line-height:40px;
            color:rgba(255,255,255,0.6);
           .arrows{
                right:10px;
                top:13px;
                width:16px;
                height:12px;
                background-position:0px -160px;
           }  
        }
        .allApp:hover{
            background-color:#d8dadc;
            color:#333;
            background-position:10px -108px;
            .arrows{
                background-position:0px -187px;
                background-color:#d8dadc;
            }
            .listW{
                display:block;
            }
        }
        .listW{
            display:none;
            left:0;
            bottom:-121px;
            width:186px;
            border-radius:3px;
            border:1px solid #90e3be;
        }
        .appA{  
            display:block;
            padding-left:40px;
            height:40px;
            line-height:40px;
            background-color:#fff;
            background-position:10px -108px;
            bakcground-size:90%;
        }
        .appA:hover{
            background-color:#f5f5f5;
        }
        .Android{
            background-position:10px -28px;
        }
        .iOS{
            background-position:10px -68px;
        }
        
    }
</style>