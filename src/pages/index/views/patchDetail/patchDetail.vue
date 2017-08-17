<template>
     <div>
        <div>
             <div class="f22 pl20">
                <span class="cursor" @click="back"><</span>
                补丁详情
              </div>
           <div class="p20">
               <div class="boxLeft l mr20 bg-white bde" >
                   <ul class="p20 f12 g6">
                       <li class="f14">补丁属性</li>
                       <li>
                           <span>补丁版本：</span>
                           <span>{{patchList.serial_number}}</span>
                       </li>
                       <li>
                           <span>应用版本：</span>
                           <span>{{versionName}}</span>
                       </li>
                       <li>
                           <span>补丁描述：</span>
                           <span class="describe">{{patchList.desc}}</span>
                       </li>
                        <li>
                           <span>文件大小：</span>
                           <span>{{patchList.size+"KB"}}</span>
                       </li>
                       <li>
                           <span>补丁文件：</span>
                           <a :href="patchList.download_url" class="blue" target="_blank">下载</a>
                       </li>
                   </ul>
               </div>
               <div class="boxRight bg-white p20 f14 bde tc">
                   <div class="tl">补丁发布</div>
                   <div class="bbe cl h100 pb20 pt20">
                       <qriously :value="downLoad" :size="90" class="ewm l mr20"/>
                       <div class="l tl">
                           <p class="pt20 pb10">正式发布前建议您先进行本地测试</p>
                            <p>请使用hotfixdebug扫描左侧二维码，下载补丁进行本地调试</p>
                       </div>
                   </div>
                   <div class="flex" v-if="(patchList.status==2)||(patchList.status==3)">
                       <div class="flexBox bd4 l mr55">
                           <div class="f30">{{patchList.download_count}}</div>
                           <div>累计加载设备数</div>
                       </div>
                       <div class="flexBox bd4 l">
                           <div class="f30">{{patchList.apply_count}}</div>
                           <div>成功推送设备数</div>
                       </div>
                   </div>
                   <div class="flex" v-else>
                       <div class="flexBox l mr55 fbB rel f12 g9">
                           <div class="radio abs" @click="radioCheck1" :class="checkFlag1?'checked':''"></div>
                           <div class="f16 pb10">全量发布</div>
                           <div>对全量用户推送该补丁</div>
                       </div>
                       <div class="flexBox fbB l  rel f12 g9 rel">
                           <div class="radio abs" :class="checkFlag2?'checked':''" @click="radioCheck2"></div>
                           <div class="f16 pb10">灰度发布</div>
                           <div>对部分用户推送该补丁</div>
                           <div class="pt10 cl" v-show="checkFlag2">
                             <span class="l tipW" @mouseover="tipFlag=true" @mouseout="tipFlag=false"></span>
                             <span class="l">设备数: </span>
                             <span class="boxA bde l ml5 reduce"  @click="reduceSize">-</span>
                             <input type="text" class="centerBox bde l" autofocus="autofocus" v-model="pool_size">
                             <span class="add boxA bde l" @click="addSize">+</span>
                           </div>
                           <div class="abs tip" v-show="tipFlag">设备数是指设备请求更新patch的次数</div>
                       </div>
                   </div>
                   <span class="minBtn mt40" :class="patchList.status==1?'bg':''" @click="issuing" v-if="(patchList.status==1)||(patchList.status==4)">{{patchList.status==1?'确认发布':'继续发布'}}</span>
                   <span class="minBtn mt40" v-else @click="sotpIssuing">停止发布</span>
                   <span @click="back" class="minBtn mt40 ml20" v-show="patchList.status==4">选择回滚</span>
               </div>
           </div>
        </div>
        <div class="modal" v-show="dialogFlag">
            <div class="modal-inner">
                <div class="modal-title">
                    <div data-v-aebaf62a="">操作提示</div>
                </div> 
                <div class="modal-text f12 mt20 mb20">
                   <div class="tl flexBox warn">
                      <b class="f14">确定要停止发布吗？</b>
                      <p class="f12">停止发布后将使未收到推送的设备不再更新补丁。</p>
                      <p class="f12">停止发布后仍可恢复发布</p>
                   </div>
                </div>
            </div> 
            <div data-v-aebaf62a="" class="modal-buttons">
                <span data-v-aebaf62a="" class="modal-button cursor" @click="sureSotp">确定</span> 
                <span data-v-aebaf62a="" class="modal-button modal-button-cancel cursor" @click="cancel">取消</span>
            </div>
        </div>
     </div>
</template>
<style lang="sass" scoped>
    /*占位*/
    .ph-banner{
        height:327px;
        width:100%;
    }
    .ph-list{
        margin-top:20px;
    }
    .ph-item{
        width:100%;
        height:90px;
        margin-top:10px;
    }
    .f22{width:100%;height:60px;line-height:60px;background:#eee;font-weight:100;}
    .boxLeft{width:280px;height:538px;box-shadow:0 1px 2px 0 rgba(0,0,0,.1)}
    .boxLeft li{line-height:40px;border-bottom:1px solid #eee;}
    .describe{display:inline-block;width:116px;margin-right:12px;line-height:16px}
    .boxRight{height:500px;overflow:auto;box-shadow:0 1px 2px 0 rgba(0,0,0,.1)}
    .h100{height:100px;}
    .ewm{width:90px;height:90px;border:1px solid #eee;}
    .bd4{width:174px;height:174px;border:4px solid #eee;border-radius:50%;justify-content:center}
    .fbB{width:198px;height:198px;border:1px solid #eee;justify-content:center}
    .mr55{margin-right:55px;}
    .flex{display:flex;justify-content:center;padding-top:50px;}
    .modal .warn{align-items:start;padding-left:60px;background:url("./images/warning.png") 0  center no-repeat;}
    .bg{background:#0089cd;border-color:#0089cd;color:#fff;}
    .radio{width:25px;height:25px;border-radius:50%;border:1px solid #ddd;top:8px;left:8px;}
    .checked{background:url("./images/check.png") center no-repeat;background-size:22px 22px;}
    .boxA{display:inline-block;width:26px;height:28px;line-height:28px;font-size:24px;font-weight:200;font-family:"宋体";cursor:pointer;user-select:none;}
    .boxA:hover{border-color:#0089cd}
    .reduce{border-top-left-radius:3px;border-bottom-left-radius:3px;margin-right:1px;}
    .add{border-top-right-radius:3px;border-bottom-right-radius:3px;margin-left:1px;}
    .centerBox{width:30px;padding:0 6px;height:28px;}
    .centerBox:hover{border-color:#0089cd}
    .cl{line-height:28px;overflow:hidden}
    .tipW{margin-top:5px;margin-right:6px;width:18px;height:17px;background:url("./images/tip.png") center no-repeat;background-size:18px 17px;}
    .tip{bottom:0;left:-125px;width:250px;padding:16px;text-align:center;background:#ebecf0}
    .tip:after{position:absolute;top:-6px;left:140px;content:"";width:10px;height:10px;background:#ebecf0;transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg); -webkit-transform:rotate(45deg); -o-transform:rotate(45deg);}
</style>
<script src="./patchDetail.js"></script>