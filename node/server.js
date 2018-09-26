var http=require('http');
var fs=require('fs');
var url=require('url');
var path=require('path');
var querystring = require('querystring');
var mysql = require('mysql');
var PORT=3000;







var router = {
    '/':function(req,res){
        var filePath = './index.html'
        var fileContent = fs.readFileSync(filePath, 'binary')
        res.write(fileContent, 'binary')
        res.end()
    },
    '/report': function(req, res) {
        /**服务端接收post请求参数的流程
        * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
        *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
        *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
        *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
        * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
        */

        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            port: '3306',
            database: 'test'
        });

        connection.connect(function(err){
            if(err){
                console.log('[query]-:'+err);
                return ;
            }
            console.log('connected success!');
        });

        function add(param) {
            var data = JSON.parse(param)
            var addSql = 'INSERT INTO monitor(readyStart,redirectTime,appcacheTime,lookupDomainTime,connectTime,ttfbTime,loadResources,domReadyTime,loadEventTime,loadPageTime) VALUES(?,?,?,?,?,?,?,?,?,?)';
            var addSqlParams = [data.readyStart, data.redirectTime, data.appcacheTime, data.lookupDomainTime,data.connectTime,data.ttfbTime,data.loadResources,data.domReadyTime,data.loadEventTime,data.loadPageTime];
            connection.query(addSql, addSqlParams, function(err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                res.write(JSON.stringify(result))
                res.end()
            });
        }

        if (req.method === 'POST') {
            var data = '';
            req.on('data', function (chunk) {
                data += chunk;
            });

            req.on('end', function () {
                data = decodeURI(data);
                var dataObject = querystring.parse(data);
                // console.log(dataObject)
                var queryParam = dataObject.data;
                add(queryParam)

                connection.end(function(err){
                    if(err){
                        return ;
                    }
                    console.log('insert Success!');
                });
            });
        }


    }
}


var server = http.createServer(function(req, res) {
    var staticPath = path.join(__dirname, 'static')
    var pathObj = url.parse(req.url, true)
    var filePath = path.join(staticPath, pathObj.pathname)
    try {
        var fileContent = fs.readFileSync(filePath, 'binary')
        res.write(fileContent, 'binary')
        res.end()
    } catch (e) {
        if (router[pathObj.pathname]) {
            router[pathObj.pathname](req, res)
        } else {
            res.writeHead(404, 'not found')
            res.end('not found')
        }
    }

})


server.listen(PORT);
console.log("Server runing at localhost:" + PORT + ".");
