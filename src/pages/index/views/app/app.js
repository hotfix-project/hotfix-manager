import Vue from 'vue';
import footer from 'index/widget/footer/footer.vue';
import api from 'apiConfig/apiConfig';
import {mapGetters} from 'vuex';
import {queryString} from "widget/util/util";

export default {
    name:'v-app',
    created() {
       this. getAppDetail();
       this.getSystems();
       this.getCategorys()
    },
    data() {
      return {
        versionsList:'',
        appList:'',
        name:'',
        dialogFlag:false,
        secretFlag:true,
        categorysList:'',
        systemsList:'',
        app_id:'',
        rsaFlag:false,
        rsa:''
      }
    },
    watch:{
    
    },
    computed:{
      
    },
    methods:{
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
                }
            })
        },
        getAppDetail(){
            this.name=decodeURIComponent(queryString("name"));
            var self=this;
            this.$http.get(api.apps).then(function(res){
                self.appList=res.body.results;
                if(self.name=='null'){
                  self.name=self.appList[0].name
                }
                self.getVersionList()
            }).catch(function(res){
              console.log(res)
            })
        },
        cancel(){
            this.dialogFlag=false;
            this.$overlay({
                show:false
            });
        },
       addVersion(){
            this.$overlay();
            this.dialogFlag=true;
       },
       getVersionList(){
          this.app_id=encodeURIComponent(queryString("id"));
          if(this.app_id=='null'){
              this.app_id=this.appList[0].id;
          }
          var self=this;
          self.$http({
                url:api.versions+"?app_id="+this.app_id,
                method:"get"
            }).then(function(res){
                self.versionsList=res.body.results
            })
       },
       saveVersion(){
            var self=this;
            self.$http({
                url:api.versions,
                method:"post",
                body:{
                    "name":this.name,
                    "app_id":api.apps+"/"+this.app_id
                }
            }).then(function(res){
                if(res.status==201){
                    self.cancel();
                    self.getVersionList();
                }
            })
       },
       inquireSystem(str,str1){
            var str=str.match(/^.+\/(\d+)$/)[1];
           if(str1.id==str){
             return true;
           }
        },
        checkFile(){
           for(var i=0;i<this.appList.length;i++){
             if(this.appList[i].name==this.name){
               this.rsa=this.appList[i].rsa;
             }
           }
            this.$overlay();
            this.rsaFlag=true;
        },
        close(){
          this.$overlay({show:false});
          this.rsaFlag=false;
        }
    },
    components:{
        'c-footer':footer
    },
    filters:{
      filterTime(time){
            return time.replace(/[^0-9:-]/g,' ')
        }
    }
}