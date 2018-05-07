const DES3 = require('../../utils/DES3.min').des;
const topicUrl = require('../../config').topicDetails;
const app = getApp();
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
        this.requestTopiclistDate();
    },
    //帖子详情
    jumpDetails: function (event) {
        let itemId = event.currentTarget.id;
        wx.navigateTo({
            url: '/pages/details/details?id=' + itemId
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
        let dir = '{"auth":"","page":"' + that.data.pageIndex+'","tname":"' + that.options.title + '","tid":"' + that.options.id +'"}';
        let des3en = DES3.encrypt(app.globalData.key, dir);
        wx.request({
            url: topicUrl,
            method: 'POST',
            data: des3en,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data)
                that.setData({
                    detailimg: res.data.detailimg,
                    title: res.data.title,
                    involcount: res.data.involcount,
                    piccount: res.data.piccount,
                    part_ava: res.data.part_avatars,
                    topicsData: that.data.topicsData.concat(res.data.post_info),
                    totalpage: res.data.posts_totalpage,
                });
                // console.log(that.data.pageIndex, that.data.totalpage)
                if (that.data.pageIndex == that.data.totalpage) { //当pageIndex小于page页数时加载数据 
                    that.setData({
                        hasMore: false, //无数据时提示没有更多数据
                    });
                }
            }
        })
    }
});