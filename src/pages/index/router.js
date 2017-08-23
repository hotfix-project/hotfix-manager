import Vue from 'vue';
import VueRouter from 'vue-router';
import cookies from 'js-cookie';
import login from './views/login/login.vue';
import appList from './views/appList/appList.vue';

const details = resolve => {
    require.ensure(['./views/details/details.vue'], () => {
        resolve(require('./views/details/details.vue'))
    }, 'details')
}

const modifyPsw = resolve => {
    require.ensure(['./views/modifyPsw/modifyPsw.vue'], () => {
        resolve(require('./views/modifyPsw/modifyPsw.vue'))
    }, 'modifyPsw')
}

const patchDetail = resolve => {
    require.ensure(['./views/patchDetail/patchDetail.vue'], () => {
        resolve(require('./views/patchDetail/patchDetail.vue'))
    }, 'patchDetail')
}

const app = resolve => {
    require.ensure(['./views/app/app.vue'], () => {
        resolve(require('./views/app/app.vue'))
    }, 'app')
}
// const demo = resolve => {
//     require.ensure(['./views/demo/demo.vue'], () => {
//         resolve(require('./views/demo/demo.vue'))
//     }, 'demo')
// }
// const test = resolve => {
//     require.ensure(['./views/demo/test/test.vue'], () => {
//         resolve(require('./views/demo/test/test.vue'))
//     }, 'test')
// }

const routeConfig = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        name: 'login',
        component: login, //登录页面
        meta:{
            show:false
        }
    },
    {
        path: '/appList',
        name: 'appList',
        component: appList, //
        
    },
    {
        path: '/app',
        name: 'app',
        component: app, //
    },
    {
        path: '/details',
        name: 'details',
        component: details, //
    },
    {
        path: '/patchDetail',
        name: 'patchDetail',
        component: patchDetail, //
    },
     {
        path: '/modifyPsw',
        name: 'modifyPsw',
        component: modifyPsw, 
    }
    
    // {
    //     path: '/demo',
    //     name: 'demo',
    //     component: demo,
    //     meta: { auth: true },
    //     children: [
    //         { path: 'test', component: test, name: 'test', meta: { page: 63 } },
    //     ]
    // }
];

const router = new VueRouter({
    mode: 'hash',
    routes: routeConfig
});

//add mock cookie
// cookies.set('wlcUserId',escape("886E41417490442887380A7F7A8B48B5"))

router.beforeEach((to, from, next) => {
    console.log('to ' + to.path)
    if (to.path === '/home') {
        //mock add cookie
        // const userId = cookies.get('wlcUserId');
        // if(!userId){
        //     alert('no user')
        // }
        // else{
        //     store.commit(types['setUser'],{userId:userId});
        //     next(); 
        // }
        next();
    } else {
        next();
    }
});

router.afterEach(function(transition) {
    // document.title = transition.meta.title;
    Vue.clearOverlay();
    Vue.clearLoading();
});


export default router;