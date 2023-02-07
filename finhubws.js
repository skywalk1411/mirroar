const websocket = require('websocket');
const { finnhub } = require('./apikeys');
const { settings, channels } = require('./settings');
const { consoled } = require('./tools');
const { wsSend, wss } = require('./wsmirroar');
const wsFinnhubConnect = () => {
    const wsFinnhub = new websocket.client();
    wsFinnhub.on('connectFailed', (error) => {
        consoled(`err`, `onConnectFailed: ${error.toString()} `);
    });
    wsFinnhub.on('connect', async (wsConnection) => {
        const unsubscribe = (symbol) => {
            wsConnection.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': symbol.toUpperCase() }));
        };
        const subscribe = (symbol) => {
            wsConnection.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol.toUpperCase() }));
        };
        consoled(`init`, `init connected.`);
        channels.defaultChannels.map((channel)=>{
            subscribe(channel);
        });
        consoled(`init`, `finnhub channels subscribed.`);
        wsConnection.on('error', function (error) {
            consoled(`err`, `error onConnectError  ${error.toString()}`);
        });
        wsConnection.on('close', function (error) {
            consoled(`err`, ` error onClose ${error.toString()}`);
            consoled(`init`, `reconnecting...`);
            setTimeout(()=>{
                wsFinnhubConnect();
            }, settings.reconnectTimeoutMs);
        });
        wsConnection.on('message', function (message) {
            if (message.type === 'utf8') {
                const ifPing = JSON.parse(message.utf8Data);
                if (ifPing.type === 'ping') {
                    wsConnection.send(JSON.stringify({"type":"ping"}));
                    wsConnection.send(JSON.stringify({"type":"pong"}));
                    //wsConnection.ping();
                    //wsConnection.pong();
                }
                wsSend(wss, message.utf8Data);
                /*wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message.utf8Data);
                    }
                });*/
            }
        });
    });
    consoled(`init`, `connecting...`);
    wsFinnhub.connect(settings.wsUrl, null);
};
//wsFinnhubConnect();
module.exports = { wsFinnhubConnect : wsFinnhubConnect };
