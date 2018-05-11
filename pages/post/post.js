const app = getApp(); 
const util = require('../../utils/util.js');
const topicListUrl = require('../../config').topicList
Page({
    data: {
        pics: [], //上传图片
        title:"",  //标题
        content:'', //内容
        pagetype:'' //当前页的状态
    },
    onLoad: function () {
        let that = this
        console.log(this.options.post)
        this.setData({
            pagetype: that.options.post
        });
        if(this.options.post == "local"){
            this.requestTopicListDate()
        }
    },
    // 加载话题列表
    requestTopicListDate:function(){
        
    },
    //发布帖子
    release:function(){
        if (this.data.pagetype =="community"){
            this.communityPost()
        }else{
            this.localPost()
        }
    },
    // 社区发帖
    communityPost:function(){
        let that = this;
        wx.showNavigationBarLoading();
        let dir = '{"auth":"' + app.globalData.userInfo.auth + '","subject":"' + that.data.title + '","message":"' + that.data.content + '' + that.data.pics +'","fid":"' + that.options.id + '"}';
        if (that.data.content != '' && that.data.title!=''){
            util.api_call("newthread", dir, res => {
                console.log(res);
                wx.hideNavigationBarLoading();
                wx.navigateBack({
                    delta: 2
                })
            }, (res) => {
                wx.hideNavigationBarLoading();
                wx.showToast({
                    title: res.msg,
                })
            }, () => {
                wx.hideNavigationBarLoading();
            });
        } else if (that.data.title == '') {
            wx.hideNavigationBarLoading();
            app.toastShow(that, "标题不能为空哦~", "icon-xinxitianxie");
        } else if (that.data.content == ''){
            wx.hideNavigationBarLoading();
            app.toastShow(that, "内容不能为空哦~", "icon-xinxitianxie");
        } 
        
    },
    // 本地圈发帖
    localPost:function(){

    },
    // 发布标题
    title: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    // 发布内容
    content: function (e) {
        this.setData({
            content: e.detail.value
        })
    },
    choose: function () {//这里是选取图片的方法
        let that = this,
            pics = this.data.pics;
        wx.chooseImage({
            count: 9 - pics.length, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
            sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
            success: function (res) {
                let imgsrc = res.tempFilePaths;
                pics = pics.concat(imgsrc);
                that.setData({
                    pics: pics
                });
                // console.log(that.data.pics)
            },
            fail: function () {
                wx.hideToast();
                wx.showModal({
                    title: '错误提示',
                    content: '上传图片失败',
                    showCancel: false,
                    success: function (res) { }
                })
            },
            complete: function () {
                // complete
            }
        })

    },
    // 删除图片
    deleteImg: function (e) {
        let imgs = this.data.pics;
        let index = e.currentTarget.dataset.index;
        imgs.splice(index, 1);
        this.setData({
            pics: imgs
        });
    },
    // 预览图片
    previewImg: function (e) {
        //获取当前图片的下标
        let index = e.currentTarget.dataset.index;
        //所有图片
        let imgs = this.data.pics;
        wx.previewImage({
            //当前显示图片
            current: imgs[index],
            //所有图片
            urls: imgs
        })
    },
    uploadimg: function () {//这里触发图片上传的方法
        let pics = this.data.pics;
        console.log(pics)
        app.uploadimg({
            url: 'https://........',//这里是你图片上传的接口
            path: pics//这里是选取的图片的地址数组
        });
    },
})