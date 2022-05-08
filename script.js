
function setCookie(name,value,days) {
    value = value.replace("\n", "~");
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length).replace("~", "\n");
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function stringToCookie(name, string){
    lines = string.split("\n");
    for( let i = 0; i<lines.length ;i++){
        setCookie(name+i.toString(), lines[i]+"~", 7)
    }
}
function cookieToString(name){
    out = ""
    i = 0
    while(true){
        content = getCookie(name+i.toString())
        if(content == null){
            break;
        }
        out += content;
        i = i+1;
    }
    return out;
}

let timeBetween = 1;
function updateTime(){
    setTimeout(function() {
        updateTime()
      }, 1000*timeBetween)

    let today = new Date();
    document.getElementsByClassName("uhr")[0].innerHTML = addzero(today.getHours()) + ":" + addzero(today.getMinutes())

    var weekdays = new Array(7);
        weekdays[0] = "Sonntag";
        weekdays[1] = "Montag";
        weekdays[2] = "Dienstag";
        weekdays[3] = "Mittwoch";
        weekdays[4] = "Donnerstag";
        weekdays[5] = "Freitag";
        weekdays[6] = "Samstag";
        var r = weekdays[today.getDay()];
        document.getElementsByClassName("datum")[0].innerHTML = r +", "+addzero(today.getDate())+"."+addzero(parseInt(today.getMonth())+1)+"."+today.getFullYear()
    
    
    stringToCookie("notizen", document.getElementsByClassName("notizeninput")[0].value)
    stringToCookie("do", document.getElementsByClassName("doinput")[0].value);

}
function addzero(num){
    num = num.toString()
    if(num.length>1){
        return num
    }else{
        return "0"+num
    }
}

window.onload = function(){
    document.getElementsByClassName("notizeninput")[0].value = cookieToString("notizen");
    document.getElementsByClassName("doinput")[0].value = cookieToString("do");
}

updateTime()