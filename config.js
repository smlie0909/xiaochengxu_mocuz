/**
 * 小程序配置文件
 */
let config = {
    APIServer: "http://utf8develop.mocuz.com",
    //无sharecircle接口
    API_URL: 'http://utf8develop.mocuz.com/mocuz/42/index.php?mod=',
    //sharecircle接口
    API_URL_: 'http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/',
    // 首页
    homeList:"http://utf8develop.mocuz.com/mocuz/42/index.php?debug_key=moczu%23%23%23!!!!2015887&mocuz_debug=1&mocuz_encrypt=1&mod=homelist&pool_status=1",
    //banner列表
    bannerList: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://www.mocuz.com/api_index/index/device/common/version/3.0/mod/common/act/GetLuanch_Advert",
    //话题列表
    topicList:"http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/topic/topic_list",
    
    //热门帖子
    postHotList: "http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/post/post_hot",
    //社区点赞
    praise:"http://utf8develop.mocuz.com/mocuz/42/index.php?mod=praisethread",
};
module.exports = config
