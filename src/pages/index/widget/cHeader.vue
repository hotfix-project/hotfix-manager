<template>
    <div class="cheader" v-show="show" :class="[classz]">
        <div class="left pt10">
            <p class="fw">HotFix</p>
            <p class="f14">全平台热修复</p>
        </div>
        <div class="right">
            <a href="https://github.com/hotfix-project" class="rightIcon" target="_blank"></a>
            <div class="user">{{userName}}
                <ul class="logOut">
                    <li><router-link to="modifyPsw">修改密码</router-link></li>
                    <li @click="logOut">退出</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'c-cHeader',
    created(){
       this.getUserName();
    },
    data(){
        return {
         db:false           
        }
    },
    props:{
        show:{
            type:Boolean,
            default:true,
            userName:''
        }
    },
    computed:{
       
    },
    watch:{
       $route(to,from){
          if(from.name=='login'){
            this.getUserName();
          }
       } 
    },
    methods:{
        fLeftClick(){
            if(this.leftPath){
                this.$router.push(this.leftPath);
            }
            else{
                this.$router.go(-1);
            }
        },
        fRightClick(){
            if(this.rightPath){
                this.$router.push(this.rightPath);  
            }
            this.$emit('rightClick')
        },
        logOut(){
            localStorage.setItem("token","");
            localStorage.setItem("username","");
            this.$router.push({path:"login"})
        },
        getUserName(){
            var self=this;
            self.userName=localStorage.getItem("username");  
        }
    }
}
</script>
<style lang="sass" scoped>
    .cheader{
        background-color: #fff;
        width:100%;
        height: 80px;
        text-align:center;
        box-shadow:0 2px 2px 0 rgba(0,0,0,.1);  
        overflow:hidden;
    }
    .left{
        float:left;
        width:220px;
        height:80px;
        text-align:center;
        background:#0089cd;
        font-size:22px;
        color:#fff;
    }
    .right{
        padding-right:45px;
        height:80px;
        line-height:80px;
        overflow:hidden;
    }
    .fw{
        font-weight:700;
    }
    .user{
        position:absolute;
        right:100px;
        margin-top:32px;
        margin-right:40px;
        padding-right:15px;
        min-width:30px;
        height:60px;
        font-size:14px;
        text-align:left;
        line-height:1;
        background:url("./images/arrows.png") right 5px no-repeat;
        cursor:pointer;
    }
    .user:hover .logOut{
        display:block;
    }
    .logOut{
        display:none;
        position:absolute;
        top:20px;
        right:0;
        box-sizing:border-box;
        border:1px solid #e6e7eb;
        border-radius:3px;
        box-shadow:1px 1px 2px rgba(0,0,0,.2);
        width:96px;
        line-height:36px;
        font-size:12px;
        color:#666;
        text-align:left;
        cursor:pointer;
        li{
            padding-left:15px;
            height:36px;
            background:#fff;
        }
    }
    .logOut li:hover{
        background:#ebecf0;
    }
    .rightIcon{
        float:right;
        border-radius:50%;
        margin-top:16px;
        width:48px;
        height:48px;
        line-height:48px;
        background:url("./images/hotfix-logo.png") center no-repeat;
        background-size:100%;
    }
    .f14{opacity:0.7}
</style>