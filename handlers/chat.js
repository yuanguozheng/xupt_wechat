/**
 * Created by 国正 on 2014/11/26 0026.
 */
var request = require('request');

var chat = function (keyword, callback) {
    console.log(keyword);
    request(
        {
            url: 'http://www.xiaohuangji.com/ajax.php',
            method: 'POST',
            headers: {
                ContentType: 'application/x-www-form-urlencoded'
            },
            form: {
                para: keyword
            }
        },
        function (err, res, body) {
            console.log(body);
            callback(body);
        }
    );
}

module.exports = chat;