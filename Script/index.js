/**
 * DOM加载完直接执行，用于加载图片等
 */
$(function() {

    // var cookie=document.cookie;
    // console.log("登录Cookie:" + cookie+"  格式:"+typeof(cookie))

    //decodeURIComponent解编码，用 location.search 来获取传递值
    var str = decodeURIComponent(location.search.slice(1).split("=")[1])
    if (str != null || str != "") {
        console.log("Json:" + str)
        var Json_Obj = $.parseJSON(str); //Json转Odj
        //console.log("Json转对象:" + Json_Obj)
        $("#uName").text(Json_Obj.name); //绑定用户名

        //绑定头像url
        var handUrl = "http://localhost:8080/getImage" + Json_Obj.image;
        console.log("hand_url:" + handUrl)
        $("#handImage").attr("src", handUrl);
    }
});