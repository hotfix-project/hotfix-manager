import Vue from 'vue';
import api from 'apiConfig/apiConfig';
import {mapActions} from 'vuex';
import {queryString} from 'widget/util/util';

export default {
    name:'v-login',
    created() {
    
    },
    data() {
      return {
        username:"",
        logPsw:"",
        msg:""
      }
    },
    watch:{
       
    },
    computed:{
       
    },
    methods:{
        login(){
          var self=this;
            if(!this.username){
              this.msg="请输入用户名"
            }else if(!this.logPsw){
              this.msg="请输入密码"
            }else{
              this.msg=""
               this.$http({
                  url:api.login,
                  method:'post',
                  body:{
                    "username":this.username,
                    "password":this.logPsw
                  }
               }).then(function(res){
                   if(res.status==200){
                       const token = res.body.token;
                       localStorage.setItem("token", token);
                       localStorage.setItem("username", self.username);
                       self.$router.push({path:"appList"})
                   }
               }).catch(function(res){
                   this.$toast('登录名或者密码错误',{
                         duration:2000
                  })
               })
            }
        },
        reset(){
           this.username="";
           this.logPsw='';
        }
    },
    components:{
        
    },
    filters:{
        
    }
}