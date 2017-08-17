import Vue from 'vue';
import footer from 'index/widget/footer/footer.vue';
import api from 'apiConfig/apiConfig';
import {toThousands} from "widget/util/util";
import {mapGetters} from 'vuex';
import {queryString} from "widget/util/util";

export default {
    name:'v-details',
    created() {
      this.getVersionList();
    },
    data() {
      return {
        dialogFlag:false,
        dialogFlag1:false,
        app_id:"",
        versionsList:"",
        patchsList:'',
        versionId:'',
        versionName:'',
        fileSize:'',
        fileName:'',
        desc:'',
        download_url:'',
        formData:''
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
        cancel1(){
            this.dialogFlag1=false;
            this.$overlay({
                show:false
            });
        },
        addPatch(){
            if(this.versionId){
                this.dialogFlag=true;
                this.$overlay();
            }else{
                this.$toast("请选择版本号",{
                    duration:2000
                })
            }
        },
        clearPatch(){
           this.dialogFlag1=true;
            this.$overlay(); 
        },
        getVersionList(){
          this.app_id=queryString("appId");
          this.versionId=queryString("versionId")
          var self=this;
          self.$http({
                url:api.versions+"?app_id="+this.app_id,
                method:"get"
            }).then(function(res){
                if(res.status==200){
                    self.versionsList=res.body.results;
                }
            })
       },
        getPatchList(){
            var self=this;
            if(this.versionId){
                this.$http({
                url:api.patchs+"?ordering=-serial_number&version_id="+this.versionId,
                method:"get"
            }).then(function(res){
                if(res.status==200){
                    self.patchsList=res.body.results;
                }
            }).catch(function(res){
                console.log(res)
            })
            }
        },
        getVersionName(){
            var self=this;
            if(this.versionId){
                this.$http({
                url:api.versions+"/"+this.versionId,
                method:"get"
                }).then(function(res){
                    if(res.status==200){
                        self.versionName=res.body.name;
                    }
                }).catch(function(res){
                    console.log(res)
                });
                this.getPatchList()
            }
        },
        uploadFile(e){
            this.fileSize=(e.target.files[0].size/1024).toFixed(0);
            this.fileName=e.target.files[0].name;
            this.formData=new FormData();
            this.formData.append(this.fileName,e.target.files[0]);
        },
        savePatch(){
            var self=this;
            if(this.fileName){
                this.$http({
                    url:api.upload,
                    method:"post",
                    headers:{
                        "Uni-Source":" ipos/Android (com.qianbao.ipos)"
                    },
                    body:this.formData
                }).then(function(res){
                    if(res.status!=200){
                        self.$toast("文件未上传成功，请重新上传",{
                            duration:1000,
                        })
                    }else{
                        var downloadUrl=api.download+self.fileName;
                         this.$http({
                                url:api.patchs,
                                method:"post",
                                body:{
                                    "version_id": api.versions+"/"+this.versionId,
                                    "size":this.fileSize,
                                    "desc":this.desc,
                                    "download_url":downloadUrl
                                }
                            }).then(function(res){
                                    if(res.status==201){
                                        self.cancel();
                                        self.getPatchList();
                                    }
                            }).catch(function(res){
                                    console.log(res)
                            });
                        }
                    })
            }  
        },
       deletePath(){
        var self=this;
        if((this.patchsList.length>0)&&(this.patchsList[0].status!=0)){
            for(var i=0;i<this.patchsList.length;i++){
             self.$http({
                url:api.patchs+"/"+this.patchsList[i].id,
                method:"put",
                body:{
                    "version_id":self.patchsList[i].version_id,
                    "status":0,
                    "desc":self.patchsList[i].desc,
                    "download_url":self.patchsList[i].download_url,
                    "size":self.patchsList[i].size
                }
             }).then(function(res){
                    self.getPatchList();
             })
          }
        }else{
            this.cancel1();
          
        }
      }
    },
    components:{
        'c-footer':footer
    },
    filters:{
         filterTime(time){
            return time.replace(/[^0-9-:]/g,' ')
        }
    }
}