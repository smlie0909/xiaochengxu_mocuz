const app = getApp()
const DES3 = require('../../utils/DES3.min').des
const codeUrl = require('../../config').identifyingCode
const loginUrl = require('../../config').login
Page({
    /* 页面的初始数据*/
    data: {
        getCodeButtonTitle: "获取验证码",
        second: 60,
        buttonState: 1, /* 0不可点击  1可点击*/
        phoneNum: 0,       //手机号
        verCode: 0,//验证码
    },
    /* 登录 */
    loginUser: function () {
        let that = this;
        console.log(that.data.verCode)
        if (that.data.verCode.length > 4 && that.data.phoneNum.length == 11 && that.validatemobile()) {
            wx.showNavigationBarLoading();
            let dir = '{"auth":"","mobile":"' + that.data.phoneNum + '","login_type":"2","code":"' + that.data.verCode +'"}';
            let des3en = DES3.encrypt(app.globalData.key, dir);
            wx.request({
                url: loginUrl,
                data: des3en,
                method: 'POST',
                success: function (res) {
                    console.log(res);
                    wx.hideNavigationBarLoading();
                    // app.globalData.token = res.data.response.token,
                    //     app.globalData.userId = res.data.response.userId,
                    //     wx.setStorage({
                    //         key: "KeyAppUserToken",
                    //         data: res.data.response.token
                    //     })
                    // that.getAppUserInfo();
                    // that.getWXLoginCode();
                },
                fail: function (res) {
                    //失败后的逻辑
                    wx.hideNavigationBarLoading();
                    wx.showToast({
                        title: res.data.msg,
                    })
                },
            })
        } else {
            wx.hideNavigationBarLoading()
            app.toastShow(that, "请完整填写信息", "icon-yunongtongqingshurushoujihaoma");
        }
    },
    /* 获取验证码 */
    getCode: function () {
        let that = this;
        if (that.data.buttonState == 1 && that.data.phoneNum.length == 11 && that.validatemobile()) {
            wx.showNavigationBarLoading();
            let dir = '{"send_key":"mocuz_app_mobile_send","action":"verify_login","auth":"","mobile":"' + that.data.phoneNum + '","access_token":""}';
            let des3en = DES3.encrypt(app.globalData.key, dir);
            wx.request({
                url: codeUrl,
                data: des3en,
                method: 'POST',
                success: function (res) {
                    console.log(res.data);
                    if (res.data.errmsg == "success") {
                        wx.hideNavigationBarLoading()
                        app.countdown(that);
                    } else {
                        wx.hideNavigationBarLoading()
                        app.toastShow(that, res.data.errmsg, "icon-yunongtongqingshurushoujihaoma");
                    }
                },
                fail: function (res) {
                    wx.hideNavigationBarLoading()
                    app.toastShow(that, res.data.errmsg, "icon-yunongtongqingshurushoujihaoma");
                    // console.log("error")
                },
            })
        } else {
            if (that.data.buttonState != 0) {
                wx.hideNavigationBarLoading()
                app.toastShow(that, "请校验手机号", "icon-yunongtongqingshurushoujihaoma");
            };
        }
    },
    phoneNumber: function (e) {
        let that = this;
        that.setData({
            phoneNum: e.detail.value
        });
    },
    registerUrl:function(){
        wx.navigateTo({
            url: '../register/register'
        })
    },
    verCode: function (e) {
        let that = this;
        that.setData({
            verCode: e.detail.value
        })
    },
    validatemobile: function () {
        let that = this;
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(that.data.phoneNum)) {
            app.toastShow(that, "请校验手机号", "icon-yunongtongqingshurushoujihaoma");
            return false;
        }
        return true;
    }
});