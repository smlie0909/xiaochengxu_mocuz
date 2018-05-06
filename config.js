/**
 * 小程序配置文件
 */

var config = {
    APIServer: ' http://utf8develop.mocuz.com',
    //首页
    productLibrary: 'http://demo.mocuz.com/mocuz/tests/index.php?url=http://bbs.mocuz.com/mocuz/3.0/index.php?mod=bootstart',
    homeList:"http://utf8develop.mocuz.com/mocuz/42/index.php?debug_key=moczu%23%23%23!!!!2015887&mocuz_debug=1&mocuz_encrypt=1&mod=homelist&pool_status=1",
    //banner列表
    bannerList: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://www.mocuz.com/api_index/index/device/common/version/3.0/mod/common/act/GetLuanch_Advert",
    //社区版块
    sectionList: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://utf8develop.mocuz.com/mocuz/42/index.php?mod=forumindex",
    sectionIcon:"http://demo.mocuz.com/mocuz/tests/index.php?url=http://utf8develop.mocuz.com/mocuz/3.0/index.php?mod=index",
    // 本地圈
    hotList: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/topic/get_topic_index/",
    // 帖子详情
    detailsList:"http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/post/post_detail_share/",
    // 话题列表
    topicList:"http://demo.mocuz.com/mocuz/tests/index.php?url=http://utf8develop.mocuz.com/mocuz/manage/index.php?/api/sharecircle/topic/topic_list",
    //热门帖子
    postHotList: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://bbs.mocuz.com/mocuz/manage/index.php?/api/sharecircle/post/post_hot",
    //登录
    login: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://bbs.mocuz.com/mocuz/3.0/index.php?mod=login",
    //注册
    register: "http://demo.mocuz.com/mocuz/tests/index.php?url=http://bbs.mocuz.com/mocuz/3.0/index.php?mod=register",
};
module.exports = config
