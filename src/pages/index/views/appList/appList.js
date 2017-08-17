import Vue from 'vue';
import {mapGetters} from 'vuex';
import api from 'apiConfig/apiConfig';
import footer from 'index/widget/footer/footer.vue';
import {dateFormat,datetime} from 'widget/util/util'; // 格式化日期
import {queryString} from "widget/util/util";

export default {
    name:'v-appList',
    created() {
        this.getSystems();
        this.getCategorys();
    },
    data() {
      return {
        dialogFlag:false,
         list:"",
         categorysList:'',
         systemsList:'',
         name:"",
         category_id:'',
         system_id:'',
         rsa:'',
         systems:''
      }
    },
    watch:{
         $route (to, from) {
            if(to.name=='appList'){
                this.getSystems();
                this.getCategorys();
            }
         }
    },
    computed:{
    //    ...mapGetters({
    //        apiUrl:'apiUrl'
    //    })
    },
    ready:function(){

    },
    methods:{
        getList(){
            this.systems=queryString('system');
              var self=this;
            this.$http.get(api.apps).then(function(res){
                self.list=res.body.results;
            })
        },
        getCategorys(){
            var self=this;
            this.$http.get(api.categorys).then(function(res){
                self.categorysList=res.body.results;
            })
        },
        getSystems(){
            var self=this;
            this.$http.get(api.systems).then(function(res){
                if(res.status==200){
                    self.systemsList=res.body.results;
                    self.getList();
                }
            })
        },
        cancel(){
            this.dialogFlag=false;
            this.$overlay({
                show:false
            });
        },
        creat(){
            this.$overlay();
            this.dialogFlag=true;
        },
        addItem(){
            if(!(this.name&&this.category_id&&this.system_id)){
                return false;
            }else{
                var self=this;
                this.$http({
                    url:api.apps,
                    method:"post",
                    body:{
                        "name":this.name,
                        "category_id":api.categorys+"/"+this.category_id,
                        "system_id":api.systems+"/"+this.system_id,
                        'rsa':this.rsa
                    }
                }).then(function(res){
                    if(res.status==201){
                        self.dialogFlag=false;
                        self.$overlay({
                            show:false
                        });
                        self.getList();
                    }
                }).catch(function(res){
                    self.$toast("创建失败，请重试",function(){
                            duration:2000
                    })
                })
            }
        },
        inquireSystem(str,str1){
            var str=str.match(/^.+\/(\d+)$/)[1];
           if(str1.id==str){
             return true;
           }
        }
    },
    components:{
        'c-footer':footer
    },
    filters:{

    }
}