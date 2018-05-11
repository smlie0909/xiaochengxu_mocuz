const app = getApp();
const util = require('../../utils/util.js')
const WxParse = require('../../wxParse/wxParse.js')
Page({
    data: {
        domain: app.globalData.domain,//域名
        id:"",
        detailsList:[],
        comment_list:[],
        value:"",
        responsecount:""
    },
    onLoad: function (options) {
        console.log(options)
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        this.setData({
            id:this.options.id,
            title:this.options.details,
            gender: this.options.gender
        })
        if (this.options.details == "local"){
            this.requestLocalDetailsDate()
        }else{
            this.requestCommunDetails()
        }
    },
    bindInputSend:function(e){
        this.setData({
            value: e.detail.value
        })
        if (!app.globalData.userInfo) {
            wx.navigateTo({
                url: '../login/login',
            })
        }else{
            if (this.options.details == "local") {
                this.localComment()
            } else if (this.options.details == "community"){
                this.comComment()
            };
        }
        
    },
    // 本地圈帖子详情
    requestLocalDetailsDate: function () {
        let that = this;
        util.api_massage("post/post_detail_share/" + that.data.id +"/4.0/json",null, res => {
            console.log(res.data)
            let article = res.data.usergroup_level;
            // for(let i=0;i<res.data.data.comment.comment_list.length;i++){
            //     let level = res.data.data.comment.comment_list[i].usergroup_level;
            //     // console.log(level)
            //     WxParse.wxParse('level', 'html', level, that, 5);
            // }
            WxParse.wxParse('article', 'html', article, that, 15);
            that.setData({
                detailsList: res.data,
                comment_list: res.data.comment.comment_list,
                like_users: res.data.like_users,
                responsecount: res.data.responsecount,
                likecount: res.data.likecount,
                authorid: res.data.uid,
                ctime_format: res.data.ctime_format,
                author: res.data.username,
                subject: res.data.content_title,
                content: res.data.content,
                readcount: res.data.readcount,
            })
            WxParse.emojisInit('[]', "/wxParse/emojis/", {})
        }, res => {
            wx.hideNavigationBarLoading();
        }, () => {
            wx.hideNavigationBarLoading();
        })
    },
    // 社区帖子详情
    requestCommunDetails: function () {
        let that = this;
        util.api_call("viewthread&tid=" + that.options.tid + "&uid=" + that.options.uid, null, res => {
            console.log(res)
            that.setData({
                detailsList: res.thread,
                authorid: res.postlist[0].authorid,
                ctime_format: res.postlist[0].dateline,
                author:res.postlist[0].author,
                avatar: res.postlist[0].avatar,
                authortitle: res.postlist[0].authortitle,
                subject: res.postlist[0].subject,
                content: res.postlist[0].message,
                responsecount: res.thread.replies,
                readcount: res.thread.views,
                likecount: res.thread.relay
            })
        }, res => {
            wx.hideNavigationBarLoading();
        }, () => {
            wx.hideNavigationBarLoading();
        })
    },
    //本地圈评论
    localComment:function(){
        let that = this;
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '","comment":"' + this.data.value + '","postid":"' + this.data.detailsList.id + '","to_uid":"' + this.data.detailsList.uid + '","to_username":"' + this.data.detailsList.username +'"}';
        if (app.globalData.userInfo){
            if (this.data.value == "") {
                app.toastShow(that, "评论信息不能为空！", "icon-xinxitianxie");
            } else {
                util.api_massage("comment/send_comment", dir, res => {
                    that.data.comment_list.push({
                        "uid": app.globalData.userInfo.uid,
                        "username": app.globalData.userInfo.username,
                        "content": that.data.value,
                        "ctime_format": "刚刚",
                        "likecount": 0
                    })
                    that.setData({
                        comment_list: that.data.comment_list,
                        responsecount: parseInt(that.data.responsecount) + 1,
                        value: ''
                    });
                }, res => {
                    wx.hideNavigationBarLoading();
                }, () => {
                    wx.hideNavigationBarLoading();
                });
            }
        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        }  
    },
    //社区评论
    comComment:function(){

    }
});