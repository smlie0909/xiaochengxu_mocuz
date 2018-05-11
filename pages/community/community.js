//获取应用实例 
const app = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
        currentTab: 0,
        IconData:{},    //版块数据
        datelineList: [], //放置最新发帖的数组 
        hotList: [], //放置本地爆料的数组 
        lastpostList: [], //放置最新回复的数组 
        pageIndex: 1,    //页码
        totalpage: "", //总页数 
        hasMore: true,  //"上拉加载"的变量，默认true，显示; “没有数据”的变量，false，隐藏
        init:'dateline',
        navbar: [
            { navtitle: '最新发帖', parameter:'dateline'}, 
            { navtitle: '本地爆料', parameter: 'hot'}, 
            { navtitle: '最新回复', parameter: 'lastpost'}
        ],
    },
    onLoad: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        this.requestsectionIconDate();
        this.requestsectionListDate();
    },
    //事件处理函数
    jumpTemplate: function (event) {
        let itemId = event.currentTarget.id;
        let name = event.currentTarget.dataset.title
        wx.navigateTo({
            url: '/pages/blockList/blockList?tid=' + itemId + '&&title=' + name,
        })
    },
    //事件处理函数
    jumpDetails: function (event) {
        let tid = event.currentTarget.dataset.tid
        let uid = event.currentTarget.dataset.uid
        let itemName = event.currentTarget.dataset.details
        let gender = event.currentTarget.dataset.gender
        wx.navigateTo({
            url: '/pages/details/details?tid=' + tid + '&uid=' + uid + '&details=' + itemName + '&gender=' + gender
        })
    },
    jumpPost:function(event) {
        let post = event.currentTarget.dataset.post
        wx.navigateTo({
            url: '/pages/whole/whole?post=' + post
        })
    },
    //tab切换响应点击导航栏
    navbarTap: function (e) {
        this.setData({
            init: e.currentTarget.dataset.parameter,
            currentTab: e.currentTarget.dataset.idx,
            hasMore: true, //无数据时提示没有更多数据
            pageIndex: 1,    //页码
            datelineList: [], //放置最新发帖的数组 
            hotList: [], //放置本地爆料的数组 
            lastpostList: [], //放置最新回复的数组 
        })
        this.requestsectionListDate();
    },
    //加载更多
    lower: function () {
        this.setData({
            pageIndex: this.data.pageIndex + 1, //每次下拉到底部触发 pageIndex+1
        })
        this.requestsectionListDate();
    },
    //版块列表加载
    requestsectionIconDate: function () {
        let that = this;
        util.api_call("index", null, res => {
            that.setData({
                IconData: res.catlist,
            })
        }, null, () => {
            wx.hideNavigationBarLoading();
        })
    },
    //话题列表加载
    requestsectionListDate: function () {
        let that = this;
        let dir = '{"order":"' + that.data.init +'","page":"' + that.data.pageIndex + '"}';  
        util.api_call("forumindex", dir, res => {
            // console.log(res)
            if (res.order == "dateline") {
                that.setData({
                    datelineList: that.data.datelineList.concat(res.list),
                    totalpage: res.total,
                });
                if (that.data.pageIndex == res.total) {
                    that.setData({
                        hasMore: false, //无数据时提示没有更多数据
                    })
                }
            }
            else if (res.order == "lastpost") {
                that.setData({
                    lastpostList: that.data.lastpostList.concat(res.list),
                    totalpage: res.total,
                });
                if (that.data.pageIndex == res.total) {
                    that.setData({
                        hasMore: false, //无数据时提示没有更多数据
                    })
                }
            } else if (res.order == "hot") {
                that.setData({
                    hotList: that.data.hotList.concat(res.list),
                    totalpage: res.total,
                });
                if (that.data.pageIndex == res.total) {
                    that.setData({
                        hasMore: false, //无数据时提示没有更多数据
                    })
                }
            }
        }, res=>{
            wx.hideNavigationBarLoading();
        }, () => {
            wx.hideNavigationBarLoading();
        })
    }
}) 