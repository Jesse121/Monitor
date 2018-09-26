<?php
if(isset($_POST['data'])){
    $link = mysqli_connect('localhost','root','','test');

    if (!$link) {
        printf("Can't connect to MySQL Server. Errorcode: %s ", mysqli_connect_error());
        exit;
    }else{
        $data = json_decode($_POST['data']);
        $res = mysqli_query($link,"INSERT INTO `monitor` (readyStart,redirectTime,appcacheTime,lookupDomainTime,connectTime,ttfbTime,loadResources,domReadyTime,loadEventTime,loadPageTime) VALUES ($data->readyStart,$data->redirectTime,$data->appcacheTime,$data->lookupDomainTime,$data->connectTime,$data->ttfbTime,$data->loadResources,$data->domReadyTime,$data->loadEventTime,$data->loadPageTime)");
        if($res){
            echo mysqli_insert_id($link);
        }else{
            var_dump($res);
        }
            
    }
        

    mysqli_close($link);
}
?>