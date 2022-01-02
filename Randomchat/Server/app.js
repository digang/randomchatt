const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});


io.on('connection', socket=>{
    console.log('client connected...')
    const name = '상대방'
    socket.on('message',({message}) => {
        socket.broadcast.emit('message',({name, message}))
    
    })
})

server.listen(4000, function(){
    console.log('listening on port 4000');
})
