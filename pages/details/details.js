const app = getApp();
const WxParse = require('../../wxParse/wxParse.js');
const detailsUrl = require('../../config').detailsList;
Page({
    data: {
        domain: app.globalData.domain,//域名
        id:"",
        detailsList:{}
    },
    onLoad: function (options) {
        // console.log(options)
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        this.setData({
            id:this.options.id
        })
        this.requestDetailsDate()
    },
    bindInputSend:function(e){
        console.log(e.detail.value)
    },
    // 帖子详情
    requestDetailsDate: function () {
        let that = this;
        wx.request({
            url: detailsUrl + that.data.id +'/4.0/json',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data.data)
                let article = res.data.data.usergroup_level;
                // for(let i=0;i<res.data.data.comment.comment_list.length;i++){
                //     let level = res.data.data.comment.comment_list[i].usergroup_level;
                //     // console.log(level)
                //     WxParse.wxParse('level', 'html', level, that, 5);
                // }
                WxParse.wxParse('article', 'html', article, that, 15);
                that.setData({
                    detailsList: res.data.data
                })
                WxParse.emojisInit('[]', "/wxParse/emojis/", {})

            }
        })
    },
});