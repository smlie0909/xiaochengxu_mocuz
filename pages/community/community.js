//获取应用实例 
const DES3 = require('../../utils/DES3.min').des;
const sectionListUrl = require('../../config').sectionList;
const sectionIconUrl = require('../../config').sectionIcon;
const app = getApp()
Page({
    data: {
        currentTab: 0,
        IconData:{},    //版块数据
        datelineList: [], //放置最新发帖的数组 
        hotList: [], //放置本地爆料的数组 
        lastpostList: [], //放置最新回复的数组 
        pageIndex: 1,    //页码
        totalpage: "", //总页数
        pagesize: 20,      //返回数据的个数  
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
    jumpDetails: function (event) {
        // console.log(event.currentTarget.id)
        let itemId = event.currentTarget.id
        wx.navigateTo({
            url: '/pages/details/details?id=' + itemId
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
        wx.request({
            url: sectionIconUrl,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    IconData: res.data.catlist,
                })
            }

        })
    },
    //话题列表加载
    requestsectionListDate: function () {
        let that = this;
        // console.log(that.data.pageIndex, that.data.totalpage) 
        let dir = '{"order":"' + that.data.init +'","page":"' + that.data.pageIndex + '"}';
        let des3en = DES3.encrypt(app.globalData.key, dir);   
        wx.request({
            url: sectionListUrl,
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            data: des3en,
            success: function (res) {
                // console.log(res.data)
                if (res.data.order =="dateline"){
                    that.setData({
                        datelineList: that.data.datelineList.concat(res.data.list),
                        totalpage: res.data.total,
                    });
                    if (that.data.pageIndex == res.data.total) {
                        that.setData({
                            hasMore: false, //无数据时提示没有更多数据
                        });
                    }
                }
                else if (res.data.order == "lastpost"){
                    that.setData({
                        lastpostList: that.data.lastpostList.concat(res.data.list),
                        totalpage: res.data.total,
                    }); 
                    if (that.data.pageIndex == res.data.total) {
                        that.setData({
                            hasMore: false, //无数据时提示没有更多数据
                        });
                    }
                } else if (res.data.order == "hot"){
                    that.setData({
                        hotList: that.data.hotList.concat(res.data.list),
                        totalpage: res.data.total,
                    });
                    if (that.data.pageIndex == res.data.total) {
                        that.setData({
                            hasMore: false, //无数据时提示没有更多数据
                        });
                    }
                }
            }
        })
    }
}) 