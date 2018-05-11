const app = getApp()
const util = require('../../utils/util.js')
Page({
    data: {
        domain: app.globalData.domain,//域名
        topicsData: [],    //帖子列表
        pageIndex: 1, //页码
        totalpage: "", //总页数
        hasMore: true,  //"上拉加载"的变量，默认true，显示; “没有数据”的变量，false，隐藏
    },
    onLoad: function (option) {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        wx.setNavigationBarTitle({
            title: option.title//页面标题为路由参数
        })
        this.setData({
            pageIndex: 1, //每次进入页面将pageIndex设置为1，覆盖之前的值
        })
        if (!app.globalData.userInfo) {
            app.globalData.userInfo = "";
            this.requestTopiclistDate()
        } else {
            this.requestTopiclistDate()
        }
    },
    //帖子详情
    jumpDetails: function (event) {
        let itemId = event.currentTarget.id;
        let itemName = event.currentTarget.dataset.details;
        wx.navigateTo({
            url: '/pages/details/details?id=' + itemId + '&details=' + itemName
        })
    },
    //加载更多
    lower: function () {
        let that = this;
        this.setData({
            pageIndex: this.data.pageIndex + 1, //每次下拉到底部触发 pageIndex+1
        })
        that.requestTopiclistDate();
    },
    // 帖子详情
    requestTopiclistDate:function(){
        let that = this;
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '","page":"' + that.data.pageIndex+'","tname":"' + that.options.title + '","tid":"' + that.options.id +'"}';
        util.api_massage("topic/get_topic_detail", dir, res => {
            // console.log(res)
            that.setData({
                detailimg: res.detailimg,
                title: res.title,
                involcount: res.involcount,
                piccount: res.piccount,
                part_ava: res.part_avatars,
                topicsData: that.data.topicsData.concat(res.post_info),
                totalpage: res.posts_totalpage,
            });
            if (that.data.pageIndex == that.data.totalpage) { //当pageIndex小于page页数时加载数据 
                that.setData({
                    hasMore: false, //无数据时提示没有更多数据
                })
            }
        }, res => {
            wx.hideNavigationBarLoading();
        }, () => {
            wx.hideNavigationBarLoading();
        })
    },
    // 点赞
    like: function (e) {
        console.log(e)
        let that = this;
        if (app.globalData.userInfo.auth) {
            let dir = '{"auth":"' + app.globalData.userInfo.auth + '","postid":"' + e.currentTarget.dataset.id + '","to_uid":"' + e.currentTarget.dataset.uid + '"}';
            let des3en = DES3.encrypt(app.globalData.key, dir);
            wx.request({
                url: localpraiseUrl,
                method: 'POST',
                data: des3en,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log(res)
                    // that.requestHotlistDate()
                    // if (res.data.errcode == 0) {
                    //     wx.showToast({
                    //         title: "",
                    //     })
                    // } else {
                    //     wx.showToast({
                    //         title: res.data.errmsg,
                    //     })
                    // }
                }
            })
        } else {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },
});