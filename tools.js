const { settings, consoledCfg, wsmirroar } = require('./settings');
const consoled = (subject, text) => {
    let d = new Date().toLocaleTimeString();
    if (consoledCfg.log[subject] !== undefined && consoledCfg.log[subject]) {
        console.log(`[${d}] ${settings.name} <${subject}> ${text}`);
    }
};
const consoled2 = (subject, text) => {
    let d = new Date().toLocaleTimeString();
    if (consoledCfg.log[subject] !== undefined && consoledCfg.log[subject]) {
        console.log(`[${d}] ${wsmirroar.name} <${subject}> ${text}`);
    }
};
module.exports = { consoled : consoled, consoled2 : consoled2 };
