webpackJsonp([1,3],{15:function(t,e,s){var n,o;s(100),n=s(99);var a=s(101);o=n=n||{},"object"!=typeof n.default&&"function"!=typeof n.default||(o=n=n.default),"function"==typeof o&&(o=o.options),o.render=a.render,o.staticRenderFns=a.staticRenderFns,o._scopeId="data-v-3eb6f704",t.exports=n},99:function(t,e,s){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=s(1),a=(n(o),s(3)),i=n(a);s(2),s(4);e.default={name:"v-login",created:function(){},data:function(){return{username:"",logPsw:"",msg:""}},watch:{},computed:{},methods:{login:function(){var t=this;this.username?this.logPsw?(this.msg="",this.$http({url:i.default.login,method:"post",body:{username:this.username,password:this.logPsw}}).then(function(e){if(200==e.status){var s=e.body.token;localStorage.setItem("token",s),localStorage.setItem("username",t.username),t.$router.push({path:"appList"})}}).catch(function(t){this.$toast("登录名或者密码错误",{duration:2e3})})):this.msg="请输入密码":this.msg="请输入用户名"},reset:function(){this.username="",this.logPsw=""}},components:{},filters:{}}},100:function(t,e){},101:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap"},[s("div",{staticClass:"inner"},[s("div",{staticClass:"top f18"},[t._v("HotFix Manager")]),t._v(" "),s("div",{staticClass:"p20 pb0"},[s("div",[t._v("Username:")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",maxlength:"22"},domProps:{value:t.username},on:{focus:function(e){"请输入用户名"==t.msg?t.msg="":""},input:function(e){e.target.composing||(t.username=e.target.value)}}}),t._v(" "),s("div",[t._v("Password")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.logPsw,expression:"logPsw"}],attrs:{type:"password",maxlength:"22"},domProps:{value:t.logPsw},on:{focus:function(e){"请输入密码"==t.msg?t.msg="":""},input:function(e){e.target.composing||(t.logPsw=e.target.value)}}}),t._v(" "),s("p",{staticClass:"errorMsg l1 red"},[t._v(" "+t._s(t.msg))])]),t._v(" "),s("div",{staticClass:"logBtn mr5 ml112",on:{click:t.login}},[t._v("登录")]),t._v(" "),s("div",{staticClass:"logBtn",on:{click:t.reset}},[t._v("重置")])])])},staticRenderFns:[]}}});
//# sourceMappingURL=login.0b4ffcfe.js.map