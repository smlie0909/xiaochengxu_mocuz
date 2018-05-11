//获取应用实例  
const app = getApp();
const util = require('../../utils/util.js')
Page({
    data:{
        userHeaderUrl: "http://utf8develop.mocuz.com/uc_server/avatar.php?uid=1499&size=middle&random=1525934007",
        userPhone: "注册/登录",
        userName: "MOCUZ",
        userGrade: "",
        userLevel: "",
        isLogin: 0,
        id_token: '',//方便存在本地的locakStorage  
        response: '', //存取返回数据  
        pageIndex: 1, //页码
    },
    onLoad:function(){
        this.myData()
    },
    onShow: function () {
        this.refreshView();
    },
    myData:function(){
        let that = this
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '"}';
        util.api_call("my.my", dir, res => {
            that.setData({
                space_threads: res.data.space_threads,
                topic_posts: res.data.topic_posts
            })
        }, null, null)
    },
    //查看个人信息
    showUserInfo: function () {
        if (app.globalData.userInfo) {

        } else {
            wx.navigateTo({
                url: '../login/login'
            })
        }
    },
    //退出登录事件
    loginOut: function () {
        let that = this
        app.removeLocalUserInfo()
        app.globalData.userInfo = null;
        that.refreshView();
    },
    //刷新当前页面
    refreshView: function () {
        let that = this;
        console.log(app.globalData.userInfo)
        if (app.globalData.userInfo) {
            // console.log("刷新页面了");
            that.setData({
                userHeaderUrl: app.globalData.userInfo.avatar,
                userName: app.globalData.userInfo.username,
                userPhone: app.globalData.userInfo.mobile,
                userGrade: app.globalData.userInfo.gender,
                userLevel: app.globalData.userInfo.grouptitle,
                isLogin: 1
            });
        } else {
            // console.log("刷新页面了2");
            that.setData({
                isLogin: 0,
                userName: "MOCUZ",
                userPhone: "注册/登录",
                userGrade:"",
                userLevel:"",
                userHeaderUrl: "http://utf8develop.mocuz.com/uc_server/avatar.php?uid=1499&size=middle&random=1525934007",
            })
        }
    },
    // 我的帖子
    
})  