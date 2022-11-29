
var deviceList = document.getElementById('devicelist').value;
var jsession = document.getElementById('jsessionid').value;

var devices = deviceList.split(',');
var windowNum = 9;
windowNum = devices.length * 2;
const serverIp = '8.218.32.7';
const serverPort = 6605;
const languagePath = 'en.xml';
var selectIndex = 0;
var playingStatusArray = [];
const account = 'its';
const password = '000000';
var livesession = '';
const liveVideoIndex = 0;
var isInitFinished = false;
var swfobject;
function onReady() {
    initPlayerExample();
}

function initPlayerExample() {
    for (var i = 0; i < 101; i++) {
        playingStatusArray.push(false);
    }
    var _isVodMode = 0; // 0 Real and 1 for playback
    isInitFinished = false;
    var width = window.screen.width;
    var hieght = window.screen.height;
    var options = {
        domId: "cmsv6flash",
        isVodMode: _isVodMode == "1" ? true : false,
        width: width,
        height: hieght,
        lang: 'en'
    }
    swfobject = new Cmsv6Player(options);
    initFlash();
    // userLogin();
    initSession();
}

function initFlash() {
    if (typeof swfobject == "undefined" ||
        typeof swfobject.setWindowNum == "undefined") {
        setTimeout(initFlash, 50);
    } else {
        swfobject.setLanguage(languagePath);
        swfobject.setWindowNum(36);
        
        swfobject.setWindowNum(windowNum);
        swfobject.setServerInfo(serverIp, serverPort);
        isInitFinished = true;
    }
}


function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function () {
        },
        success: arguments[0].success || function () {
        },
        error: arguments[0].error || function () {
        }
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1)
        return convertResult;
    } else {
        return data;
    }
}
// function userLogin() {
//     var xhr = new XMLHttpRequest();
//     var _url = location.protocol + '//dsm.shoora.com'  + '/StandardApiAction_login.action?account=' + account
//         + "&password=" + password;
//     ajax({
//         type: 'POST',
//         url: _url,
//         cache: false,
//         dataType: 'json',
//         success: function (data) {
//             if (data.result == 0) {
//                 livesession = data.jsession;
//                 var minBufferTime = 0;
//                 var maxBufferTime = 6;
//                 var pos = 0;
//                 for(var i=0; i<devices.length; i++){
//                     if(i == 0){
//                         pos = i;
//                     }
//                     var nextpos = pos + 1;
//                     playLiveVideo(pos,livesession,devices[i],0,1,'Vehicle-'+devices[i],minBufferTime,maxBufferTime);
//                     playLiveVideo(nextpos,livesession,devices[i],1,1,'Vehicle-'+devices[i],minBufferTime,maxBufferTime);
//                     pos = nextpos + 1;
//                 }


                
//                 // For position 0 front
//                 //playLiveVideo(0,livesession,'784087664023',0,1,'Vehicle-784087664023',minBufferTime,maxBufferTime);

//                 // // For position 0 inner
//                 //playLiveVideo(1,livesession,'784087664023',1,1,'Vehicle-784087664023',minBufferTime,maxBufferTime);


//                 // // For position 0 front
//                 //playLiveVideo(2,livesession,'7840876640491',0,1,'Vehicle-784087664049',minBufferTime,maxBufferTime);

//                 // // For position 0 inner
//                 //playLiveVideo(3,livesession,'7840876640491',1,1,'Vehicle-784087664049',minBufferTime,maxBufferTime);

//                 // For position 0 front
//                 //playLiveVideo(2,livesession,'784087664163',0,'1','Vehicle-784087664163',minBufferTime,maxBufferTime);

//                 // For position 0 inner
//                 //playLiveVideo(3,livesession,'784087664163',1,1,'Vehicle-784087664163',minBufferTime,maxBufferTime);

//                 $('#cmsv6flash').css('height',window.screen.height - 150);
//                 $('#cmsv6flash').css('width',window.screen.width - 20);
//                 //$('#cmsv6flash').next('div').css('height',window.screen.height);
//                 //$('#cmsv6flash').next('div').css('width',window.screen.height);
//                 //$('#Cmsv6H5Video-cmsv6flash-1 canvas').attr('width',800)
//                 var height = 'calc(16.6% - 2px)';
//                 var width = 'calc(16.6% - 2px)';
//                 if(devices.length == 1){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(100% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(100% - 2px)');
//                 }

//                 if(devices.length == 2){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');
//                 }

//                 if(devices.length == 3){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');
//                 }

//                 if(devices.length == 4){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
                    

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');
                    
//                 }

//                 if(devices.length == 5){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
                    

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(50% - 2px)');
                    
//                 }

//                 if(devices.length == 6){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
                    

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(50% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-10').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-10').css('height', 'calc(50% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-11').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-11').css('height', 'calc(50% - 2px)');
//                 }

//                 if(devices.length == 8){
//                     $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(25% - 2px)');
                    

//                     $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-10').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-10').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-11').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-11').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-12').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-12').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-13').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-13').css('height', 'calc(25% - 2px)');

//                     $('#Cmsv6H5Video-cmsv6flash-14').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-14').css('height', 'calc(25% - 2px)');
//                     $('#Cmsv6H5Video-cmsv6flash-15').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-15').css('height', 'calc(25% - 2px)');
//                 }
                
