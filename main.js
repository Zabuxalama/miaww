let { WAConnection : _WAConnection } = require("@adiwajshing/baileys");
let { MessageType } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const figlet = require("figlet");
const fs = require("fs");

const { color, markLog } = require("./lib/color");
const { serialize } = require("./lib/myfunc");
const myfunc = require("./lib/myfunc");
const { expiredCheck } = require("./lib/sewa");
const afk = require("./lib/afk");

let WAConnection = myfunc.WAConnection(_WAConnection)

let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
let left = JSON.parse(fs.readFileSync('./database/left.json'));
let set_welcome_db = JSON.parse(fs.readFileSync('./database/set_welcome.json'));
let set_left_db = JSON.parse(fs.readFileSync('./database/set_left.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let sewa = JSON.parse(fs.readFileSync('./database/sewa.json'));
let opengc = JSON.parse(fs.readFileSync('./database/opengc.json'));
let blocked = [];

global.fadly = new WAConnection()
fadly.mode = 'public'
fadly.baterai = {
    baterai: 0,
    cas: false
};
fadly.multi = true
fadly.nopref = false
fadly.prefa = 'ramlangans'
fadly.spam = []

require('./message/fadly.js')
nocache('./message/fadly.js', module => console.log(color(`'${module}' Telah berubah!`)))
require('./message/help.js')
nocache('./message/help.js', module => console.log(color(`'${module}' Telah berubah!`)))
require('./database/sewa.json')
nocache('./database/sewa.json', module => console.log(color(`'${module}' Telah berubah!`)))
const start = async(sesion) => {
    fadly.logger.level = 'warn'
    fadly.browserDescription = ['Fadly ID', 'Safari', '3.0']

    // MENG WE EM
    console.log(color(figlet.textSync('Keysa Bot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ CREATED BY FADLY ID ]'))

    // Menunggu QR
    fadly.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(markLog('Scan Dong Kak >\\<'))
    })

    // Restore Sesion
    fs.existsSync(sesion) && fadly.loadAuthInfo(sesion)

    // Mencoba menghubungkan
    fadly.on('connecting', () => {
		console.log(markLog('Connecting...'))
	})

    // Konek
    fadly.on('open', (json) => {
		console.log(markLog('Connect, Welcome Owner'))
	})

    // Write Sesion
    await fadly.connect({timeoutMs: 30*1000})
    fs.writeFileSync(sesion, JSON.stringify(fadly.base64EncodedAuthInfo(), null, '\t'))

    // Ya gitulah
    fadly.on('ws-close', () => {
        console.log(markLog('Koneksi terputus, mencoba menghubungkan kembali..'))
    })

    // Ntahlah
    fadly.on('close', async ({ reason, isReconnecting }) => {
        console.log(markLog('Terputus, Alasan :' + reason))
        console.log(markLog('Mencoba mengkoneksi ulang :' + isReconnecting))
        if (!isReconnecting) {
            console.log(markLog('Connect To Phone Rejected and Shutting Down.'))
        }
    })

    // Block
    fadly.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })

    // Reject Call
    fadly.on('CB:Call', async json => {
        let number = json[1]['from'];
        let isOffer = json[1]["type"] == "offer";
        if (number && isOffer && json[1]["data"]) {
           var tag = fadly.generateMessageTag();
           var NodePayload = ["action", "call", ["call", {
           "from": fadly.user.jid,
           "to": number.split("@")[0] + "@s.whatsapp.net",
           "id": tag
        }, [["reject", {
           "call-id": json[1]['id'],
           "call-creator": number.split("@")[0] + "@s.whatsapp.net",
           "count": "0"
        }, null]]]];
        fadly.send(`${tag}, ${JSON.stringify(NodePayload)}`)
        fadly.sendMessage(number, `Tolong jangan telpon saya jika tidak ingin diblock!\n\n_${setting.botName}_`, MessageType.text);
      }
    })

    // Action Battery
    fadly.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        fadly.baterai.baterai = a
        fadly.baterai.cas = b
    })

    setInterval(() => {
        let position = null
        Object.keys(sewa).forEach((i) => {
            if (Date.now() >= sewa[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Sewa expired: ${sewa[position].id}`)
            if (sewa[position].status === true){
                fadly.groupLeave(sewa[position].id)
                .then(() => {
                    sewa.splice(position, 1)
                    fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 3))
                })
            }
        }
    }, 1000)

    setInterval(() => {
        for (let i of Object.values(opengc)) {
            if (Date.now() >= i.time) {
                fadly.groupSettingChange(i.id, "announcement", false)
                .then((res) =>
                fadly.sendMessage(i.id, `Sukses, group telah dibuka`, MessageType.text))
                .catch((err) =>
                fadly.sendMessage(i.id, 'Error', MessageType.text))
                delete opengc[i.id]
                fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            }
        }
    }, 1000)

    setInterval(() => {
        for (let i of sewa) {
            const sisa = i.expired - Date.now()
            if (sisa < 0) continue
            if (((Math.trunc(sisa / 3600000) % 24) < 1) && i.alert != true) {
                fadly.sendMessage(i.id, `Masa sewa bot kamu kurang dari 1 hari, harap hubungi owner untuk memperpanjang masa sewa bot`, MessageType.text);
                i.alert = true
                fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 3))
            }
        }
    }, 1000 * 60)

    // Chat
    fadly.on('chat-update', async (m) => {
        if (m.presences){
            for (let key in m.presences){
                if (m.presences[key].lastKnownPresence === "composing" || m.presences[key].lastKnownPresence === "recording"){
                    if (afk.checkAfkUser(key, _afk)) {
                        _afk.splice(afk.getAfkPosition(key, _afk), 1)
                        fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                        fadly.sendMessage(m.jid, `@${key.split("@")[0]} berhenti afk, dia sedang ${m.presences[key].lastKnownPresence === "composing" ? "mengetik" : "merekam"}`, MessageType.extendedText, {contextInfo: {"mentionedJid": [key]}})
                    }
                }
            }
        }
        if (!m.hasNewMessage) return
        m = m.messages.all()[0]

        // Anti oversized
        if (m.messageStubType){
            if (m.messageStubType == 68){
                fadly.clearMessage(m.key)
            }
        }
        if (!m.message) return
		if (m.key && m.key.remoteJid == 'status@broadcast') return
        let msg = await serialize(fadly, m)

        // Detect Troli
        if (msg.message && msg.isBaileys && msg.isQuotedMsg && msg.quotedMsg.type === 'orderMessage'){
            fadly.clearMessage(msg.key)
        }
        require('./message/fadly')(fadly, msg, blocked, _afk, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc)
	})

    // Event Group 
    fadly.on('group-participants-update', async (anj) => {
        require("./message/group")(fadly, anj, welcome, left, set_welcome_db, set_left_db)
    })

}
/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module ${module} Dipantau oleh Fadly Ganteng`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start(`./${setting.sessionName}.json`)
.catch(err => console.log(err))
