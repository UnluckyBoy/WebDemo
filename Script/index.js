$(function() {
    //decodeURIComponent解编码，用 location.search 来获取传递值
    var str = decodeURIComponent(location.search.slice(1).split("=")[1])
    console.log("Json:" + str)
    var Json_Obj = $.parseJSON(str); //Json转Odj

    $("#uName").text(Json_Obj.name + ",欢迎您！"); //绑定用户名

    //绑定头像url
    var handUrl = "http://localhost:8080/getImage" + Json_Obj.image;
    console.log("hand_url:" + handUrl)
    $("#handImage").attr("src", handUrl);
});