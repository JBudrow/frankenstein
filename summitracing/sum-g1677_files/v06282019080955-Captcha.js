function InitCaptcha(url, hasAudio, audioPath, expireTime) {
    var timer;
    if (hasAudio == 'True') {
        $(".audio-play").click(function (e) {
            BindAudioPlay(".audio-play", audioPath);
        });//End audio-play.click
    } else {
        $(".audio-play").remove();
    } //End If/Else
    $(".new-captcha").click(function () {
        newCaptcha(url, false);
        clearTimeout(timer);
        $(this).unbind("expire");
    });
    $(".new-captcha").bind("expire", function (e) {
        newCaptcha(url, false);
        $(this).unbind("expire");
    });
    timer = setTimeout(function () {
        $(".new-captcha").trigger("expire");
    }, expireTime);
}; //End InitCaptcha

function BindAudioPlay(selector, audioPath) {
    AudioPlay(audioPath);
    $(selector).unbind("click");
    $(selector).attr("src", "/images/DisabledSoundIcon.gif");
    setTimeout(function () {
        $(selector).attr("src", "/images/SoundIcon.gif");
        $(selector).click(function (e) {
            BindAudioPlay(".audio-play", audioPath);
        });
    }, 5500);
}; //End BindAudioPlay

function AudioPlay(audioPath) {
    var audioHtml;
    var html5SoundSupported;
    var instanceId = $("#InstanceId").val();
    var captchaId = $("#CaptchaId").val();
    var browserCompatibilityCheck = document.createElement('audio');
    html5SoundSupported = (!!(browserCompatibilityCheck.canPlayType) && !!(browserCompatibilityCheck.canPlayType("audio/wav")));
    if (html5SoundSupported && !IsSafari() || html5SoundSupported && IsChrome()) {
        audioHtml = "<audio autoplay='autoplay'>";
        audioHtml += '<source src="'+audioPath+'" type="audio/wav">';
        audioHtml += "</audio>";
    } else {
        audioHtml = '<object id="CaptchaSoundObject" classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" height="0" width="0" style="width:0; height:0;"><param name="AutoStart" value="1" /><param name="Volume" value="50" /><param name="PlayCount" value="1" /><param name="FileName" value="' + audioPath + '" /><embed id="CaptchaSoundEmbed" src="' + audioPath + '" autoplay="true" hidden="true" volume="100" type="audio/wav" style="display:inline;" /></object>';
    } //End If/Else
    $("#sound-placeholder").html(audioHtml);
}; //End AudioPlay

function IsSafari() {
    var detected = false;
    if (navigator && navigator.userAgent) {
        var matches = navigator.userAgent.match(/Safari/);
        detected = matches;
    }
    return detected;
}; //End IsSafari

function IsChrome() {
    var detected = false;
    if (navigator && navigator.userAgent) {
        var matches = navigator.userAgent.match(/Chrome/);
        detected = matches;
    }
    return detected;
}; //End IsChrome

function newCaptcha(url, hasError) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        success: function (result) {
            $(".captcha-wrapper").hide().html(result).fadeIn();
            if (hasError === true) {
                if (!$(".actions.captcha-input-container").hasClass("item-error")) {
                    $(".actions.captcha-input-container").addClass("item-error");
                    $(".actions.captcha-input-container").append("<p class='incorrectWords'>Incorrect Security Words. Please try again.</p>");
                }
            }
        }
    });
}; //End newCaptcha

