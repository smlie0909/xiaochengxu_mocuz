const app = getApp();
const util = require('../../utils/util.js')
Page({
    data:{
        myPostList:[]
    },
    onLoad:function(){
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '","type":"thread"}';
        util.api_call("my_tracks", dir, res => {
            this.setData({
                myPostList: res.threadlist,
            })
        }, null, null)
    },



});