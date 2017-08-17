import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from './vuex/store';
import cookies from 'js-cookie';
import 'static/css/quick-layout.css';
import 'static/css/site.css';
import './index.scss';
import router from './router.js';
import App from './app.vue';
import cHeader from './widget/cHeader.vue';
import {types} from 'index/vuex/mutation-types'
import toast from 'widget/toast';
import loading from 'widget/loading';
import overlay from 'widget/overlay';
import {Alert,Confirm,Box} from 'widget/modal/index.js';
import VueQriously from 'widget/vue-qriously';//二维码


Vue.component('c-cHeader',cHeader);
Vue.use(VueRouter);
Vue.use(toast);
Vue.use(loading);
Vue.use(overlay);
Vue.use(Alert);
Vue.use(Confirm)
Vue.use(Box);
Vue.use(VueQriously);

Vue.http.interceptors.push((request, next)  => {
    if(/api-token-auth/.test(request.url)){
       request.headers.set('Authorization',"");
    }else{
      request.headers.set('Authorization',"Token "+localStorage.getItem("token"));
    }
    next((res) => {
        if(res.status >= 500){
            Vue.toast('network error',{
                duration:2000
            })
        }
        else if(res.status==401){
            router.push({path:"login"});
        }
    });
});
sync(store, router);

new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})
