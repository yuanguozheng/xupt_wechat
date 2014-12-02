var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var wechat = require('wechat');

var mainHandler = require('./handlers/main');
var chatHandler = require('./handlers/chat');

var token = {
    token: 'xuptwechat',
    appid: 'wx17921e4f180ec857',
    encodingAESKey: 'a33e19c25d2dfa2ffa9cdc83cdfe4063'
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', wechat(token, function (req, res, next) {
    var message = req.weixin;
    if (message.MsgType === 'text') {
        chatHandler(message.Content, function (result) {
            res.reply(result);
        });
    }
}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
