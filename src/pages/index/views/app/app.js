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
        id:'',
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
            this.id=decodeURIComponent(queryString("id"));
            var self=this;
            this.$http.get(api.apps).then(function(res){
                self.appList=res.body.results;
                if(self.id=='null'){
                  self.id=self.appList[0].id
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
          var self=this;
          self.$http({
                url:api.versions+"?app_id="+this.id,
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
                    "app_id":api.apps+"/"+this.$refs.input1.value
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
        },
        aa(){
          console.log(this.$refs.input1.value)
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