import Vue from 'vue';
import footer from 'index/widget/footer/footer.vue';
import api from 'apiConfig/apiConfig';
import {toThousands} from "widget/util/util";
import {mapGetters} from 'vuex';
import {queryString} from "widget/util/util";
export default {
    name:'v-details',
    created() {
        this.getPatchDetail();
        this. getVersionName();

    },
    data() {
      return {
         patchList:'',
         versionName:'',
         tipFlag:false,
         apply_count:1,
         checkFlag1:true,
         checkFlag2:false,
         dialogFlag:false,
         versionId:'',
         patchId:'',
         downLoad:'',
         pool_size:1
      }
    },
    watch:{
    
    },
    computed:{
      
    },
    methods:{
       back(){
            this.$router.go(-1);
        },
       cancel(){
            this.dialogFlag=false;
            this.$overlay({
                show:false
            });
        },
       getPatchDetail(){
          this.patchId=queryString("patchId");
          this.versionId=queryString("version");
         self=this;
         self.$http({
                url:api.patchs+"/"+this.patchId,
                method:"get"
            }).then(function(res){
                if(res.status==200){
                    self.patchList=res.body;
                    self.downLoad=self.patchList.download_url;
                }
            })
       },
       getVersionName(){
         var  self=this;
          self.$http({
                url:api.versions+"/"+ this.versionId,
                method:"get"
            }).then(function(res){
                if(res.status==200){
                    self.versionName=res.body.name;
                }
            })
       },
       sotpIssuing(){
              this.$overlay();
              this.dialogFlag=true;
       },
       sureSotp(){
         var self=this;
          this.$http({
               url:api.patchs+"/"+this.patchId,
               method:'put',
               body:{
                  "version_id":api.versions+"/"+this.versionId,
                  "size":this.patchList.size,
                  "desc": this.patchList.desc,
                  "download_url": this.patchList.download_url,
                  "serial_number": this.patchList.serial_number,
                  "status":4,
               }
             }).then(function(res){
                if(res.status==200){
                  self.patchList=res.body;
                    self.$toast("停止发布成功",{
                      duration:2000,
                    })
                    self.cancel();
                }
             })
       },
       issuing(){
        var self=this;
          if(this.checkFlag1){
             this.$http({
               url:api.patchs+"/"+this.patchId,
               method:'put',
               body:{
                 "version_id":api.versions+"/"+this.versionId,
                  "size":this.patchList.size,
                  "desc": this.patchList.desc,
                  "download_url": this.patchList.download_url,
                   "serial_number": this.patchList.serial_number,
                  "status":2
               }
             }).then(function(res){
                if(res.status==200){
                  self.patchList=res.body;
                    self.$toast("发布成功",{
                      duration:2000,
                    })
                  self.isIssuing=true;
                }
             })
          }else{
              this.$http({
               url:api.patchs+"/"+this.patchId,
               method:'put',
               body:{
                 "version_id":api.versions+"/"+this.versionId,
                  "size":this.patchList.size,
                  "desc": this.patchList.desc,
                  "download_url": this.patchList.download_url,
                  "serial_number": this.patchList.serial_number,
                  "status":3,
                  "pool_size": this.pool_size
               }
             }).then(function(res){
                 self.patchList=res.body;
                if(res.status==200){
                    self.$toast("发布成功",{
                      duration:2000,
                    })
                }
             })
          }
       },
       radioCheck1(){
          if(!this.checkFlag1){
            this.checkFlag1=true;
            this.checkFlag2=false;   
          }
       },
       radioCheck2(){
          if(!this.checkFlag2){
            this.checkFlag2=true;
            this.checkFlag1=false;
          }
       },
       reduceSize(){
          if(Number(this.pool_size)-100<=0){
            this.pool_size=1;
          }else{
            this.pool_size=Number(this.pool_size)-100;
          }
       },
       addSize(){
         this.pool_size=Number(this.pool_size)+100;
       }
    },
    components:{
        'c-footer':footer
    },
    filters:{
        
    }
}