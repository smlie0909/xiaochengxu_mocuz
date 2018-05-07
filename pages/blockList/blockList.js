const DES3 = require('../../utils/DES3.min').des;
const topicUrl = require('../../config').topicList;
const app = getApp();
Page({
    data: {
        pageIndex: 1, //页码
        winHeight: "",//窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        expertList: [{ //假数据
            img: "avatar.png",
            name: "欢顔",
            tag: "知名情感博主",
            answer: 134,
            listen: 2234
        }]
    },
    onLoad: function (option) {
        wx.setNavigationBarTitle({
            title: option.title//页面标题为路由参数
        })
        let that = this;
        //  高度自适应
        // wx.getSystemInfo({
        //     success: function (res) {
        //         var clientHeight = res.windowHeight,
        //             clientWidth = res.windowWidth,
        //             rpxR = 750 / clientWidth;
        //         var calc = clientHeight * rpxR - 180;
        //         that.setData({
        //             winHeight: calc
        //         });
        //     }
        // });
        this.requestTopiclistDate()
    },
    // 加载热门话题数据
    requestTopiclistDate: function () {
        let that = this;
        let dir = '{"auth":"","op":"index","page":"' + that.data.pageIndex +'"}';
        let des3en = DES3.encrypt(app.globalData.key, dir);
        wx.request({
            url: topicUrl,
            method: 'POST',
            data: des3en,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
                // that.setData({
                //     rankingData: res.data.hot_post,
                //     hotData: that.data.hotData.concat(res.data.posts),
                //     totalpage: res.data.posts_totalpage,
                // })
            }
        })
        
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
        var cur = e.target.dataset.current;
        // console.log(cur)
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
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