function translate (word) {
    var query = '一共78个错误';
    var appid = '20190130000260357';
    var key = 'ad0HuSCtr35WmBVzwoC6';
    var salt = (new Date).getTime();
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    var from = 'zh';
    var to = 'en';
    var str1 = appid + query + salt +key;
    var sign = MD5(str1);
    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'get',
        dataType: 'jsonp',
        data: {
            q: query,
            appid: appid,
            salt: salt,
            from: from,
            to: to,
            sign: sign
        },
        success: function (data) {
            console.log(data);
        } 
    });    
}
translate()