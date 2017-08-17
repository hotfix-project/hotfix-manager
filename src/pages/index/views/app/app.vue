<template>
     <div>
         <div>
            <div class="f22 pl20">应用管理</div>
            <div class="wrap">  
                <table cellpadding="0" cellspacing="0" class="details" v-for="item in appList" v-show="item.name==name">
                      <tr>
                         <td class="w21">应用名称：{{item.name}}</td>
                         <td class="w25" v-for="item1 in categorysList" v-show="inquireSystem(item.category_id,item1)">应用类型：{{item1.name}}</td>
                         <td class="w21" v-for="item2 in systemsList" v-show="inquireSystem(item.system_id,item2)">发布平台：{{item2.name}}</td>
                         <td>App ID：{{item.id}}</td>
                      </tr>
                      <tr>
                         <td>RSA秘钥：<i class="blue cursor" @click="checkFile">查看文件</i></td>
                         <td colspan="2">App Key：{{item.key}}</td>
                         <td>App Secret：<span class="cursor" @click="secretFlag=false" v-if="secretFlag">************************</span><span v-else class="word-break">{{item.secret}}</span></td>
                      </tr>
                  </table>
            </div>
            <div class="btn cursor" @click="addVersion">新增版本</div>
            <div class="wrap">
                  <table cellpadding="0" cellspacing="0" class="version">
                      <tr>
                         <th class="w21">版本号</th>
                         <th class="w52">创建时间</th>
                         <th>操作</th>
                      </th>
                      <tr v-for="item in versionsList">
                         <td>{{item.name}}</td>
                         <td>{{item.create_time|filterTime}}</td>
                         <td>
                            <router-link :to="'details?appId='+app_id+'&versionId='+item.id" class="blue">查看详情</router-link> 
                         </td>  
                      </tr>
                      <tr v-show="versionsList.length==0">
                          <td colspan="3" class="tc">请先新增版本！</td>
                      </tr>
                  </table>
            </div>
        </div>
        <div class="modal" v-show="dialogFlag">
            <div class="modal-inner">
                <div class="modal-title">
                    <div data-v-aebaf62a="">创建应用</div>
                </div> 
                <div class="modal-text">
                    <div data-v-aebaf62a="">
                        <form>
                            <div class="pt20">
                                <label>*App Id:</label>
                                <select name="" class="cursor">
                                  <option value="" v-for="item in appList">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="pt20 pb20">
                                <label>*版本号:</label>
                                <input type="text" name="name" placeholder="请输入版本号" v-model="name">
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
            <div class="modal-buttons">
                <span class="modal-button cursor" @click="saveVersion">确定</span> 
                <span class="modal-button cursor modal-button-cancel" @click="cancel">取消</span>
            </div>
        </div>
        <div class="resDialog f16" v-show="rsaFlag">
          <span class="resBox">{{rsa}}</span>
          <span class="abs blue close" @click="close">关闭</span>
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
    .version td,.version th{padding:0 8px;box-sizing:border-box;height:40px;line-height:40px;border-bottom:1px solid #e6e7eb;}
    .w21{width:21%;}
    .w52{width:52%;}
    .w25{width:25%;}
    .details{font-size:14px;padding:20px;}
    .details td{height:32px;padding-left:10px;}
    .details .p0{padding:0}
    .resDialog{position:fixed;z-index:1000;top:20%;left:26%;width:600px;height:400px;border-radius:3px;
      background:#fff;justify-content:center;border:2px solid #eee;padding:30px 0 8px 8px;}
    .resBox{display:block;height:100%;overflow-x:hidden;overflow-y:auto;padding-right:8px;word-break:break-all}
      .close{right:10px;top:5px;}
      .word-break{word-break:break-all}
</style>
<script src="./app.js"></script>