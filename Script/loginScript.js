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
                success: function(resultSource) {
                    var result=$.parseJSON(JSON.stringify(resultSource));
                    if (result.result == "error") {
                        console.log(result+"类型:"+typeof(result));
                        //登录成功，保存cookie
                        //document.cookie = result;
                        //console.log(document.cookie.image);
                        
                        alert("账户未注册，请检查！" + $("#account").val());
                    }else{
                        //登录成功，保存cookie
                        //document.cookie=JSON.stringify(resultSource);

                        console.log(result+"类型:"+typeof(result)+JSON.stringify(resultSource));
                        //window.location.href = "../index.html?data=" + window.encodeURIComponent(JSON.stringify(resultSource)); //将result转Json传输
                        //window.location.href = "../index.html";
                        //form.action = "../index.html";
                        var form = document.querySelector('form-sign-in');//表单
                        console.log("表单:"+form);
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