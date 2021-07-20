var infoECode = {
    name: "ECode",
    version: "d20210719",
    author: "Sheep-realms",
    license: "GPL 2.0",
    description: "让代码编写变得更轻松",
    config: {}
}

fh.pushAPP(infoECode);

String.prototype.replaceAll = function (FindText, RepText) {
    return this.replace(new RegExp(FindText, "g"), RepText);
}

// 我宣布，JS 的 Date 对象就是傻逼！

// Date.prototype.hommizationTime = function () {
//     dateTimeStamp = this.now();
//     var result;
//     var now = new Date();
//     var seconds = 1000;
//     var minute = 1000 * 60;
//     var hour = minute * 60;
//     var now = new Date().getTime();
//     var diffValue = now - dateTimeStamp;
//     var after = "前";
//     if(diffValue < 0){
//         diffValue*=-1;
//         after = "后";
//     }
//     var hourC = diffValue / hour;
//     var minC = diffValue / minute;
//     var secC = diffValue / seconds;

//     var isToday = (now.getDate() != this.getDate() || now.getMonth() != this.getMonth() || now.getFullYear() != this.getFullYear());
    
//     if (isToday) {
//         if (secC >= 1 && minC < 1) {
//             result = parseInt(secC) + "秒" + after;
//         } else if (minC >= 1 && minC < 30) {
//             result = parseInt(minC) + "分钟" + after;
//         } else if (minC >= 30 && hourC < 1) {
//             result = "半小时前";
//         } else if (hourC >= 1 && hourC < 24) {
//             result = parseInt(hourC) + "小时" + after;
//         }
//     } else {
//         var days = dateDiff(this, now);
//         if (days == 1) {
//             result = (after == "前" ? "昨天 " : "明天 ") + this.getHours() + ":" + this.getMinutes();
//         } else if (days == 2) {
//             result = (after == "前" ? "前天 " : "后天 ") + this.getHours() + ":" + this.getMinutes();
//         } else if (days <= 7) {
//             result = days + "天" +  + after + " " + this.getHours() + ":" + this.getMinutes();
//         } else {
//             result = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes();
//         }
//     }

//     return result;
// }

// Date.prototype.diffDays = function (date) {
//     return parseInt((date - this) / 1000 / 60 / 60 / 24);
// }

// Date.prototype.diffDays2 = function (date) {
//     let oldDate = {
//         d: this.getDate(),
//         m: this.getMonth() + 1,
//         y: this.getFullYear()
//     }
//     let newDate = {
//         d: date.getDate(),
//         m: date.getMonth() + 1,
//         y: date.getFullYear()
//     }
//     let days = 0;
//     days += newDate.y * 365;
//     return parseInt((date - this) / 1000 / 60 / 60 / 24);
// }