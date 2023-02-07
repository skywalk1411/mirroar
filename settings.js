const { finnhub } = require('./apikeys');

const settings = {
    name: 'finnhub',
    wsUrl: `wss://ws.finnhub.io?token=${finnhub.apikey}`,
    reconnectTimeoutMs: 1000,
};
const channels = {
    defaultChannels : ['BINANCE:BTCUSDT','BINANCE:ETHUSDT','BINANCE:XRPUSDT','BINANCE:DASHUSDT','BINANCE:LTCUSDT','BINANCE:XMRUSDT','BINANCE:ADAUSDT','BINANCE:XLMUSDT'],
    subscribedChannels : [],
};
const wsmirroar = {
    name: 'wsmirroar',
    port: 3001,
};
const consoledCfg = {
    log: {
        init: true,
        srv: true,
        finh: true,
        err: true,
        msg: false,
        ping: false,
    },
};
const commands = ['symbolSearch','basicFinancials','companyPeers','companyProfile2','insiderTransactions', 'insiderSentiment', 'recommendationTrends', 'quote'];
module.exports = { settings : settings, channels : channels, consoledCfg : consoledCfg, wsmirroar : wsmirroar, commands: commands };
