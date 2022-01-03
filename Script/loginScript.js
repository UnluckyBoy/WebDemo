document.querySelector('.img-btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s-signup')
});
window.onload = function() {
    var mInputs = document.getElementsByTagName("input");
    var login_btn = document.getElementById("login-btn");
    var register_btn = document.getElementById("register-btn");

    login_btn.onclick = function() {
        if ((!mInputs[0].value || !mInputs[1].value)) {
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
                        window.location.href = "../index.html?data=" + window.encodeURIComponent(JSON.stringify(result)); //将result转Json传输
                        //alert("To-Json: " + JSON.stringify(result));
                    }
                },
                error: function(msg) {

                }
            });
        }
    }

    register_btn.onclick = function() {
        if ((!mInputs[0].value || !mInputs[1].value)) {
            alert("输入内容不能为空");
        }
    }
}