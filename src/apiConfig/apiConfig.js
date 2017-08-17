var baseUrl = 'http://172.28.32.101:8000/';  // 开发环境


module.exports = {
    "apps": baseUrl + "api/apps", //应用列表
    "categorys": baseUrl + "api/categorys",//应用类型接口
    "systems": baseUrl + "api/systems",//获取操作系统接口
    "versions": baseUrl + "api/versions",//获取版本详情接口
    "patchs": baseUrl + "api/patchs",//获取补丁接口
    "login": baseUrl + 'api-token-auth/',//登录接口
    "download": 'http://test-img0.qianbao.com/public/ipos/patch/',//下载补丁接口
    "upload": 'https://dev-apis.qianbao.com/basicservice/v1/intranet/filer/public/ipos/patch',//上传补丁接口
    

}
