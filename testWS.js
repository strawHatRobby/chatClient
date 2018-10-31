const WebSocket = require('ws')
const ws = WebSocket('ws://54.172.50.207')
msg = {
"user": "rob",
    "channel": "test",
    "text": "Hello",   "type": "message"
}
try{

    ws.on('open', function open() {
        ws.send(JSON.stringify(msg))
    });

    ws.on('message', function incoming(data){
        console.log(data);
    })

}
catch(err){
    console.log(err);
}
