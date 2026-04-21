const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Arslan_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function nexora_bot_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_nexora_bot = Arslan_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_nexora_bot.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_nexora_bot.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_nexora_bot.ev.on('creds.update', saveCreds);
            Pair_Code_By_nexora_bot.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_nexora_bot.sendMessage(Pair_Code_By_nexora_bot.user.id, { text: 'NEXORA-BOT~' + b64data });

                    let nexora_bot_TEXT = `
        
╭━━━〔 ⚡ NEXORA-BOT ⚡ 〕━━━╮
┃   ✅ SESSION SUCCESSFULLY CONNECTED
┃   👑 User: Arslan-MD
┃   💎 Mode: OFFICIAL ACTIVE
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 🚀 BOT ACTIVATION PANEL 〕━━━╮
┃   🔹 Selected Bot: NEXORA-BOT 
┃   🔹 Status: ONLINE & READY
┃   🔹 Setup Required:
┃      ➤ Add SESSION_ID in config 
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 🌐 SUPPORT & LINKS 〕━━━╮
┃   👤 Owner: +916909950582
┃   📦 Repo: github.com/cutvynx/NEXORA-BOT
┃   💬 WhatsApp Group:
┃      https://chat.whatsapp.com/JfPoJeSWn5E286lr4j6RU7?mode=gi_t
┃   📢 Channel:
┃      https://whatsapp.com/channel/0029Vb8RbTUEwEjyRIgD8M34
╰━━━━━━━━━━━━━━━━━━━━━━━╯


╭━━━〔 ✨ SYSTEM NOTE 〕━━━╮
┃   ⚙️ Powered by NEXORA-BOT Engine
┃   ⚡ Fast • Secure • Reliable
┃   🎯 Enjoy Premium Bot Experience
╰━━━━━━━━━━━━━━━━━━━━━━━╯

            𒂀 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐏𝐎𝐖𝐄𝐑 𒂀


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;

                    await Pair_Code_By_nexora_bot.sendMessage(Pair_Code_By_nexora_bot.user.id, { text: Toxic_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_nexora_bot.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    nexora_bot_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await nexora_bot_PAIR_CODE();
});

module.exports = router;
