<template>
    <div>
       <div>
            <div class="f22 pl20">
              <span class="cursor" @click="back"><</span>
              版本详情
            </div>
            <div class="pl20 pt20 f14">
                <span>版本号：</span>
                <select class="w150 cursor" v-model="versionId" @change="getVersionName()">
                   <option v-for="item in versionsList" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="cl">
                <span class="btn cursor" @click="addPatch">上传补丁</span>
                <input type="button" value="一键清除补丁" class="clearPatch f14 r mt20 mr20 cursor" @click="clearPatch">
            </div>
            <div class="wrap">
                  <table cellpadding="0" cellspacing="0" class="version">
                      <tr>
                         <th class="w11">补丁版本</th>
                         <th class="w11">补丁大小</th>
                         <th class="w30">补丁描述</th>
                         <th class="w20">上传时间</th>
                         <th class="w11">发布状态</th>
                         <th class="w11">操作</th>
                      </th>
                      <tr v-for="item in patchsList" v-show="item.status!=0">
                         <td>{{item.serial_number}}</td>
                         <td>{{item.size+"KB"}}</td>
                         <td>{{item.desc}}</td>
                         <td>{{item.create_time|filterTime}}</td>
                         <!-- <td v-show="item.status==0">删除</td> -->
                         <td v-show="item.status==1">等待</td>
                         <td v-show="item.status==2">已发布</td>
                         <td v-show="item.status==3">已灰度</td>
                         <td v-show="item.status==4">已停止</td>
                         <td><router-link :to="'patchDetail?patchId='+item.id+'&version='+versionId" class="blue">查看详情</router-link></td>
                      </tr>
                      <tr v-show="(patchsList.length==0)||(patchsList[0].status==0)">
                          <td colspan="6" class="tc">请上传补丁!</td>
                      </tr>
                  </table>
            </div>
        </div>  
        <div class="modal" v-show="dialogFlag">
            <div class="modal-inner">
                <div class="modal-title">
                    <div data-v-aebaf62a="">上传补丁</div>
                </div> 
                <div class="modal-text">
                    <!-- <form>
                        <div class="cl pb10">
                            <span class="l w100">添加至版本:</span>
                            <input type="text" class="textR bd-none l" value="1.2.3" readonly="readonly">
                        </div>
                        <div class="cl pb10">
                           <span class="l w100">上传补丁文件:</span>
                           <input class="textR bd-none l blue cursor" value="点击上传" readonly="readonly">
                        </div>
                        <div class="cl pb10">
                           <span class="l w100">补丁描述:</span>
                           <textarea name="" id="" cols="30" rows="10" class="textarea l" placeholder="请输入20字以内的描述......" maxlength="20"></textarea>
                        </div>
                    </form> -->
                     <form>
                            <div class="mb10">
                                <label class="w100">*添加版本:</label>
                                <input type="text" :value="versionName" readonly="true" class="bd-none">
                            </div>
                           <!--  <div class="mb10">
                                <label class="w100">*补丁大小:</label>
                                 <input type="number" name="name" placeholder="请输入补丁大小" v-model="size">
                            </div> -->
                            <div class="mb10">
                              <label class="w100">*上传补丁:</label>
                              <input type="file" readonly="readonly" class="blue bd-none" v-on:change="uploadFile">
                            </div>
                            <div class="mb10">
                                <label class="w100">*补丁描述:</label>
                                <input type="text" name="name" placeholder="请输入20字以内的描述......" maxlength="20" v-model="desc">
                            </div>
                           <!--  <div class="mb10">
                                <label class="w100">*下载地址:</label>
                                <input type="text" name="name" placeholder="请输入补丁下载地址" v-model="download_url">
                            </div> -->
                        </form>
                </div>
            </div> 
            <div data-v-aebaf62a="" class="modal-buttons">
                <span data-v-aebaf62a="" class="modal-button cursor" @click="savePatch">确定</span> 
                <span data-v-aebaf62a="" class="modal-button modal-button-cancel cursor" @click="cancel">取消</span>
            </div>
        </div>
         <div class="modal" v-show="dialogFlag1">
            <div class="modal-inner">
                <div class="modal-title">
                    <div data-v-aebaf62a="">补丁清除</div>
                </div> 
                <div class="modal-text f12 mt20 mb20">
                    补丁清除操作会把该版本下的所有补丁清除，回滚至无补丁状态，<span class="red">请谨慎选择!</span>
                </div>
            </div> 
            <div data-v-aebaf62a="" class="modal-buttons">
                <span data-v-aebaf62a="" class="modal-button cursor" @click="deletePath">确认清除</span> 
                <span data-v-aebaf62a="" class="modal-button modal-button-cancel cursor" @click="cancel1">取消</span>
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
    .wrap{width:100%;padding:0 20px;box-sizing:border-box;}
    table{width:100%;padding:20px 20px 0;font-size:12px;font-weight:400;background:#fff;outline-offset:1px}
    .version th{background:#f5f5f5;text-align:left;}
    .version td,.version th{padding:0 8px;box-sizing:border-box;height:40px;border-bottom:1px solid #e6e7eb;}
    .w150{width:150px;padding:0 24px 0 8px;border-radius:3px;height:28px;border:1px solid #c4c6cf;}
    .w11{width:11%}
    .w20{width:20%}
    .w30{width:30%}
    .clearPatch{padding:0 12px;background:#fff;font-weight:400;color:#333;border-radius:3px;height:28px;border:1px solid #c4c6cf;}
</style>
<script src="./details.js"></script>