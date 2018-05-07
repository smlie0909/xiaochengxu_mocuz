const DES3 = require('../../utils/DES3.min').des;
const hotUrl = require('../../config').hotList;
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
Page({
    data: {
        domain: app.globalData.domain,//域名
        hotData: [],    //帖子列表
        contentData: [],
        topicsData: {}, //热门话题展示列表
        rankingData: {}, //人气排行展示列表
        iconData:[],
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
        this.firstHotlist();
        this.requestHotlistDate()
        
    },
    //帖子详情
    jumpDetails: function (event) {
        let itemId = event.currentTarget.id;
        wx.navigateTo({
            url: '/pages/details/details?id=' + itemId
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
    //首次加载的热门话题列表
    firstHotlist: function () {
        let that = this;
        let dir = '{"auth":"","op":"index","page":"1"}';
        let des3en = DES3.encrypt(app.globalData.key, dir);
        wx.request({
            url: hotUrl,
            method: 'POST',
            data: des3en,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data.topics)
                that.setData({
                    topicsData: that.getRandomArrayElements(res.data.topics, 3),
                })
            }
        })
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
    like:function(){

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
        let dir = '{"auth":"","op":"index","version":"4","page":"' + that.data.pageIndex +'"}';
        let des3en = DES3.encrypt(app.globalData.key, dir);
        // console.log(that.data.pageIndex, that.data.totalpage)
        if (that.data.pageIndex == that.data.totalpage) { //当pageIndex小于page页数时加载数据  
            that.setData({
                hasMore: false, //无数据时提示没有更多数据
            });
        } else {
            wx.request({
                url: hotUrl,
                method: 'POST',
                data: des3en,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    // console.log(res.data.posts)
                    that.setData({
                        rankingData: res.data.hot_post,
                        hotData: that.data.hotData.concat(res.data.posts),
                        totalpage: res.data.posts_totalpage,
                    })
                    for (let i = 0; i < that.data.hotData.length;i++){
                        WxParse.wxParse('reply' + i, 'html', that.data.hotData[i].message, that);
                        if (i === that.data.hotData.length - 1) {
                            WxParse.wxParseTemArray("contentData", 'reply', that.data.hotData.length, that);                  
                        }
                    }
                    // console.log(that.data.contentData)
                }
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