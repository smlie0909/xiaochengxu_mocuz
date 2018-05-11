const app = getApp()
const WxParse = require('../../wxParse/wxParse.js')
const util = require('../../utils/util.js')
Page({
    data: {
        currentIndex: null,
        domain: app.globalData.domain,//域名
        hotData: [],    //帖子列表
        contentData: [],
        topicsData: {}, //热门话题展示列表
        rankingData: {}, //人气排行展示列表
        iconData:[],
        pageIndex: 1, //页码
        totalpage: "", //总页数
        hasMore: true,  //"上拉加载"的变量，默认true，显示; “没有数据”的变量，false，隐藏
        praisetype: false //点赞状态
    },
    onLoad:function(){
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        });
        this.firstHotlist();
        if (!app.globalData.userInfo) {
            app.globalData.userInfo = "";
            this.requestHotlistDate()
        } else {
            this.requestHotlistDate()
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
    //话题详情
    jumpTopics: function (event){
        let itemId = event.currentTarget.id;
        let itemName = event.currentTarget.dataset.title;
        wx.navigateTo({
            url: '/pages/topicList/topicList?id=' + itemId + '&title=' + itemName
        })
    },
    jumpPost: function (event) {
        let post = event.currentTarget.dataset.post
        wx.navigateTo({
            url: '/pages/post/post?post=' + post
        })
    },
    //首次加载的热门话题列表
    firstHotlist: function () {
        let that = this;
        let dir = '{"auth":"","op":"index","page":"1"}';
        util.api_massage("topic/get_topic_index", dir, res => {
            // console.log(res.posts)
            that.setData({
                topicsData: that.getRandomArrayElements(res.topics, 3),
            })
        },null, null)
    },
    //加载更多
    lower: function () {
        let that = this;
        this.setData({
            pageIndex: this.data.pageIndex + 1, //每次下拉到底部触发 pageIndex+1
        })
        setTimeout(function () {
            that.requestHotlistDate();
        },1500)
    },
    // 点赞
    like:function(e){
        // console.log(e)
        let that = this;
        if (app.globalData.userInfo.auth){
            let dir = '{"auth":"' + app.globalData.userInfo.auth + '","postid":"' + e.currentTarget.dataset.id + '","to_uid":"' + e.currentTarget.dataset.uid + '"}';
            util.api_massage("post/like_kh", dir, res => {
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
            }, null, null)
        }else{
            wx.navigateTo({
                url: '../login/login',
            })
        }  
    },
    // 评论功能
    comment:function(){

    },
    //换一批
    anotherBatch:function(){
        this.firstHotlist();
    },
    // 加载热门话题数据
    requestHotlistDate: function () {
        let that = this;
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '","op":"index","version":"4","page":"' + that.data.pageIndex + '"}';
        if (that.data.pageIndex == that.data.totalpage) { //当pageIndex小于page页数时加载数据  
            that.setData({
                hasMore: false, //无数据时提示没有更多数据
            });
        } else {
            util.api_massage("topic/get_topic_index/", dir, res => {
                // console.log(res.posts)
                that.setData({
                    rankingData: res.hot_post,
                    hotData: that.data.hotData.concat(res.posts),
                    totalpage: res.posts_totalpage,
                })
                for (let i = 0; i < that.data.hotData.length; i++) {
                    WxParse.wxParse('reply' + i, 'html', that.data.hotData[i].message, that);
                    if (i === that.data.hotData.length - 1) {
                        WxParse.wxParseTemArray("contentData", 'reply', that.data.hotData.length, that);
                    }
                };
            }, res => {
                wx.hideNavigationBarLoading();
            }, () => {
                wx.hideNavigationBarLoading();
            })
        } 
    },
    //数组随机筛选
    getRandomArrayElements: function (arr, count){
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }, 
});