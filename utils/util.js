const app = getApp();
const config = require('../config.js');
const DES3 = require('./DES3.min.js').des;
function change(data){
    let jsonStr = data;
    jsonStr = jsonStr.replace(" ", "");//转换
    if (typeof jsonStr != 'object') {
        jsonStr = jsonStr.replace(/\ufeff/g, "");//筛选
        let jj = JSON.parse(jsonStr);//将string转变成json对象
        data = jj;
    }
    return data
}
//无sharecircle接口
function api_call(name, params = null, success_cb = null, fail_cb = null, complete_cb = null) {
    let method = 'GET' //默认设置
    if (params !== null) { //当有参数时
        method = 'POST'
        params = DES3.encrypt(app.globalData.key, params); //参数加密
    }else{
        params='';
    }
    wx.request({
        url: config.API_URL + name,
        method: method,
        dataType: 'json',
        header: { 'content-type': 'application/json' },
        data: params,
        success: function (res) {
            if (typeof res.data == 'string') {
                res.data = DES3.decrypt(app.globalData.key, res.data);//解密后得到数据string
                res.data = change(res.data)//转换后的json数据
            }
            if (typeof success_cb == 'function') {
                success_cb(res.data)
            }
        },
        fail: function () {
            if (typeof fail_cb == 'function') {
                fail_cb()
            }
        },
        complete: function () {
            if (typeof complete_cb == 'function') {
                complete_cb()
            }
        }
    })
}
//有sharecircle接口
function api_massage(name, params = null, success_cb = null, fail_cb = null, complete_cb = null) {
    let method = 'GET' //默认设置
    if (params == null) { //当参数为空时
        params = {}
    }
    if (params) { //当有参数时
        method = 'POST'
        params = DES3.encrypt(app.globalData.key, params); //参数加密
    }
    wx.request({
        url: config.API_URL_ + name,
        method: method,
        dataType: 'json',
        header: { 'content-type': 'application/json' },
        data: params,
        success: function (res) {
            if (typeof res.data == 'string'){
                res.data = DES3.decrypt(app.globalData.key, res.data);//解密后得到数据string
                res.data = change(res.data)//转换后的json数据
            }
            if (typeof success_cb == 'function') {
                success_cb(res.data)
            }
        },
        fail: function () {
            if (typeof fail_cb == 'function') {
                fail_cb()
            }
        },
        complete: function () {
            if (typeof complete_cb == 'function') {
                complete_cb()
            }
        }
    })
}

module.exports = {
    api_massage: api_massage,
    api_call: api_call,
}
