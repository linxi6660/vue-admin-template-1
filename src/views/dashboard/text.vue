<template>
    <div class="container">
    <div class="container-fluid centerdiv">
        <!--<form id="loginform" action="Main.html" onsubmit="return check()">-->
        <h2 class="title">Login</h2>
        <div class="login-div cen">
            <div id="face-box">
                <video id="video"></video>
            </div>
            <div id="overflow">

            </div>
            <div style="display: none;">
                <canvas id="canvas"></canvas>
            </div>
        </div>
        <!--</form>-->
    </div>
</div>
</template>
<style >



.centerdiv {
    position: relative;
    /*border: 1px solid red;*/
    /* border: ; */
    margin: 0;
    padding: 0;
    height: 100%;
}


#login-div {
    margin: auto auto;
    /*border: 1px solid black;*/
    height: 300px;
    width: 300px;
}

#face-box {
    /*border: 1px solid deepskyblue;*/
    background: royalblue;
    height: 300px;
    width: 300px;
    padding-top: 10px;
    border-radius: 300px;
    overflow: hidden;
}

#video {
    margin-left: -100px;
    margin-top: -10px;
}

.title {
    text-align: center;
    color: darkturquoise;
}

#register {
    display: block;
    margin: 0 auto
}

</style>
<script>
var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var mediaStreamTrack = null;

function success(stream) {
    mediaStreamTrack = stream;
    try {
        video.srcObject = stream;
    } catch (e) {
        console.log("访问用户媒体设备失败：", e.name, e.message);
    }

    video.play();
}

function error(e) {
    console.log('访问用户媒体失败：', e.name, e.message);
}

function getUserMediaToPhoto(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constraints, success, error);
    } else if (navigator.mozGetUserMedia) {
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constraints, success, error);
    }
}

function getFace() {
    context.drawImage(video, 0, 0, 180, 150);
    var img = canvas.toDataURL('image/jpg')
    img = img.split(',')[1];
    return img;
}

function openUserMedia() {
    if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
        getUserMediaToPhoto({video: {width: 480, height: 320, facingMode: "user"}}, success, error);
    } else {
        alert('你的浏览器不支持访问用户媒体设备');
    }
}

function offUserMedia() {
    if (mediaStreamTrack != null)
        mediaStreamTrack.getTracks()[0].stop();
}

$(function () {
    $("#face-box").show();
    openUserMedia();
    Facelogin();
})


function Facelogin() {
    setTimeout(function () {
        var img = getFace();
        console.log(img);
        // $.ajax({
        //     type: "post",
        //     url: "http://localhost:8080/user/faceRecognition",//后台接口
        //     data: {
        //         "image": img,
        //         "imgType": "BASE64"
        //     },
        //     dataType: "json",
        //     success: function (data) {
        //         console.log(data);
        //         var start = data["code"]
        //         if (start === 0 && data['data'].length > 0) {
        //             console.log(data['data'][0])
        //             alert("用户id:" + data["data"][0].name + "登录")
        //         } else {
        //             console.log("匹配失败")
        //             Facelogin();
        //         }
        //     },
        //     error: function () {
        //         alert("连接服务器失败")
        //     },
        //     async: true
        // })
    }, 500);
}



</script>
