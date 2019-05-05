const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var listUser = [];

const app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);


io.on('connection', function (socket) {

    console.log("Co nguoi ket noi" + socket.id);

    socket.on('client-request-create-room', function (data) {
        socket.join(data);
        console.log(socket.adapter.rooms);
    });
    socket.on('client-chat', function (data) {
        io.sockets.in(data.room).emit('server-send-client-chat', {
            message: data.message,
            account: data.account,
            time: data.time,
            room: data.room
        });
    });

    socket.on('disconnect', function () {
        console.log("Co nguoi ngat ket noi")
    });
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

server.listen(process.env.PORT || '3000');


module.exports = app;
