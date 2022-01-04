document.querySelector('.img-btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s-signup')
});

$(function() {
    var login = document.getElementById("login-btn");
    var register = document.getElementById("register-btn");

    login.onclick = function() {
        if (($("#account").val() == null || $("#account").val() == "") ||
            ($("#password").val() == null || $("#password").val() == "")) {
            console.log($("#account").val());
            alert("输入内容不能为空");
        } else {
            $.ajax({
                method: "post",
                url: "http://localhost:8080/UserInfo/login",
                dataType: "json",
                async: true,
                data: "account=" + $("#account").val() + "&password=" + $("#password").val(),
                success: function(result) {
                    if (result != null) {
                        console.log(result);
                        //登录成功，保存cookie
                        //document.cookie = result.token;
                        window.location.href = "../index.html?data=" + window.encodeURIComponent(JSON.stringify(result)); //将result转Json传输
                        //alert("To-Json: " + JSON.stringify(result));
                    }
                },
                error: function(msg) {

                }
            });
        }
    }

    /**
     * 注册按钮握手数据
     */
    register.onclick = function() {
        if (($("#up_name").val() == null || $("#up_name").val() == "") ||
            ($("#up_account").val() == null || $("#up_account").val() == "") ||
            ($("#up_password").val() == null || $("#up_password").val() == "") ||
            ($("#up_confirm").val() == null || $("#up_confirm").val() == "")) {
            alert("输入内容不能为空");
        } else if ($("#up_password").val() == $("#up_confirm").val()) {
            $.ajax({
                method: "post",
                url: "http://localhost:8080/UserInfo/register",
                dataType: "json",
                async: false,
                data: "name=" + $("#up_name").val() + "&account=" + $("#up_account").val() + "&password=" + $("#up_password").val(),
                success: function(resultData) {
                    if (resultData != null) {
                        var mJson = $.parseJSON(JSON.stringify(resultData));
                        console.log(mJson.result + "_的类型:" + typeof(mJson.result));
                        if (mJson.result == "false") {
                            //已注册
                            alert("此账号已注册，请检查！");
                        } else {
                            //尚未注册，获取注册结果，跳转主页
                            window.location.href = "../index.html?data=" + window.encodeURIComponent(JSON.stringify(resultData));
                        }
                    }
                },
                error: function(msg) {

                }
            });
        } else {
            alert("两次密码输入异常，请检查！");
        }
    }
});