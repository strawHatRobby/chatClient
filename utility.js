const URL = 'ws://54.172.50.207';
const WebSocket = require('ws');
const ws = WebSocket(URL)
const msg = {
    "user": "rob",
        "channel": "test",
        "text": "Hello",   "type": "message"
    }
const getData = () => {
    try{
        ws.on('open', function open() {
            ws.send(JSON.stringify(msg))
        });
    
        ws.on('message', function incoming(data){
            console.log(data);
        })
    }
    catch(err){
        console.log("Can't send message " + err);
    }
}

getData();