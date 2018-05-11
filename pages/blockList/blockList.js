const app = getApp()
const util = require('../../utils/util.js')
Page({
    data:{
        currentTab: 0, //预设当前项的值
        top:{},
        threadtypes:{},
        allList:[],
        pageIndex: 1,    //页码
        totalpage: "", //总页数 
        hasMore: true,  //"上拉加载"的变量，默认true，显示; “没有数据”的变量，false，隐藏
    },
    onLoad: function (option) {
        wx.setNavigationBarTitle({
            title: option.title//页面标题为路由参数
        });
        this.requestTopiclistDate()
    },
    //加载更多
    lower: function () {
        this.setData({
            pageIndex: this.data.pageIndex + 1, //每次下拉到底部触发 pageIndex+1
        })
        this.requestTopiclistDate();
    },
    jumpDetails: function (event) {
        console.log(event)
        let tid = event.currentTarget.dataset.tid
        let uid = event.currentTarget.dataset.uid
        let itemName = event.currentTarget.dataset.details
        let gender = event.currentTarget.dataset.gender
        wx.navigateTo({
            url: '/pages/details/details?tid=' + tid + '&uid=' + uid + '&details=' + itemName + '&gender=' + gender
        })
    },
    // 加载版块帖子列表数据
    requestTopiclistDate: function () {
        let that = this;
        let dir = '{"auth":"' + app.globalData.userInfo.auth +'","fid":"'+that.options.id+'","page":"' + that.data.pageIndex +'"}';
        util.api_call("forumdisplay", dir, res => {
            that.setData({
                top: res.top,
                threadtypes: res.threadtypes,
                allList: that.data.allList.concat(res.list),
                totalpage: res.total,
            })
            if (that.data.pageIndex == res.total || res.total == 0) {
                that.setData({
                    hasMore: false, //无数据时提示没有更多数据
                });
            }
        }, null, null);
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        let cur = e.target.dataset.current
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur,
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 4) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
})