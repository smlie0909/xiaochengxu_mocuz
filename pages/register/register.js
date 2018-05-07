// pages/register/register.js
const DES3 = require('../../utils/DES3.min').des
const codeUrl = require('../../config').identifyingCode
const registerUrl = require('../../config').register
const app = getApp()
Page({

    /* 页面的初始数据 */
    data: {
        getCodeButtonTitle: "获取验证码",
        second: 60,
        buttonState: 1, /* 0不可点击  1可点击*/
        phoneNum: 0,       //手机号
        verCode: 0,//验证码
    },
    /* 注册 */
    registerNewUser: function () {
        let that = this;
        if (that.data.verCode.length > 4 && that.data.phoneNum.length == 11 && 5 < this.data.password.length < 19 && that.validatemobile()) {
            wx.showNavigationBarLoading();
            var dict = {
                auth: app.globalData.userInfo.nickName,
                // password: md5.md5(that.data.password),
                regtype:"m",
                mobile: that.data.verCode,
                origin: '3',
            }
            wx.request({
                url: registerUrl,
                params: dict,
                success: function (res) {
                    // console.log(res.data);
                    wx.hideNavigationBarLoading();
                    wx.showToast({
                        title: "注册成功",
                        duration: 2000
                    })
                    setTimeout(function () {
                        wx.navigateBack({
                            url:"/pages/login/login"
                        })
                    }, 2000);

                    //跳转到个人中心

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
            wx.showToast({
                title: '请填写完整信息',
            })
        }
    },
    /* 获取验证码 */
    getCode: function () {
        let that = this;
        if (that.data.buttonState == 1 && that.data.phoneNum.length == 11 && that.validatemobile()) {
            wx.showNavigationBarLoading();
            let dir = '{"send_key":"mocuz_app_mobile_send","action":"verifycode","auth":"","mobile":"' + that.data.phoneNum + '","access_token":""}';
            let des3en = DES3.encrypt(app.globalData.key, dir);
            wx.request({
                url: codeUrl,
                data: des3en,
                method: 'POST',
                success: function (res) {
                    console.log(res.data);
                    if (res.data.errmsg == "success"){
                        wx.hideNavigationBarLoading()
                        app.countdown(that);
                    }else{
                        wx.hideNavigationBarLoading()
                        app.toastShow(that, res.data.errmsg, "icon-yunongtongqingshurushoujihaoma");
                    }
                },
                fail: function (res) {
                    wx.hideNavigationBarLoading()
                    app.toastShow(that,res.data.errmsg, "icon-yunongtongqingshurushoujihaoma");
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
        this.setData({
            phoneNum: e.detail.value
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
            app.toastShow(that, "请输入正确的手机号", "icon-yunongtongqingshurushoujihaoma");
            return false;
        }
        return true;
    },
})