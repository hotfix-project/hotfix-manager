webpackJsonp([6,3],{32:function(t,s,a){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(s,"__esModule",{value:!0});var i=a(1),o=(e(i),a(5)),n=e(o),l=a(3),r=e(l),c=a(4);a(140);s.default={name:"v-details",created:function(){this.getVersionList()},data:function(){return{dialogFlag:!1,dialogFlag1:!1,app_id:"",versionsList:"",patchsList:"",versionId:"",versionName:"",fileSize:"",fileName:"",desc:"",download_url:"",formData:""}},watch:{},computed:{},methods:{back:function(){this.$router.go(-1)},cancel:function(){this.dialogFlag=!1,this.$overlay({show:!1})},cancel1:function(){this.dialogFlag1=!1,this.$overlay({show:!1})},addPatch:function(){this.versionId?(this.dialogFlag=!0,this.$overlay()):this.$toast("请选择版本号",{duration:2e3})},clearPatch:function(){this.dialogFlag1=!0,this.$overlay()},getVersionList:function(){this.app_id=(0,c.queryString)("appId"),this.versionId=(0,c.queryString)("versionId");var t=this;t.$http({url:r.default.versions+"?app_id="+this.app_id,method:"get"}).then(function(s){200==s.status&&(t.versionsList=s.body.results)})},getPatchList:function(){var t=this;this.versionId&&this.$http({url:r.default.patchs+"?ordering=-serial_number&version_id="+this.versionId,method:"get"}).then(function(s){200==s.status&&(t.patchsList=s.body.results)}).catch(function(t){console.log(t)})},getVersionName:function(){var t=this;this.versionId&&(this.$http({url:r.default.versions+"/"+this.versionId,method:"get"}).then(function(s){200==s.status&&(t.versionName=s.body.name)}).catch(function(t){console.log(t)}),this.getPatchList())},uploadFile:function(t){this.fileSize=(t.target.files[0].size/1024).toFixed(0),this.fileName=t.target.files[0].name,this.formData=new FormData,this.formData.append(this.fileName,t.target.files[0])},savePatch:function(){var t=this;this.fileName&&this.$http({url:r.default.upload,method:"post",headers:{"Uni-Source":" ipos/Android (com.qianbao.ipos)"},body:this.formData}).then(function(s){if(200!=s.status)t.$toast("文件未上传成功，请重新上传",{duration:1e3});else{var a=r.default.download+t.fileName;this.$http({url:r.default.patchs,method:"post",body:{version_id:r.default.versions+"/"+this.versionId,size:this.fileSize,desc:this.desc,download_url:a}}).then(function(s){201==s.status&&(t.cancel(),t.getPatchList())}).catch(function(t){console.log(t)})}})},deletePath:function(){var t=this;if(this.patchsList.length>0&&0!=this.patchsList[0].status)for(var s=0;s<this.patchsList.length;s++)t.$http({url:r.default.patchs+"/"+this.patchsList[s].id,method:"put",body:{version_id:t.patchsList[s].version_id,status:0,desc:t.patchsList[s].desc,download_url:t.patchsList[s].download_url,size:t.patchsList[s].size}}).then(function(s){t.getPatchList()});else this.cancel1()}},components:{"c-footer":n.default},filters:{filterTime:function(t){return t.replace(/[^0-9-:]/g," ")}}}},67:function(t,s,a){var e,i;a(!function(){var t=new Error('Cannot find module "!!../../../../../node_modules/extract-text-webpack-plugin/loader.js?{"remove":true}!css!vue-loader/lib/style-rewriter?id=data-v-35556156&scoped=true!postcss!sass!vue-loader/lib/selector?type=styles&index=0!./details.vue"');throw t.code="MODULE_NOT_FOUND",t}()),e=a(32);var o=a(138);i=e=e||{},"object"!=typeof e.default&&"function"!=typeof e.default||(i=e=e.default),"function"==typeof i&&(i=i.options),i.render=o.render,i.staticRenderFns=o.staticRenderFns,i._scopeId="data-v-35556156",t.exports=e},138:function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",[a("div",{staticClass:"f22 pl20"},[a("span",{staticClass:"cursor",on:{click:t.back}},[t._v("<")]),t._v("\n          版本详情\n        ")]),t._v(" "),a("div",{staticClass:"pl20 pt20 f14"},[a("span",[t._v("版本号：")]),t._v(" "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.versionId,expression:"versionId"}],staticClass:"w150 cursor",on:{change:[function(s){var a=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){var s="_value"in t?t._value:t.value;return s});t.versionId=s.target.multiple?a:a[0]},function(s){t.getVersionName()}]}},t._l(t.versionsList,function(s){return a("option",{domProps:{value:s.id}},[t._v(t._s(s.name))])}))]),t._v(" "),a("div",{staticClass:"cl"},[a("span",{staticClass:"btn cursor",on:{click:t.addPatch}},[t._v("上传补丁")]),t._v(" "),a("input",{staticClass:"clearPatch f14 r mt20 mr20 cursor",attrs:{type:"button",value:"一键清除补丁"},on:{click:t.clearPatch}})]),t._v(" "),a("div",{staticClass:"wrap"},[a("table",{staticClass:"version",attrs:{cellpadding:"0",cellspacing:"0"}},[t._m(0),t._l(t.patchsList,function(s){return a("tr",{directives:[{name:"show",rawName:"v-show",value:0!=s.status,expression:"item.status!=0"}]},[a("td",[t._v(t._s(s.serial_number))]),t._v(" "),a("td",[t._v(t._s(s.size+"KB"))]),t._v(" "),a("td",[t._v(t._s(s.desc))]),t._v(" "),a("td",[t._v(t._s(t._f("filterTime")(s.create_time)))]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:1==s.status,expression:"item.status==1"}]},[t._v("等待")]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:2==s.status,expression:"item.status==2"}]},[t._v("已发布")]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:3==s.status,expression:"item.status==3"}]},[t._v("已灰度")]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:4==s.status,expression:"item.status==4"}]},[t._v("已停止")]),t._v(" "),a("td",[a("router-link",{staticClass:"blue",attrs:{to:"patchDetail?patchId="+s.id+"&version="+t.versionId}},[t._v("查看详情")])],1)])}),t._v(" "),a("tr",{directives:[{name:"show",rawName:"v-show",value:0==t.patchsList.length||0==t.patchsList[0].status,expression:"(patchsList.length==0)||(patchsList[0].status==0)"}]},[a("td",{staticClass:"tc",attrs:{colspan:"6"}},[t._v("请上传补丁!")])])],2)])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dialogFlag,expression:"dialogFlag"}],staticClass:"modal"},[a("div",{staticClass:"modal-inner"},[t._m(1),t._v(" "),a("div",{staticClass:"modal-text"},[a("form",[a("div",{staticClass:"mb10"},[a("label",{staticClass:"w100"},[t._v("*添加版本:")]),t._v(" "),a("input",{staticClass:"bd-none",attrs:{type:"text",readonly:"true"},domProps:{value:t.versionName}})]),t._v(" "),a("div",{staticClass:"mb10"},[a("label",{staticClass:"w100"},[t._v("*上传补丁:")]),t._v(" "),a("input",{staticClass:"blue bd-none",attrs:{type:"file",readonly:"readonly"},on:{change:t.uploadFile}})]),t._v(" "),a("div",{staticClass:"mb10"},[a("label",{staticClass:"w100"},[t._v("*补丁描述:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.desc,expression:"desc"}],attrs:{type:"text",name:"name",placeholder:"请输入20字以内的描述......",maxlength:"20"},domProps:{value:t.desc},on:{input:function(s){s.target.composing||(t.desc=s.target.value)}}})])])])]),t._v(" "),a("div",{staticClass:"modal-buttons",attrs:{"data-v-aebaf62a":""}},[a("span",{staticClass:"modal-button cursor",attrs:{"data-v-aebaf62a":""},on:{click:t.savePatch}},[t._v("确定")]),t._v(" "),a("span",{staticClass:"modal-button modal-button-cancel cursor",attrs:{"data-v-aebaf62a":""},on:{click:t.cancel}},[t._v("取消")])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dialogFlag1,expression:"dialogFlag1"}],staticClass:"modal"},[t._m(2),t._v(" "),a("div",{staticClass:"modal-buttons",attrs:{"data-v-aebaf62a":""}},[a("span",{staticClass:"modal-button cursor",attrs:{"data-v-aebaf62a":""},on:{click:t.deletePath}},[t._v("确认清除")]),t._v(" "),a("span",{staticClass:"modal-button modal-button-cancel cursor",attrs:{"data-v-aebaf62a":""},on:{click:t.cancel1}},[t._v("取消")])])])])},staticRenderFns:[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("tr",[a("th",{staticClass:"w11"},[t._v("补丁版本")]),t._v(" "),a("th",{staticClass:"w11"},[t._v("补丁大小")]),t._v(" "),a("th",{staticClass:"w30"},[t._v("补丁描述")]),t._v(" "),a("th",{staticClass:"w20"},[t._v("上传时间")]),t._v(" "),a("th",{staticClass:"w11"},[t._v("发布状态")]),t._v(" "),a("th",{staticClass:"w11"},[t._v("操作")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"modal-title"},[a("div",{attrs:{"data-v-aebaf62a":""}},[t._v("上传补丁")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"modal-inner"},[a("div",{staticClass:"modal-title"},[a("div",{attrs:{"data-v-aebaf62a":""}},[t._v("补丁清除")])]),t._v(" "),a("div",{staticClass:"modal-text f12 mt20 mb20"},[t._v("\n                补丁清除操作会把该版本下的所有补丁清除，回滚至无补丁状态，"),a("span",{staticClass:"red"},[t._v("请谨慎选择!")])])])}]}}});
//# sourceMappingURL=details.0a569016.js.map