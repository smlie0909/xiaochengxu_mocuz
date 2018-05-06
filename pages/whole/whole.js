const sectionListUrl = require('../../config').sectionList;
const sectionIconUrl = require('../../config').sectionIcon;
Page({
    data: {
        curIndex: 0,
        sectionIconData:{},
        childArray:[],
        unfollow:0,
        follow:"关注"
    },
    //事件处理函数
    jumpTemplate: function (event) {
        let itemId = event.currentTarget.id;
        let name = event.currentTarget.dataset.title
        wx.navigateTo({
            url: '/pages/blockList/blockList?id=' + itemId + '&&title=' + name,
        })
    },
    jumpTo: function (e) {
        // 点击标题切换当前页时改变样式
        let that = this;
        let index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index,
            loading: true,
        })
        wx.request({
            url: sectionIconUrl, //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                let temp = res.data.catlist[index];
                that.setData({
                    childArray: temp,
                })
            }
        })

    },
    onLoad: function () {
        let that = this;
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        wx.request({
            url: sectionIconUrl, //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                let temp = res.data.catlist[0];
                that.setData({
                    sectionIconData: res.data.catlist,
                    childArray: temp,
                })
            }
        })
    },
    onFollow:function(e){
        let id = e.currentTarget.id;
        let follow = this.data.follow;
        for (var i = 0; i < follow.length; i++){
            if (follow[i]["Type"] == e.currentTarget.dataset.type) {
                console.log(follow[i]["Type"]);
                console.log(e.currentTarget.dataset.type);
                // follow[i]["serverimgurl"] = objurl.Body.Data;
                break;
            }
        }
    }
});