//             } else {
//                 alert('Login failed');
//             }
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             try {
//                 if (p.onError) p.onError(XMLHttpRequest, textStatus, errorThrown);
//             } catch (e) {
//             }
//             alert('Login failed');
//         }
//     });
// }

function initSession() {
    var minBufferTime = 0;
    var maxBufferTime = 6;
    var pos = 0;
    for(var i=0; i<devices.length; i++){
        if(i == 0){
            pos = i;
        }
        var nextpos = pos + 1;
        playLiveVideo(pos,livesession,devices[i],0,1,'Vehicle-'+devices[i],minBufferTime,maxBufferTime);
        playLiveVideo(nextpos,livesession,devices[i],1,1,'Vehicle-'+devices[i],minBufferTime,maxBufferTime);
        pos = nextpos + 1;
    }

    $('#cmsv6flash').css('height',window.screen.height - 150);
    $('#cmsv6flash').css('width',window.screen.width - 20);
    var height = 'calc(16.6% - 2px)';
    var width = 'calc(16.6% - 2px)';
    if(devices.length == 1){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(100% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(100% - 2px)');
    }

    if(devices.length == 2){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');
    }

    if(devices.length == 3){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(33% - 2px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');
    }

    if(devices.length == 4){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
        

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');
        
    }

    if(devices.length == 5){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
        

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(20% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(50% - 2px)');
        
    }

    if(devices.length == 6){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(50% - 2px)');
        

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(50% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-10').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-10').css('height', 'calc(50% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-11').css('width', 'calc(16.6% - 3px)');$('#Cmsv6H5Video-cmsv6flash-11').css('height', 'calc(50% - 2px)');
    }

    if(devices.length == 8){
        $('#Cmsv6H5Video-cmsv6flash-0').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-0').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-1').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-1').css('height', 'calc(25% - 2px)');
        

        $('#Cmsv6H5Video-cmsv6flash-2').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-2').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-3').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-3').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-4').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-4').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-5').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-5').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-6').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-6').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-7').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-7').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-8').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-8').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-9').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-9').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-10').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-10').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-11').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-11').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-12').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-12').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-13').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-13').css('height', 'calc(25% - 2px)');

        $('#Cmsv6H5Video-cmsv6flash-14').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-14').css('height', 'calc(25% - 2px)');
        $('#Cmsv6H5Video-cmsv6flash-15').css('width', 'calc(25% - 3px)');$('#Cmsv6H5Video-cmsv6flash-15').css('height', 'calc(25% - 2px)');
    }
}


function setVideoServer() {
    if (!isInitFinished) {
        return;
    } else {
        var serverIp = serverIp;
        var serverPort = serverPort;
        swfobject.setServerInfo(serverIp, serverPort);
    }
}


function playLiveVideo(index,jsession,devIdno,channel,stream,title,minBufferTime,maxBufferTime) {
    if (!isInitFinished) {
        return;
    }
    if (minBufferTime != '') {
        swfobject.setBufferTime(index, minBufferTime);
    }
   
    if (maxBufferTime != '') {
        swfobject.setBufferTimeMax(index, maxBufferTime);
    }

    console.log('swfobject',swfobject);
    swfobject.setVideoInfo(index, title);
    swfobject.startVideo(index, jsession, devIdno, channel, stream, true);
}


function onTtxVideoMsg(index, type) {
    if (index != null && index != "") {
        index = parseInt(index, 10);
    }
    //window message
    if (type == "select") {
        selectIndex = index;
        $('#eventTip', 'Select event: selected  Window ' + (index + 1) + ' ');
    } else if (type == "full") {
    } else if (type == "norm") {
    }
    //video play messsage
    else if (type == "stop") {
        //stop playing
        playingStatusArray[index] = false;
    } else if (type == "start") {
        //Start play
        playingStatusArray[index] = true;
    } else if (type == "sound") {
        //Turn on the sound
    } else if (type == "silent") {
        //Mute
    } else if (type == "play") {
        //Play again after pause or stop
    } else if (type == "PicSave") {
        //screenshot
    }
    
    //Intercom messsage
    else if (type == "startRecive" || type == "uploadRecive" || type == "loadRecive") {
        //Open intercom
    } else if (type == "stopTalk" || type == 'talkFinish') {
        //Turn off intercom
    } else if (type == "playRecive") {
        //Talkback
    } else if (type == "reciveStreamStop" || type == "reciveNetError" || type == "reciveStreamNotFound") {
        //Talkback anomalies (network exceptions, etc.)

    } else if (type == "uploadNetClosed" || type == "uploadNetError") {
        //Connection exception
    } else if (type == "upload") {
        //Talkback speech
    } else if (type == "uploadfull") {
        //Talkback speech ends
    }
    
    //Listen messsage
    else if (type == "startListen") {
        //Start listening
    } else if (type == "stopListen") {
        //Active stop monitoring

    } else if (type == "listenNetError") {
        //Network anomaly

    } else if (type == "playListen") {
        //In listening
    } else if (type == "loadListen" || type == "listenStreamNotFound" || type == "listenStreamStop") {
        //Waiting request monitoring
    } else if (type == 'showDownLoadDialog') {
        alert("down pcm tool");
        downPcmTool();
    } else if (type == 'isTalking') {
        alert("is talking");
    }
}

function stopLiveVideo() {
    if (!isInitFinished) {
        return;
    } else {
        var index = getValue('liveVideoIndex');
        if (index == '') {
            setFocus('liveVideoIndex');
            return;
        }
        swfobject.stopVideo(index);
    }
}

function checkIsPlaying() {
    console.log('playingStatusArray',playingStatusArray)
    if (playingStatusArray[selectIndex]) {
        alert("The currently selected window is Playing video now");
    } else {
        alert('There is no video playback in the current selected window');
    }
}

// var style= "width: 100%; height: 100%; position: absolute; top: 0px; left: 0px; background-image: url('https://shoora.com/img/logo.png'); background-size: 100% 100%; background-color: rgb(0, 0, 0);";
// $('[name="canvasUI"]').attr('style',style);










