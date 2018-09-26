function getTimes() {
    var timing = performance.timing;
    var loadTime = timing.loadEventEnd - timing.navigationStart; //过早获取时,loadEventEnd有时会是0
    if (loadTime <= 0) {
        setTimeout(function() {// 未加载完，延迟1s后继续times方法，直到成功
            getTimes();
            location.reload()
        },1000);
        return;
    }
    var time = {};
    time.readyStart = timing.fetchStart - timing.navigationStart;
    time.redirectTime = timing.redirectEnd - timing.redirectStart;
    time.appcacheTime = timing.domainLookupStart - timing.fetchStart;
    time.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
    time.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;
    time.connectTime = timing.connectEnd - timing.connectStart;
    time.ttfbTime = timing.responseStart - timing.navigationStart;
    time.loadResources = timing.responseEnd - timing.requestStart;
    time.domReadyTime = timing.domComplete - timing.responseEnd; //过早获取时,domComplete有时会是0
    time.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
    time.loadPageTime = timing.loadEventEnd - timing.fetchStart;

    var ajax = new XMLHttpRequest();
    ajax.open('POST','/report');
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send('data='+JSON.stringify(time));
    ajax.onreadystatechange = function () {
       if (ajax.readyState==4 &&ajax.status==200) {
        　　　　console.log(ajax.responseText);
      　　}
    }
}
getTimes()
