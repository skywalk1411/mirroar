const WebSocket = require('ws');
const { wsmirroar, commands, settings } = require('./settings');
const { consoled2 } = require('./tools');
const { symbolSearch, basicFinancials, compPeers, companyProfile2, insiderTransactions, insiderSentiment, recommendationTrends, quote } = require('./api');
consoled2('init', `url: ${settings.wsUrl} on localhost:${wsmirroar.port}`);
const wsSend = (mywss,mymessage) => {
    mywss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(mymessage);
        }
    });
}
let wss;
const wsmirroarConnect = () => {
    wss = new WebSocket.Server({ port: wsmirroar.port });
    wss.on('connection', async function connection(ws) {
        consoled2('srv', `1 client connected.`);
        ws.on('message', async (message)=> {
            wsSend(wss, message.utf8Data);
        });
        ws.on('close', async (error)=> {
            consoled2('err','error onClose',error.toString());
            setTimeout(()=>{
                wsmirroarConnect();
            },1000);
        })
    });
};
//wsmirroarConnect();

module.exports = { wsmirroarConnect : wsmirroarConnect, wsSend: wsSend, wss : wss };
