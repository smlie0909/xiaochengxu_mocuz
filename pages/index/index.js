//index.js
const WxParse = require('../../wxParse/wxParse.js');
const bannnerUrl = require('../../config').bannerList;
const homeUrl = require('../../config').homeList;
const app = getApp(); 
Page({
  data: { 
        bannerData: {}, //banner轮播图
        newsData:[],    //帖子列表
        pageIndex: 1, //页码
        totalpage: "", //总页数
        pagesize: 20,      //返回数据的个数  
        hasMore: true,  //"上拉加载"的变量，默认true，显示; “没有数据”的变量，false，隐藏
    },
    
    onLoad: function () {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 1000,
            mask: true
        }); 
        this.requestBannerDate();
        this.requestNewslistDate();
        this.requestExpression();
    },
    //事件处理函数
    jumpDetails: function (event) {
        // console.log(event.currentTarget.id)
        let itemId = event.currentTarget.id
        wx.navigateTo({
            url: '/pages/details/details?id=' + itemId
        })
    },
    //   加载更多
    lower: function () {
        this.setData({
            pageIndex: this.data.pageIndex + 1, //每次下拉到底部触发 pageIndex+1
        })
        this.requestNewslistDate();
    },
    //  下拉刷新
    upper:function(){
        wx.showNavigationBarLoading(); //在标题栏中显示加载
        //模拟加载
        setTimeout(function () {
            wx.hideNavigationBarLoading(); //完成停止加载
            wx.stopPullDownRefresh(); //停止下拉刷新
        }, 1500);
    },
    // Banner列表
    requestBannerDate :function(){
        let that = this;
        wx.request({
            url: bannnerUrl,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    bannerData: res.data.position_list[0].ad_list,
                })
            }
        })
    },
    // 帖子列表
    requestNewslistDate: function(){
        let that = this;
        // console.log(that.data.pageIndex)
        if (that.data.pageIndex == that.data.totalpage) { //当pageIndex小于4时加载数据 
            that.setData({
                hasMore: false, //无数据时提示没有更多数据
            });
        }else {
            wx.request({
                url: homeUrl + "&page=" + that.data.pageIndex,
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    // console.log(res.data.content_lists)
                    that.setData({
                        newsData: that.data.newsData.concat(res.data.content_lists),
                        totalpage: res.data.total_page
                    })
                }
            })
        }
    },
    requestExpression:function(){
        /**
         * 初始化emoji设置
         */
        WxParse.emojisInit('{:mocs_:}', "/wxParse/emojis/", {
            "1": "mocs_1.png",
            "2": "mocs_2.png",
            "3": "mocs_3.png",
            "4": "mocs_4.png",
            "5": "mocs_5.png",
            "6": "mocs_6.png",
            "7": "mocs_7.png",
            "8": "mocs_8.png",
            "9": "mocs_9.png",
            "10": "mocs_10.png",
            "11": "mocs_11.png",
            "12": "mocs_12.png",
            "13": "mocs_13.png",
            "14": "mocs_14.png",
            "15": "mocs_15.png",
            "16": "mocs_16.png",
            "17": "mocs_17.png",
            "18": "mocs_18.png",
            "19": "mocs_19.png",
            "20": "mocs_20.png",
            "21": "mocs_21.png",
            "22": "mocs_22.png",
            "23": "mocs_23.png",
            "24": "mocs_24.png",
            "25": "mocs_25.png",
            "26": "mocs_26.png",
            "27": "mocs_27.png",
            "28": "mocs_28.png",
            "29": "mocs_29.png",
            "30": "mocs_30.png",
            "31": "mocs_31.png",
            "32": "mocs_32.png",
            "33": "mocs_33.png",
            "34": "mocs_34.png",
            "35": "mocs_35.png",
            "36": "mocs_36.png",
            "37": "mocs_37.png",
            "38": "mocs_38.png",
            "39": "mocs_39.png",
            "40": "mocs_40.png",
            "41": "mocs_41.png",
            "42": "mocs_42.png",
            "43": "mocs_43.png",
            "44": "mocs_44.png",
            "45": "mocs_45.png",
            "46": "mocs_46.png",
            "47": "mocs_47.png",
            "48": "mocs_48.png",
            "49": "mocs_49.png",
            "50": "mocs_50.png",
            "51": "mocs_51.png",
            "52": "mocs_52.png",
            "53": "mocs_53.png",
            "54": "mocs_54.png",
            "55": "mocs_55.png",
            "56": "mocs_56.png",
            "57": "mocs_57.png",
            "58": "mocs_58.png",
            "59": "mocs_59.png",
            "60": "mocs_60.png",
            "61": "mocs_61.png",
            "62": "mocs_62.png",
            "63": "mocs_63.png",
            "64": "mocs_64.png",
            "65": "mocs_65.png",
            "66": "mocs_66.png",
        })
    }
})
