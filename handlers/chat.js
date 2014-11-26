/**
 * Created by 国正 on 2014/11/26 0026.
 */
var request = require('request');

var chat = function (keyword, callback) {
    request.post({uri: 'http://www.xiaohuangji.com/ajax.php', form: {para: keyword}}, function (err, res, body) {
        callback(body);
    });
}

module.exports = chat;