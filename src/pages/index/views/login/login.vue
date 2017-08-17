<template>
    <div class="wrap">
    	<div class="inner">
    		<div class="top f18">HotFix Manager</div>
    		<div class="p20 pb0">
    			<div>Username:</div>
    			<input type="text" maxlength="22" v-model="username" @focus="msg=='请输入用户名'?msg='':''">
    			<div>Password</div>
    			<input type="password" maxlength="22" v-model="logPsw" @focus="msg=='请输入密码'?msg='':''">
    			<p class="errorMsg l1 red">&nbsp{{msg}}</p>
    		</div>
        <div class="logBtn mr5 ml112" @click="login">登录</div>
    		<div class="logBtn" @click="reset">重置</div>
    	</div>
    </div>
</template>
<style lang="sass" scoped>
   .wrap{width:100%;font-size:14px;}
   .inner{margin:200px auto;border-radius:6px;width:392px;height:284px;background:#fff;border:1px solid #eee}
   .top{height:50px;line-height:50px;padding-left:20px;background:#0089cd;border-top-left-radius:6px;border-top-right-radius:6px;color:#fff;}
   input{margin:3px 0 12px;border:1px solid #ccc;border-radius:4px;width:100%;height:34px;padding:0 10px;box-sizing:border-box;}
   .pb0{padding-bottom:0;}
   .logBtn{display:inline-block;width:80px;height:32px;line-height:32px;text-align:center;background:#0089cd;color:#fff;border-radius:4px;cursor:pointer}
   .ml112{margin-left:112px}
</style>
<script src="./login.js"></script>