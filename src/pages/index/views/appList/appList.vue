<template>
    <div>
        <div>
            <div class="f22 pl20">应用列表</div>
            <div class="btn cursor" @click="creat">创建应用</div>
            <div class="wrap">
            <table cellpadding="0" cellspacing="0">
                <tr>
                   <th class="w29">应用名称</th>
                   <th class="w29">操作系统</th>
                   <th  class="w29">App ID</th>
                   <th>操作</th>
                </th>
                <tr v-for="item in list" v-show="(systems==null)?true:item.system_id.match(/^.+\/(\d+)$/)[1]==systems">
                   <td>{{item.name}}</td>
                   <td v-for="item2 in systemsList" v-show="inquireSystem(item.system_id,item2)">{{item2.name}}</td>
                   <td>{{item.id}}</td>
                   <td><router-link :to="'app?id='+encodeURIComponent(item.id)" class="blue">管理</router-link></td>    
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
                            <div class="mb10">
                                <label>*应用名称:</label>
                                <input type="text" name="name" placeholder="请输入应用名称" v-model="name">
                            </div>
                            <div class="mb10">
                                <label>*应用类型</label>
                                <select name="category_id" class="cursor" v-model="category_id">
                                    <option v-for="item1 in categorysList" :value="item1.id">{{item1.name}}</option>
                                </select>
                            </div>
                            <div class="mb10">
                                <label>*操作系统</label>
                                 <select name="system_id" class="cursor" v-model="system_id">
                                    <option v-for="item2 in systemsList" :value="item2.id">{{item2.name}}</option>
                                </select>
                            </div>
                            <div class="mb10">
                                <label>*&nbsp&nbspRSA&nbsp&nbsp&nbsp&nbsp</label>
                                <input type="text" name="name" placeholder="请输入rsa" v-model="rsa">
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
            <div data-v-aebaf62a="" class="modal-buttons">
                <span data-v-aebaf62a="" class="modal-button cursor" @click="addItem">确定</span> 
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
    .wrap{width:100%;padding:0 20px;box-sizing:border-box;}
    table{width:100%;padding:20px 20px 0;font-size:12px;font-weight:400;background:#fff;outline-offset:1px}
    th{background:#f5f5f5;text-align:left;}
    td,th{padding:0 8px;box-sizing:border-box;height:40px;line-height:40px;border-bottom:1px solid #e6e7eb;}
    .w20{width:20%;}
    .w29{width:29%;}
</style>
<script src="./appList.js"></script>