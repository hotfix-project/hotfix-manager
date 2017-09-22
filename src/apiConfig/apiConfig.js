var baseUrl = 'http://172.28.32.102:8000/';  // 开发环境

const ENV = process.env.NODE_ENV;
if(ENV == 'production'){
	console.log('env','production');
}
else if(ENV == 'sit'){
	console.log('env','sit');
}

module.exports = {
    "apps": baseUrl + "apps", //应用列表
    "categorys": baseUrl + "categorys",//应用类型接口
    "systems": baseUrl + "systems",//获取操作系统接口
    "versions": baseUrl + "versions",//获取版本详情接口
    "patchs": baseUrl + "patchs",//获取补丁接口
    "login": baseUrl + 'api-token-auth/',//登录接口
    "upload": 'https://dev-apis.qianbao.com/basicservice/v1/intranet/filer/public/ipos/patch',//上传补丁接口
    "download": 'http://test-img0.qianbao.com/public/ipos/patch/',//下载补丁接口
}
