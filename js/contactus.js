function initMap(){
    let map = new BMap.Map("contactus-map");
    let here = new BMap.Point(__location.lon__,__location.lat__);
    map.centerAndZoom(here, 18);
    
    let opts = {    
        width : 250,
        height: 100,
        title : "__title.full__" 
    };
    let infoWindow = new BMap.InfoWindow("地址：__contact.address__ <br>电话：__contact.phone__", opts);
    map.openInfoWindow(infoWindow, map.getCenter());      // 打开信息窗口

    var marker = new BMap.Marker(here);
    map.addOverlay(marker);

    map.disableScrollWheelZoom();
}

var successMsg = {title: "提交成功",
                  msg: "感谢您的反馈，我们将尽快与您联系！"};
var failMsg = {title: "提交失败",
               msg: "非常抱歉，服务器出现未知错误，请通过电话或Email直接联系我们！"};

function validEmail(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validPhone(phone){
    return (/^1[34578]\d{9}$/.test(phone));
}

function initSubmitForm(){
    let btn = document.getElementById("submitFeedback");
    btn.onclick=function(){
        let phone = document.getElementById("phone").value;
        let email =  document.getElementById("email").value;
        let data = {email: email,
                    phone: phone,
                    username: document.getElementById("username").value,
                    message: document.getElementById("message").value};

        if (phone && phone.length>0 && !validPhone(phone)){
            showModal("提交失败", "请输入有效的手机号！");
            return;
        }

        if (email && email.length>0 && !validEmail(email)){
            showModal("提交失败", "请输入有效的Email地址！");
            return;
        }
        
        let request = {method: "POST",
                       body: JSON.stringify(data)};
        fetch("/emt-feedback", request)
            .then(function(response) {
                if (response.status==200){
                    return response.json();
                }else {
                    return {};
                }
            })
            .then(function(resp) {
                if (resp.code===0){
                    showModal(successMsg.title, successMsg.msg);
                }else {
                    showModal(failMsg.title, resp.msg || failMsg.msg);
                }
                
            });
    };
}

function showModal(title, msg){
    $("#contactModal h5.modal-title").text(title);
    $("#contactModal .modalprod__title").text(msg);
    $("#contactModal").modal("show");
}

(function(){
    initSubmitForm();
    
    initMap();
})();
