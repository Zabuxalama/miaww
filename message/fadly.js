const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL,
    prepareMessageFromContent,
    relayWAMessage
} = require("@adiwajshing/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const qrcode = require("qrcode");
const ffmpeg = require("fluent-ffmpeg");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ms = require("parse-ms");
const toMS = require("ms");
const axios = require("axios");
const speed = require("performance-now");
const yts = require("yt-search");
const translate = require("@vitalets/google-translate-api");
const { da, ar } = require("@vitalets/google-translate-api/languages");
const { default: Axios } = require("axios");
const util = require("util");
const os = require("os");
const FormData = require("form-data");
const parseMS = require("parse-ms-js")
const ytdl = require('ytdl-core')
const cheerio = require('cheerio');
const { Aki } = require("aki-api");
const { fetchJson } = require('../lib/fetcher')

// Sticker WM
const Exif = require('../lib/exif')
const exif = new Exif()

// Lib
const { color, bgcolor } = require("../lib/color");
const msgFilter = require("../lib/antispam");
const { serialize, getBuffer, getRandom, getGroupAdmins, runtime, sleep } = require("../lib/myfunc");
const { isSetWelcome, addSetWelcome, changeSetWelcome, removeSetWelcome } = require('../lib/setwelcome');
const { isSetLeft, addSetLeft, removeSetLeft, changeSetLeft } = require('../lib/setleft');
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../lib/respon-list');
const { addRespons, checkRespons, deleteRespons } = require('../lib/respon');
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const _prem = require("../lib/premium");
const _sewa = require("../lib/sewa");
const game = require("../lib/game");
let setting = require('../config.json')
const TicTacToe = require("../lib/tictactoe");
const tictac = require("../lib/tictac");
const afk = require("../lib/afk");
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const { ind } = require('../bahasa')
const audionye = JSON.parse(fs.readFileSync('./strg/audio.json'))

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let antiyt = JSON.parse(fs.readFileSync('./database/antiyt.json'));
let antitele = JSON.parse(fs.readFileSync('./database/antitele.json'));
let antiwame = JSON.parse(fs.readFileSync('./database/antiwame.json'));
let antibitly = JSON.parse(fs.readFileSync('./database/antibitly.json'));
let responDB = JSON.parse(fs.readFileSync('./database/respon.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));

// Game Database
let tictactoe = [];
let tebakgambar = [];
let family100 = [];
let akinator = {}

// Jadibot
if (global.conns instanceof Array) console.log()
else global.conns = []

// function
function getName(jid) {
      let chat
      let v = jid.endsWith('@g.us') ? (chat = fadly.chats.get(jid) || {}) && chat.metadata || {} : jid === '0@s.whatsapp.net' ? {
        jid,
        vname: 'WhatsApp'
      } : jid === fadly.user.jid ?
        fadly.user :
        fadly.contactAddOrGet(jid)
      return v.subject || v.vname || v.notify || `+${jid.replace('@s.whatsapp.net', '')}`
    }
// Settings
fake = `SELFBOT`
setgrup = "6289636006352-1606097314@g.us"
setthumb = fs.readFileSync('./src/sticker/keseltag.webp')


let {
    ownerNumber,
    botName,
    ownerName,
    footer,
    pathImg,
    limitCount,
    gamewaktu
} = setting

let apikeys = 'Atakbotz'
let footxt = `${footer}️ || ${pendaftar.length} ❄️`
let thumb = fs.readFileSync(pathImg)

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async (fadly, msg, blocked, _afk, welcome, left, set_welcome_db, set_left_db, db_respon_list, sewa, opengc) => {
    try {
        const { menu, simpleMenu, stickerMenu, gabutMenu, groupMenu, sistemMenu, storeMenu, downloadMenu, gameMenu, randomMenu, textproMenu, photooxyMenu, searchMenu, jadibotMenu, ownerMenu, otherMenu } = require("./help");
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, isBaileys } = msg
        if (isBaileys) return
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type == "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == "messageContextInfo") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
        const args = chats.split(' ')
        var pes = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ''
        const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
        const command = chats.toLowerCase().split(' ')[0] || ''
        if (fadly.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
            if (fadly.nopref) {
                prefix = ''
            } else {
                prefix = fadly.prefa
            }
        }
        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = fadly.user.jid
        const groupMetadata = isGroup ? await fadly.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.jid : ''
        const isBadWord = isGroup ? badword.includes(from) : true
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isAfkOn = afk.checkAfkUser(sender, _afk)

        const isOwner = ownerNumber.includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
        const isSewa = _sewa.checkSewaGroup(from, sewa)
        const isBan = cekBannedUser(sender, ban)
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isAntiYt = isGroup ? antiyt.includes(from) : false
        const isAntiTele = isGroup ? antitele.includes(from) : false
        const isAntiWame = isGroup ? antiwame.includes(from) : false
        const isAntiBitly = isGroup ? antibitly.includes(from) : false
        const isWelcome = isGroup ? welcome.includes(from) : false
        const isLeft = isGroup ? left.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false
        const isUser = pendaftar.includes(sender)

        const Verified = "0@s.whatsapp.net"

        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        let sisalimit = getLimit(sender, limitCount, limit)
        let sisaGlimit = cekGLimit(sender, gcount, glimit)
        let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
        let expiredPrem = () => {
            if (cekvip.days != 0) {
                return `${cekvip.days} day(s)`
            } else if (cekvip.hours != 0) {
                return `${cekvip.hours} hour(s)`
            } else if (cekvip.minutes != 0) {
                return `${cekvip.minutes}`
            }
        }

        const tanggal = moment().format("ll")
        const jam = moment().format("HH:mm:ss z")

        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        var fildt = dt == 'pagi' ? dt + '🌞' : dt == 'siang' ? dt + '☀️' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = "Selamat "+fildt.charAt(0).toUpperCase() + fildt.slice(1)

        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka) {
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks) => {
            return fadly.sendMessage(from, teks, text, { quoted: msg })
        }
        const sendMess = (hehe, teks) => {
            return fadly.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? fadly.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : fadly.sendMessage(from, teks.trim(), extendedText, { quoted: msg, contextInfo: { "mentionedJid": memberr } })
            return ai
        }
        
        function hitungmundur(bulan, tanggal) {
          let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
          let now = Date.now();
          let distance = from - now;
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
        }
        
        function ytdlmp3(url) {
            return new Promise((resolve, reject) => {
                let myA = [];
                axios({
                    url: "https://yt1s.com/api/ajaxSearch/index",
                    method: "POST",
                    data: new URLSearchParams(Object.entries({
                        q: url,
                        vt: 'home'
                    })),
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
                    }
                }).then(r => {
                    myA.push({
                        title: r.data.title,
                        filesize: r.data.links.mp3['mp3128'].size,
                        qualityType: r.data.links.mp3['mp3128'].q,
                        thumbnail: `https://i.ytimg.com/vi/${r.data.vid}/0.jpg`,
                        durationNumber: r.data.t
                    })
                    axios({
                        url: "https://yt1s.com/api/ajaxConvert/convert",
                        method: "post",
                        data: new URLSearchParams(Object.entries({
                            vid: r.data.vid,
                            k: r.data.links.mp3['mp3128'].k
                        })),
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
                        }
                    }).then(x => {
                        myA.push({
                            dlink: x.data.dlink
                        })
                        resolve({
                            status: true,
                            data: myA
                        })
                    }).catch(e => {
                        resolve({
                            status: false,
                            data: e
                        })
                    })
                }).catch(e => {
                    resolve({
                        status: false,
                        data: e
                    })
                })
            })
        }

        function ytdlmp4(url) {
            return new Promise((resolve, reject) => {
                let myA = [];
                axios({
                    url: "https://yt1s.com/api/ajaxSearch/index",
                    method: "POST",
                    data: new URLSearchParams(Object.entries({
                        q: url,
                        vt: 'home'
                    })),
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
                    }
                }).then(r => {
                    myA.push({
                        title: r.data.title,
                        filesize: r.data.links.mp4['18'].size,
                        qualityType: r.data.links.mp4['18'].q,
                        thumbnail: `https://i.ytimg.com/vi/${r.data.vid}/0.jpg`,
                        durationNumber: r.data.t
                    })
                    axios({
                        url: "https://yt1s.com/api/ajaxConvert/convert",
                        method: "post",
                        data: new URLSearchParams(Object.entries({
                            vid: r.data.vid,
                            k: r.data.links.mp4['18'].k
                        })),
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
                        }
                    }).then(x => {
                        myA.push({
                            dlink: x.data.dlink
                        })
                        resolve({
                            status: true,
                            data: myA
                        })
                    }).catch(e => {
                        resolve({
                            status: false,
                            data: e
                        })
                    })
                }).catch(e => {
                    resolve({
                        status: false,
                        data: e
                    })
                })
            })
        }
        
        async function getGcName (groupID) {
        try {
            let data_name = await fadly.groupMetadata(groupID)
            return data_name.subject
        } catch (err) {
              return '-'
           }
        }

        async function getAtminTag (groupID) {
        try {
            let data_admin = await fadly.groupMetadata(groupID)
            let array_admin = [];
            for (let x of data_admin.participants) {
                if (x.isAdmin === true) {
                    array_admin.push(x.jid)
                }
            }
            return array_admin
        } catch (err) {
              return '-'
           }
        }

        async function getAtmin(groupID) {
        try {
            let list_admin = "*ADMIN:*\n"
            let data_group = await fadly.groupMetadata(groupID)
            for (let x of data_group.participants) {
                if (x.isAdmin === true) {
                    list_admin += `- @${x.jid.split('@')[0]}\n`
                }
            }
            return list_admin.trim()
        } catch (err) {
              return '-'
           }
        }

        async function sendFileFromUrl(from, url, caption, msg, men) {
            let damta = await getBuffer(url)
            let res = await axios.head(url)
            let mime = res.headers['content-type'] ? res.headers['content-type'] : "image/gif"
            let type = mime.split("/")[0] + "Message"
            if (mime === "image/gif") {
                type = MessageType.video
                mime = Mimetype.gif
            }
            if (mime === "application/pdf") {
                type = MessageType.document
                mime = Mimetype.pdf
            }
            if (mime.split("/")[0] === "audio") {
                mime = Mimetype.mp4Audio
            }
            return fadly.sendMessage(from, damta, type, { caption: caption, quoted: msg, mimetype: mime, contextInfo: { "mentionedJid": men ? men : [] } })
        }
        const textImg = (teks) => {
            return fadly.sendMessage(from, teks, text, { quoted: msg, thumbnail: fs.readFileSync(pathImg) })
        }
        // SPAM
        const spampm = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
            msgFilter.addSpam(sender, fadly.spam)
            if (msgFilter.isSpam(sender, fadly.spam)) {
                addBanned(sender, '30m', ban)
                reply(`Kamu melakukan spam\nKamu akan diban selama 30menit`)
            } else {
                reply(`Hai\nKamu terdeteksi menggunakan command tanpa jeda\nHarap tunggu 5 detik`)
            }
        }
        const spamgr = () => {
            console.log(color('[ SPAM ]', 'red'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            msgFilter.addSpam(sender, fadly.spam)
            if (msgFilter.isSpam(sender, fadly.spam)) {
                addBanned(sender, '30m', ban)
                reply(`Kamu melakukan spam\nKamu akan diban selama 30menit`)
            } else {
                reply(`Hai\nKamu terdeteksi menggunakan command tanpa jeda\nHarap tunggu 5 detik`)
            }
        }

        // Buttons
        const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
        const buttonMessage = {
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 1
        }
        fadly.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
        }
        const sendButImage = async(id, text1, desc1, gam1, but = [], options = {}) => {
        let kma = gam1
        let mhan = await fadly.prepareMessage(from, kma, image)
        const buttonMessages = {
            imageMessage: mhan.message.imageMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 4
        }
        fadly.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
        const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
        let kma = vid1
        let mhan = await fadly.prepareMessage(from, kma, video)
        const buttonMessages = {
            videoMessage: mhan.message.videoMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: 5
        }
        fadly.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
        const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
        let kma = gam1
        let mhan = await fadly.prepareMessage(from, kma, location)
        const buttonMessages = { 
            locationMessage: { jpegThumbnail: gam1 }, 
            contentText: text1, 
            footerText: desc1, 
            buttons: but, 
            headerType: 6 
        }
        fadly.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }
        const sendButDocument = async(id, text1, desc1, media, doc1, but = [], options = {}) => {
        let kma = doc1
        let mhan = await fadly.prepareMessage(from, media, document, kma)
        const buttonMessages = {
            documentMessage: mhan.message.documentMessage,
            contentText: text1,
            footerText: desc1,
            buttons: but,
            headerType: "DOCUMENT"
            }
        fadly.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
        }

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isMedia = isImage || isVideo || isSticker || (type == 'audioMessage') || (type == 'documentMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false
        const isButton = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
        const isListMessage = (type == 'listResponseMessage') ? msg.message.listResponseMessage.title : ''

        //  Anti spam
        msgFilter.ResetSpam(fadly.spam)

        // Mode
        if (fadly.mode === 'self') {
            if (!fromMe) return
        }

        // Banned
        if (isBan) return
        BannedExpired(ban)
        
        // Premium
        _prem.expiredCheck(premium)
                
        // Auto Read
        fadly.chatRead(from, "read")

        // Auto Regist
        if (isCmd && !isUser) {
            pendaftar.push(sender)
            fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 3))
        }        
        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                fadly.groupRemove(from, [sender])
            }
        }
        // Anti link yt
        if (isGroup && isAntiYt && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(youtu.be\/)/gi)) {
                reply(`*「 YOUTUBE LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link youtube, maaf kamu akan di kick`)
                fadly.groupRemove(from, [sender])
            }
        }
        // Anti link tele
        if (isGroup && isAntiTele && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(t.me\/)/gi)) {
                reply(`*「 TELEGRAM LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link telegram, maaf kamu akan di kick`)
                fadly.groupRemove(from, [sender])
            }
        }
        // Anti wame
        if (isGroup && isAntiWame && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(wa.me\/)/gi)) {
                reply(`*「 NOMOR LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link nomor, maaf kamu akan di kick`)
                fadly.groupRemove(from, [sender])
            }
        }
        // Anti bitly
        if (isGroup && isAntiBitly && !isOwner && !isGroupAdmins && isBotGroupAdmins) {
            if (chats.match(/(bit.ly\/)/gi)) {
                reply(`*「 BIT.LY LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link bit.ly, maaf kamu akan di kick`)
                fadly.groupRemove(from, [sender])
            }
        }
        
        //funtion nobadword
			if (isGroup && isBadWord) {
            if (bad.includes(messagesC)) {
                if (!isGroupAdmins) {
                    return reply("JAGA UCAPAN DONG!! 😠")
                        .then(() => fadly.groupRemove(from, sender))
                        .then(() => {
                            fadly.sendMessage(from, `*「 ANTI BADWORD 」*\n kamu akan dikick karena berkata kasar!`, text ,{quoted: msg})
                        }).catch(() => fadly.sendMessage(from, `Untung saya bukan admin, kalo admin udah saya kick!`, text , {quoted : msg}))
                } else {
                    return reply( "Tolong Jaga Ucapan Min 😇")
                }
            }
        }


        // MUTE
        if (isMuted) {
            if (!isGroupAdmins && !isOwner) return
            if (chats.toLowerCase().startsWith(prefix+'unmute')) {
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute, null, 3))
                reply(`Bot telah diunmute di group ini`)
            }
        }
        
        // ANTI SPAM
        if (isCmd && msgFilter.isFiltered(sender) && !isGroup) return spampm()
        if (isCmd && msgFilter.isFiltered(sender) && isGroup) return spamgr()
        if (isCmd && !isOwner) msgFilter.addFilter(sender)

        // TAG

            if (chats.includes(`assalamualaikum`)) {

                  reply(`Waalaikumsalam`)

                  }



		if (chats.includes(`Assalamualaikum`)) {

                  reply(`Waalaikumsalam`)

                  }
                  
                  
                  if (chats.includes(`Assalamu'alaikum`)) {

                  reply(`Waalaikum'salam`)

                  }
                  
                  
                  if (chats.includes(`assalamu'alaikum`)) {

                  reply(`Waalaikum'salam`)

                  }



		if (chats.includes(`Bot`)) {

                  reply(`Iya ${botName} Di Sini?\nUntuk Menggunakan Bot Ketik ${prefix}menu atau ${prefix}help`)

                  }

        if (chats.includes(`bot`)) {

                  reply(`Ya?\nUntuk Menggunakan Bot Ketik ${prefix}menu atau ${prefix}help`)

                  }

 
       if (chats.includes(`@628565337357`)) {

                  reply(`Ada apa Ya Tag Owner?`)

                  }
                 

		if (chats.includes(`Sayang`)) {

                  reply(`Aku Juga Sayang Kamu Kak😍`)

                  }



		if (chats.includes(`sayang`)) {

                  reply(`Aku Juga Sayang Kamu Kak😍`)

                  }



		if (chats.includes(`Hai`)) {

                  reply(`Hai Juga,\nUntuk Menggunakan Bot Ketik _${prefix}menu/${prefix}help_ `)

                  }





		if (chats.includes(`Hallo`)) {

                  reply(`Hallo Juga,\nUntuk Menggunakan Bot Ketik _${prefix}menu/${prefix}help_`)

                  }



		if (chats.includes(`Thanks`)) {

                  reply(`Sama-sama ${pushname}`)

                  }
                  
                  if (chats.includes(`thanks`)) {

                  reply(`Sama-sama ${pushname}`)

                  }
                  
                  
                  if (chats.includes(`thx`)) {

                  reply(`Sama-sama ${pushname}`)

                  }
                  
                  
                  if (chats.includes(`Thx`)) {

                  reply(`Sama-sama ${pushname}`)

                  }


if (chats.includes(`Tq`)) {

                  reply(`Sama-sama ${pushname}`)

                  }
                  
                  if (chats.includes(`tq`)) {

                  reply(`Sama-sama ${pushname}`)

                  }


if (chats.includes(`makasih`)) {

                  reply(`Sama-sama ${pushname}`)

                  }

		if (chats.includes(`Makasih`)) {

                  reply(`Sama-sama ${pushname}`)

                  }
                  
        // AFK
        if (isGroup) {
            if (mentioned.length !== 0) {
                for (let ment of mentioned) {
                    if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        await mentions(`@${ment.split('@')[0]} sedang afk\n\n*Alasan :* ${getReason}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`, [ment], true)
                        sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${chats}`)
                    }
                    if (ment === fadly.user.jid) {
                        reply(`Ya ada apa ${pushname}, silahkan kirim ${prefix}menu`)
                    }
                }
            }
            if (afk.checkAfkUser(sender, _afk)) {
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                await mentions(`@${sender.split('@')[0]} telah kembali`, [sender], true)
            }
        }

        // Akinator by aqulzz
        if (from in akinator && !isCmd && !isNaN(chats)) {
            try {
                let ans = Math.floor(Number(chats))
                if (ans > 0 && ans < 7) {
                    if (ans == 6){
                        if (akinator[from].currentStep == 0) return reply(`Kamu blum menjawab pertanyaan apapun`)
                        await akinator[from].back()
                    } else await akinator[from].step(ans - 1)
    
                    if (akinator[from].progress >= 83 || akinator[from].currentStep >= 78){
                        await akinator[from].win()
                        await sendFileFromUrl(from, akinator[from].answers[0].absolute_picture_path, `Jawaban : ${akinator[from].answers[0].name}
Deskripsi: ${akinator[from].answers[0].description}`, msg)
                        delete akinator[from]
                        return
                    }
    
                    await reply(`*Progress: ${akinator[from].progress.toFixed(2)}%*

${akinator[from].question}

1. Iya
2. Tidak
3. Tidak tahu
4. Mungkin
5. Mungkin tidak
6. Kembali`)
                }
            } catch (e) { reply('Terjadi error, game dibatalkan') }
        }

        // // Game TicTacToe
        // if (isTicTacToe(from, tictactoe) && !isMuted) {
        tictac(fadly, chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)
        // }
        // family100 & Tebak Gambar
        game.cekWaktuFam(fadly, family100)
        game.cekWaktuTG(fadly, tebakgambar)
 
        if (game.isTebakGambar(from, tebakgambar) && isUser) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))) {
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await reply(`*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? kirim *${prefix}tebakgambar*`)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }
        if (game.isfam(from, family100) && isUser) {
            var anjuy = game.getjawaban100(from, family100)
            for (let i of anjuy) {
                if (chats.toLowerCase().includes(i)) {
                    var htgmi = Math.floor(Math.random() * 20) + 1
                    addBalance(sender, htgmi, balance)
                    await reply(`*Jawaban benar*\n*Jawaban :* ${i}\n*Hadiah :* $${htgmi}\n*Jawaban yang blum tertebak :* ${anjuy.length - 1}`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1) {
                fadly.sendMessage(from, `Semua jawaban sudah tertebak\nKirim *${prefix}family100* untuk bermain lagi`, text)
                family100.splice(game.getfamposi(from, family100), 1)
            }
        }

        // CMD
        if (isCmd && !isGroup) {
            fadly.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
            console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
        }
        if (isCmd && isGroup) {
            fadly.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
            console.log(color('[ CMD ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        if (isOwner) {
            if (chats.startsWith('=>')) {
                console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                let parse = chats.startsWith('=>') ? chats.replace('=>', 'return ') : chats.replace('>', '')
                try {
                    let evaled = await eval(`;(async()=> { ${parse} })()`).catch(e => { return require('util').format(e) })
                    reply(require('util').format(evaled))
                } catch (err) {
                    reply(require('util').format(err))
                }
            } else if (chats.startsWith('>')) {
                console.log(color('[ EVAL ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    reply(require('util').format(evaled))
                } catch (err) {
                    reply(require('util').format(err))
                }
            } else if (chats.startsWith("$ ")) {
                console.log(color('[ EXEC ]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.replace('$', ''), (err, stdout) => {
                    if (err) return reply(require('util').format(err))
                    if (stdout) reply(require('util').format(stdout))
                })
            }
        }
        
        // Button Respon Welcome & Left
        if (isButton === 'welkom_on') {
            if (!isGroupAdmins && !isOwner) return
            if (isWelcome) return reply(`Udah aktif`)
            welcome.push(from)
            fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 3))
            reply('Welcome aktif')
        } else if (isButton === 'welkom_off') {
            if (!isGroupAdmins && !isOwner) return
            let anu = welcome.indexOf(from)
            welcome.splice(anu, 1)
            fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 3))
            reply('Welcome nonaktif')
        } else if (isButton === 'left_on') {
            if (!isGroupAdmins && !isOwner) return
            if (isLeft) return reply(`Udah aktif`)
            left.push(from)
            fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 3))
            reply('Left aktif')
        } else if (isButton === 'left_off') {
        if (!isGroupAdmins && !isOwner) return
            let anu = left.indexOf(from)
            left.splice(anu, 1)
            fs.writeFileSync('./database/left.json', JSON.stringify(left, null, 3))
            reply('Left nonaktif')
        }
        // Button Respon AntiLink,Antiwame
        if (isButton === 'anti_wame_on') {
            if (isAntiWame) return reply(`Udah aktif`)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            antiwame.push(from)
            fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 3))
            reply('Anti wa.me grup aktif')
        } else if (isButton === 'anti_wame_off') {
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let anu = antiwame.indexOf(from)
            antiwame.splice(anu, 1)
            fs.writeFileSync('./database/antiwame.json', JSON.stringify(antiwame, null, 3))
            reply('Anti wa.me grup nonaktif')
        } else if (isButton === 'anti_link_on') {
            if (isAntiLink) return reply(`Udah aktif`)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            antilink.push(from)
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 3))
            reply('Antilink grup aktif')
        } else if (isButton === 'anti_link_off') {
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let anu = antilink.indexOf(from)
            antilink.splice(anu, 1)
            fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 3))
            reply('Antilink grup nonaktif')
        }
        
        // Button Respon Antiyt,Antitele
        if (isButton === 'anti_yt_on') {
            if (isAntiYt) return reply(`Udah aktif`)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            antiyt.push(from)
            fs.writeFileSync('./database/antiyt.json', JSON.stringify(antiyt, null, 3))
            reply('Anti link youtube aktif')
        } else if (isButton === 'anti_yt_off') {
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let anu = antiyt.indexOf(from)
            antiyt.splice(anu, 1)
            fs.writeFileSync('./database/antiyt.json', JSON.stringify(antiyt, null, 3))
            reply('Anti link youtube nonaktif')
        } else if (isButton === 'anti_tele_on') {
            if (isAntiTele) return reply(`Udah aktif`)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            antitele.push(from)
            fs.writeFileSync('./database/antitele.json', JSON.stringify(antitele, null, 3))
            reply('Antilink Telegram aktif')
        } else if (isButton === 'anti_tele_off') {
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let anu = antitele.indexOf(from)
            antitele.splice(anu, 1)
            fs.writeFileSync('./database/antitele.json', JSON.stringify(antitele, null, 3))
            reply('Antilink Telegram nonaktif')
        } else if (isButton === 'anti_bitly_on') {
            if (isAntiBitly) return reply(`Udah aktif`)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            antibitly.push(from)
            fs.writeFileSync('./database/antibitly.json', JSON.stringify(antibitly, null, 3))
            reply('Antilink Bitly aktif')
        } else if (isButton === 'anti_bitly_off') {
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let anu = antibitly.indexOf(from)
            antibitly.splice(anu, 1)
            fs.writeFileSync('./database/antibitly.json', JSON.stringify(antibitly, null, 3))
            reply('Antilink Bitly nonaktif')
        }
        
        if (isButton.includes('ytdl_video&')) {
            ytdlmp4(msg.message.buttonsResponseMessage.selectedButtonId.split('&')[1]).then(res => {
                var result_caption = `*YOUTUBE-DOWNLOADER 📂*

📃 *Title:* ${res.data[0].title ? res.data[0].title : '-'}
📂 *Filesize:* ${res.data[0].filesize ? res.data[0].filesize : '-'}
📸 *qualityType:* ${res.data[0].qualityType ? res.data[0].qualityType : '-'}
⏳ *Duration:* ${res.data[0].durationNumber ? res.data[0].durationNumber : '-'}

_Please wait a moment, the media will be sent soon.._`
                ytdl.getInfo(msg.message.buttonsResponseMessage.selectedButtonId.split('&')[1]).then(r => {
                    sendFileFromUrl(from, res.data[0].thumbnail, result_caption, msg)
                    sendFileFromUrl(from, r.formats[0].url, "Done ~", msg)
                    limitAdd(sender, limit)
                }).catch(err => {
                    console.log(color('[ ERROR ]', 'red'), err)
                    reply(mess.error.api)
                })
            }).catch(err => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
            })
        } else if (isButton.includes('ytdl_audio&')) {
            ytdlmp3(msg.message.buttonsResponseMessage.selectedButtonId.split('&')[1]).then(res => {
                var result_caption = `*YOUTUBE-DOWNLOADER 📂*

📃 *Title:* ${res.data[0].title ? res.data[0].title : '-'}
📂 *Filesize:* ${res.data[0].filesize ? res.data[0].filesize : '-'}
📸 *qualityType:* ${res.data[0].qualityType ? res.data[0].qualityType : '-'}
⏳ *Duration:* ${res.data[0].durationNumber ? res.data[0].durationNumber : '-'}

_Please wait a moment, the media will be sent soon.._`
                sendFileFromUrl(from, res.data[0].thumbnail, result_caption, msg)
                sendFileFromUrl(from, res.data[1].dlink, "Done ~", msg)
                limitAdd(sender, limit)
            }).catch(err => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
            })
        }
        
        if (isButton.includes('tiktok_video')) {
        reply(mess.wait)
            sendFileFromUrl(from, msg.message.buttonsResponseMessage.selectedButtonId.split('&')[1], "", msg)
            limitAdd(sender, limit)
        } else if (isButton.includes('tiktok_audio')) {
        reply(mess.wait)
            sendFileFromUrl(from, msg.message.buttonsResponseMessage.selectedButtonId.split('&')[1], "", msg)
            limitAdd(sender, limit)
        }
        
        if (!isCmd && isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
            var get_data_respon = getDataResponList(from, chats, db_respon_list)
            if (get_data_respon.isImage === false) {
                fadly.sendMessage(from, sendResponList(from, chats, db_respon_list), MessageType.text, {
                    quoted: msg
                })
            } else {
                fadly.sendMessage(from, await getBuffer(get_data_respon.image_url), MessageType.image, {
                    quoted: msg,
                    caption: get_data_respon.response
                })
            }
        }
        
        
        
        function toRupiah(angka) {
            var balancenyeini = '';
            var angkarev = angka.toString().split('').reverse().join('');
            for (var i = 0; i < angkarev.length; i++)
                if (i % 3 == 0) balancenyeini += angkarev.substr(i, 3) + '.';
            return '' + balancenyeini.split('', balancenyeini.length - 1).reverse().join('');
        }

        function formatSecond(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return hDisplay + mDisplay + sDisplay;
        }
        
        function triggerSticker() {
            try {
                for (let x = 0; x < responDB.length; x++) {
                    if (msg.message.stickerMessage.fileSha256.toString('hex') == responDB[x].hex) {
                        return responDB[x].balasan;
                    }
                }
            } catch {
                return false;
            }
        }
        switch (command || triggerSticker()) {
        case prefix+'menu':
            let teks = `Halo Kak ${pushname} 👋🏻
Salam kenal, Aku Bot ${ownerName}
Asisten Kamu masa kini

Silahkan pilih button djbawah ini
jika tidak support button ketik #help`
            let but = [
            { buttonId: '#help', buttonText: { displayText: 'Menu Bot' }, type: 1 },
            { buttonId: '#dev', buttonText: { displayText: 'Owner Bot' }, type: 1 }
            ]
            sendButLocation(from, teks, footxt, thumb, but)
            
case 'kucing':
  miaw = fs.readFileSync('./media/kucing.mp3')
            fadly.sendMessage(from, miaw, MessageType.audio, {quoted: msg, mimetype:'audio/mp4', ptt:true})
            break
        case prefix+'help':
            let mundur = hitungmundur(7, 9)
            let helep = menu(ucapanWaktu, sender, pushname, mundur, ownerName, botName, tanggal, jam, runtime, isOwner, isPremium, sisalimit, limitCount, sisaGlimit, gcount, expiredPrem(), prefix)
            fadly.sendMessage(from, helep, text, { quoted: msg, contextInfo: { mentionedJid: [sender] } })
            break
        case prefix+'dev': case prefix+'owner': case prefix+'creator':
            let ini_list = []
            for (let i of ownerNumber) {
            const vname = fadly.contacts[i] != undefined ? fadly.contacts[i].vname || fadly.contacts[i].notify : undefined
            ini_list.push({
            "displayName": 'Serv4n',
            "vcard": 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + `N:Sy;Serv4n;;;\n`
            + `FN:${vname ? `${vname}` : `${fadly.user.name}`}\n`
            + `item1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\n`
            + `item1.X-ABLabel:Contacts\n`
            + `item2.EMAIL;type=INTERNET:mr.z4bux@gmail.com\n`
            + `item2.X-ABLabel:Email\n`
            + `item3.URL:https://instagram.com/alwiiyy__\n`
            + `item3.X-ABLabel:Instagram\n`
            + `item4.ADR:;;🇮🇩 Indonesia;;;;\n`
            + `item4.X-ABADR:ac\n`
            + `item4.X-ABLabel:Region\n`
            + `item5.X-ABLabel:Author Miaw Bot\n`
            + 'END:VCARD'
            })
            }
            hehe = await fadly.sendMessage(from, {
            "displayName": `${ini_list.length} kontak`,
            "contacts": ini_list 
            }, 'contactsArrayMessage', { quoted: msg })
            .then((res) => fadly.sendMessage(from, 'Nih kontak ownerku', text, { quoted: res } ))
            break

        // List Menu
        case prefix+'menusimple': case prefix+'simplemenu': case prefix+'menusimpel': case prefix+'simpelmenu':
            reply(simpleMenu(prefix))
            break
        case prefix+'menusticker': case prefix+'stickermenu': case prefix+'menustiker': case prefix+'stikermenu':
            reply(stickerMenu(prefix))
            break
        case prefix+'menugabut': case prefix+'gabutmenu':
            reply(gabutMenu(prefix))
            break
        case prefix+'menugroup': case prefix+'groupmenu': case prefix+'menugrup': case prefix+'grupmenu':
            reply(groupMenu(prefix))
            break
        case prefix+'menusistem': case prefix+'sistemmenu':
            reply(sistemMenu(prefix))
            break
        case prefix+'menustore': case prefix+'storemenu':
            reply(storeMenu(prefix))
            break
        case prefix+'menudownload': case prefix+'downloadmenu':
            reply(downloadMenu(prefix))
            break
        case prefix+'menugame': case prefix+'gamemenu':
            reply(gameMenu(prefix))
            break
        case prefix+'menurandom': case prefix+'randommenu':
            reply(randomMenu(prefix))
            break
        case prefix+'menutextpro': case prefix+'textpromenu':
            reply(textproMenu(prefix))
            break
        case prefix+'menuphotooxy': case prefix+'photooxymenu':
            reply(photooxyMenu(prefix))
            break
        case prefix+'menusearch': case prefix+'searchmenu':
            reply(searchMenu(prefix))
            break
        case prefix+'menujadibot': case prefix+'jadibotmenu':
            reply(jadibotMenu(prefix))
            break
        case prefix+'menuowner': case prefix+'ownermenu':
            reply(ownerMenu(prefix))
            break
        case prefix+'menuother': case prefix+'othermenu':
            reply(otherMenu(prefix))
            break
        // Menu Simple & Sticker
        case prefix+'sticker':
        case prefix+'stiker':
        case prefix+'s':
        case prefix+'stickergif':
        case prefix+'sgif': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (isImage || isQuotedImage) {
                let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                await ffmpeg(`${media}`)
                    .input(media)
                    .on('start', function(cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function(err) {
                        console.log(`Error : ${err}`)
                        fs.unlinkSync(media)
                        reply(mess.error.api)
                    })
                    .on('end', function() {
                        console.log('Finish')
                        exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                            if (error) return reply(mess.error.api)
                            fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {
                                quoted: msg
                            })
                            limitAdd(sender, limit)
                            fs.unlinkSync(media)
                            fs.unlinkSync(`./sticker/${sender}.webp`)
                        })
                    })
                    .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                    .toFormat('webp')
                    .save(`./sticker/${sender}.webp`)
            } else if ((isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 10)) {
                let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                reply(mess.wait)
                await ffmpeg(`${media}`)
                    .inputFormat(media.split('.')[4])
                    .on('start', function(cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function(err) {
                        console.log(`Error : ${err}`)
                        fs.unlinkSync(media)
                        let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                        reply(mess.error.api)
                    })
                    .on('end', function() {
                        console.log('Finish')
                        exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                            if (error) return reply(mess.error.api)
                            fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {
                                quoted: msg
                            })
                            limitAdd(sender, limit)
                            fs.unlinkSync(media)
                            fs.unlinkSync(`./sticker/${sender}.webp`)
                        })
                    })
                    .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                    .toFormat('webp')
                    .save(`./sticker/${sender}.webp`)
            } else {
                reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 9 detik`)
            }
            }
            break
        case prefix+'stickerwm': case prefix+'swm': case prefix+'take': case prefix+'takesticker': case prefix+'takestick': {
            if (!isPremium) return reply(mess.OnlyPrem)
            if (args.length < 2) return reply(`Penggunaan ${command} nama|author`)
            let packname1 = q.split('|')[0] ? q.split('|')[0] : q
            let author1 = q.split('|')[1] ? q.split('|')[1] : ''
            if (isImage || isQuotedImage) {
                let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                exif.create(packname1, author1, `stickwm_${sender}`)
                await ffmpeg(`${media}`)
                    .input(media)
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                        fs.unlinkSync(media)
                        reply(mess.error.api)
                    })
                    .on('end', function () {
                        console.log('Finish')
                        exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/${sender}.webp`)
                        fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
                        })
                    })
                    .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                    .toFormat('webp')
                    .save(`./sticker/${sender}.webp`)
            } else if ((isVideo && msg.message.videoMessage.seconds < 10 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 10)) {
                let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                exif.create(packname1, author1, `stickwm_${sender}`)
                reply(mess.wait)
                await ffmpeg(`${media}`)
                    .inputFormat(media.split('.')[4])
                    .on('start', function (cmd) {
                        console.log(`Started : ${cmd}`)
                    })
                    .on('error', function (err) {
                        console.log(`Error : ${err}`)
                        fs.unlinkSync(media)
                        let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                        reply(mess.error.api)
                    })
                    .on('end', function () {
                        console.log('Finish')
                        exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/${sender}.webp`)
                        fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
                        })
                    })
                    .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                    .toFormat('webp')
                    .save(`./sticker/${sender}.webp`)
            } else if (isQuotedSticker) {
                let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                exif.create(packname1, author1, `takestick_${sender}`)
                exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                    fs.unlinkSync(media)
                    fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
                })
            } else {
                reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 9 detik`)
            }
            }
            break
        case prefix+'attp': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}attp* teks\n\nContoh : ${command} ${ownerName}`)
            let ane = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
            fs.writeFileSync('./sticker/attp.webp', ane)
            exec(`webpmux -set exif ./sticker/data.exif ./sticker/attp.webp -o ./sticker/attp.webp`, async (error) => {
                if (error) return reply(mess.error.api)
                fadly.sendMessage(from, fs.readFileSync(`./sticker/attp.webp`), sticker, { quoted: msg })
                limitAdd(sender, limit)
                fs.unlinkSync(`./sticker/attp.webp`)
            })
            }
            break
        case prefix+'pentol': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            // let anu = await axios.get(`https://api-ramlan.herokuapp.com/api/random/pentol?apikey=${apikeys}`)
            let ane = await getBuffer(`https://fadlyid.herokuapp.com/api/wallpaper/pentol?apikey=jayo`)
            fs.writeFileSync('./sticker/' + sender + '.png', ane)
            await ffmpeg('./sticker/' + sender + '.png')
                .input('./sticker/' + sender + '.png')
                .on('start', function (cmd) {
                    console.log(`Started : ${cmd}`)
                })
                .on('error', function (err) {
                    console.log(`Error : ${err}`)
                    fs.unlinkSync('./sticker/' + sender + '.png')
                    reply(mess.error.api)
                })
                .on('end', function () {
                    console.log('Finish')
                    exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        fadly.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, { quoted: msg })
                        limitAdd(sender, limit)
                        fs.unlinkSync('./sticker/' + sender + '.png')
                        fs.unlinkSync(`./sticker/${sender}.webp`)
                    })
                })
                .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                .toFormat('webp')
                .save(`./sticker/${sender}.webp`)
            }
            break
        case prefix+'tomp4': case prefix+'toimg': case prefix+'tomedia':{
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!isQuotedSticker) return reply('Reply stiker nya')
            let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
            let media = await fadly.downloadAndSaveMediaMessage(encmedia)
            if (quotedMsg.stickerMessage.isAnimated === true){
                let outGif = getRandom('.gif')
                let outMp4 = getRandom('.mp4')
                exec(`convert ${media} ${outGif}`, (err) => {
                    if (err) {
                        console.log(err)
                        fs.unlinkSync(media)
                        return reply(`Error bruh`)
                    }
                    exec(`ffmpeg -i ${outGif} -vf "crop=trunc(iw/2)*2:trunc(ih/2)*2" -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p ${outMp4}`, (err) => {
                        if (err) {
                            console.log(err)
                            fs.unlinkSync(media)
                            fs.unlinkSync(outGif)
                            return reply(`Error`)
                        }
                        fadly.sendVideo(from, fs.readFileSync(outMp4), 'Nih', msg)
                        .then(() => {
                            fs.unlinkSync(outMp4)
                            limitAdd(sender, limit)
                        })
                    })
                })
            } else {
                reply(mess.wait)
                let ran = getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return reply(mess.error.api)
                    fadly.sendMessage(from, fs.readFileSync(ran), image, {quoted: msg, caption: 'NIH'})
                    limitAdd(sender,  limit)
                    fs.unlinkSync(ran)
                })
            }
            }
            break
        case prefix+'nulis':
            reply(`*Pilihan Fitur Nulis*
1. ${prefix}nuliskiri
2. ${prefix}nuliskanan
3. ${prefix}foliokiri
4. ${prefix}foliokanan

Contoh:
${prefix}nuliskiri Jangan Lupa Donasi`)
            break
        case prefix+'nuliskiri': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskiri* teks`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '22',
                '-interline-spacing',
                '2',
                '-annotate',
                '+140+153',
                fixHeight,
                './media/nulis/images/buku/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    fadly.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, { quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'nuliskanan': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}nuliskanan* teks`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
            spawn('convert', [
                './media/nulis/images/buku/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '2',
                '-annotate',
                '+128+129',
                fixHeight,
                './media/nulis/images/buku/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    fadly.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg'), image, { quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokiri': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokiri* teks`)
            reply(mess.wait)
            const tulisan = body.slice(11)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkiri.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '1720x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '4',
                '-annotate',
                '+48+185',
                fixHeight,
                './media/nulis/images/folio/setelahkiri.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    fadly.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, { quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case prefix+'foliokanan': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}foliokanan* teks`)
            reply(mess.wait)
            const tulisan = body.slice(12)
            const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
            const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
            spawn('convert', [
                './media/nulis/images/folio/sebelumkanan.jpg',
                '-font',
                './media/nulis/font/Indie-Flower.ttf',
                '-size',
                '960x1280',
                '-pointsize',
                '23',
                '-interline-spacing',
                '3',
                '-annotate',
                '+89+190',
                fixHeight,
                './media/nulis/images/folio/setelahkanan.jpg'
            ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    fadly.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg'), image, { quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0) })
                    limitAdd(sender, limit)
                })
            }
            break
        case 'miaw':{
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!q) return reply(`Halo kak ada apa?`)
            axios.get(`https://caliph.my.id/api/simi.php?text=${q}`)
                .then(({ data }) => reply(`${data.result}`))
                .catch(() => reply(`Miaw gak ngerti apa yang kamu omongin :(`))
            }
            break
        case prefix+'harta': case prefix+'hartatahta': case prefix+'tahta': {
            if (args.length < 2) return reply(`Penggunaan ${command} text\n\nContoh : ${command} Miaw`)
            reply('[❗] Hirti Tihti Tai Asu :v')
            fadly.sendImage(from, await getBuffer(`https://api.lolhuman.xyz/api/hartatahta?apikey=${apikeys}&text=${q}`), '', msg).catch(() => reply(mess.error.api))
            }
            break
        case prefix+'setcmd':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!q) return reply(`Masukan balasannya...\nContoh: ${prefix}setcmd #menu`)
            if (checkRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB) === true) return reply('Key hex tersebut sudah terdaftar di database!')
            addRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), q, sender, responDB)
            reply(`• *Key:* ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}\n• *Action:* ${q}\n\nBerhasil di set`)
            break
        case prefix+'delcmd':
            if (!isPremium) return reply(mess.OnlyPrem)
            if (!isQuotedSticker) return reply('Reply stickernya..')
            if (!deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)) return reply('Key hex tersebut tidak ada di database')
            deleteRespons(msg.quotedMsg.stickerMessage.fileSha256.toString('hex'), responDB)
            reply(`Berhasil remove key hex ${msg.quotedMsg.stickerMessage.fileSha256.toString('hex')}`)
            break

        // Menu Gabut
        case prefix+'apakah':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} saya bisa memilikinya?`)
            const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
            const kah = apa[Math.floor(Math.random() * apa.length)]
            fadly.sendMessage(from, 'Pertanyaan : apakah ' + q + '\n\nJawaban : ' + kah, text, { quoted: msg })
            break
        case prefix+'kapankah':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} aku bisa jadi miliknya?`)
            const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
            const koh = kapan[Math.floor(Math.random() * kapan.length)]
            fadly.sendMessage(from, 'Pertanyaan : kapankah ' + q + '\n\nJawaban : ' + koh, text, { quoted: msg })
            break
        case prefix+'bisakah':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} aku memilikinya?`)
            const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
            const keh = bisa[Math.floor(Math.random() * bisa.length)]
            fadly.sendMessage(from, 'Pertanyaan : bisakah ' + q + '\n\nJawaban : ' + keh, text, { quoted: msg })
            break
        case prefix+'hobby':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} ${pushname}`)
            const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri', 'Genjot Doi']
            const by = hob[Math.floor(Math.random() * hob.length)]
            fadly.sendMessage(from, 'Pertanyaan : hobby ' + q + '\n\nJawaban : ' + by, text, { quoted: msg })
            break
        case prefix+'rate':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} titit saya`)
            const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
            const te = ra[Math.floor(Math.random() * ra.length)]
            fadly.sendMessage(from, 'Pertanyaan : ' + q + '\n\nJawaban : ' + te + '%', text, { quoted: msg })
            break
        case prefix+'truth':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
            const ttrth = trut[Math.floor(Math.random() * trut.length)]
            // fadly.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Truth\n\n' + ttrth, msg)
            let tru = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg')
            let th = [ { buttonId: '#truth', buttonText: { displayText: 'Truth' }, type: 1 }, { buttonId: '#dare', buttonText: { displayText: 'Dare' }, type: 1 } ]
            sendButImage(from, 'Truth\n\n' + ttrth, footxt, tru, th)
            break
        case prefix+'dare':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
            const der = dare[Math.floor(Math.random() * dare.length)]
            // fadly.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Dare\n\n' + der , msg)
            let da = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg')
            let re = [ { buttonId: '#truth', buttonText: { displayText: 'Truth' }, type: 1 }, { buttonId: '#dare', buttonText: { displayText: 'Dare' }, type: 1 } ]
            sendButImage(from, 'Dare\n\n' + der, footxt, da, re)
            break
        case prefix+'cekbapak':
            const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Miaw Bot']
            const cek = bapak[Math.floor(Math.random() * bapak.length)]
            fadly.sendMessage(from, cek, text, { quoted: msg })
            break
        case prefix+'seberapagay':
            if (!q) return reply(`Penggunaan ${command} text\n\nContoh : ${command} ${pushname}`)
            axios.get(`https://arugaz.herokuapp.com/api/howgay`).then(res => res.data).then(res =>
            reply(`Nih Liat Data Gay Si ${q}\n\nPersentase Gay : ${res.persen}%\nAlert!!! : ${res.desc}`))
            break
        case prefix+'jadian':
            if (!isGroup)return reply(mess.OnlyGrup)
            var kamu = groupMembers
            var cinta = groupMembers
            var aku = cinta[Math.floor(Math.random() * kamu.length)]
            var cintax = kamu[Math.floor(Math.random() * cinta.length)]
            let vejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ @${cintax.jid.split('@')[0]}\nSemoga Langgeng Hii`
            // mentions(vejs, [aku.jid, cintax.jid], true)
            let sayang = [ { buttonId: '#jadian', buttonText: { displayText: 'Jadian' }, type: 1 } ]
            sendButMessage(from, vejs, footxt, jadiyan, { contextInfo: { mentionedJid: [aku.jid, cintax.jid] }})
            break
        case prefix+'ganteng':
            if (!isGroup)return reply(mess.OnlyGrup)
            var kamu = groupMembers
            var cinta = groupMembers
            var aku = cinta[Math.floor(Math.random() * kamu.length)]
            var cintax = kamu[Math.floor(Math.random() * cinta.length)]
            let tejs = `Cowok paling ganteng di group ini adalah\n*@${aku.jid.split('@')[0]}*`
            mentions(tejs, [aku.jid, cintax.jid], true)
            break
        case prefix+'cantik':
            if (!isGroup)return reply(mess.OnlyGrup)
            var kamu = groupMembers
            var cinta = groupMembers
            var aku = cinta[Math.floor(Math.random() * kamu.length)]
            var cintax = kamu[Math.floor(Math.random() * cinta.length)]
            let gejs = `Cewek️ paling cantik di group ini adalah\n*@${cintax.jid.split('@')[0]}*`
            mentions(gejs, [aku.jid, cintax.jid], true)
            break

        // Menu Group
           case prefix+'demote':
					if (!isGroup) return reply(mess.OnlyGrup)
					if (!isGroupAdmins) return reply('Fitur Khusus Admin Group')
					if (!isBotGroupAdmins)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*Tag target yang ingin di turunkan admin group!*')
					mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						ini_txt = ''
						for (let _ of mentioned) {
							ini_txt += `*Perintah diterima, menurunkan jadi admin group* :\n`
							ini_txt += `@_.split('@')[0]`
						}
						mentions(ini_txt, mentioned, true)
						fadly.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`*Perintah diterima, menurunkan* @${mentioned[0].split('@')[0]} *jadi admin group*`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
		case prefix+'listadmin':
					if (!isGroup) return reply(mess.OnlyGrup)
					ini_txt = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						ini_txt += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(ini_txt, groupAdmins, true)
					break
        case prefix+'afk':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
            if (body.slice(150)) return reply('Alasanlu kepanjangan')
            let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
            afk.addAfkUser(sender, Date.now(), reason, _afk)
            mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
            break
        case prefix+'add':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (isQuotedMsg && args.length < 2) {
                fadly.groupAdd(from, [quotedMsg.sender])
                    .then((res) => {
                        if (res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us'].code === "403") {
                            let au = res.participants[0][quotedMsg.sender.split("@")[0] + '@c.us']
                            fadly.sendGroupInvite(from, quotedMsg.sender, au.invite_code, au.invite_code_exp, groupName, `Join bang`)
                            reply(`Mengirimkan groupInvite kepada nomor`)
                        } else {
                            reply('Success')
                        }
                    })
                    .catch((err) => reply(jsonformat(err)))
            } else if (args.length < 3 && !isNaN(args[1])) {
                fadly.groupAdd(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => {
                        if (res.participants[0][args[1] + '@c.us'].code === "403") {
                            let au = res.participants[0][args[1] + '@c.us']
                            fadly.sendGroupInvite(from, args[1] + '@s.whatsapp.net', au.invite_code, au.invite_code_exp, groupName, `Join bang`)
                            reply(`Mengirimkan groupInvite kepada nomor`)
                        } else {
                            reply('Success')
                        }
                    })
                    .catch((err) => reply('Error'))
            } else {
                reply()
            }
            break
        case prefix+'kick':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (mentioned.length > 1) return reply('Tagnya satu aja kaka')
            if (mentioned.length !== 0) {
                fadly.groupRemove(from, mentioned)
                    .then((res) => reply('Success Target Saya Tendang!'))
                    .catch((err) => reply('Error'))
            } else if (isQuotedMsg) {
                if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                fadly.groupRemove(from, [quotedMsg.sender])
                    .then((res) => reply('Success Target Saya Tendang!'))
                    .catch((err) => reply('Error'))
            } else if (!isNaN(args[1])) {
                fadly.groupRemove(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply('Success Target Saya Tendang!'))
                    .catch((err) => reply('Error'))
            } else {
                reply(`Kirim perintah ${prefix}kick @tag atau nomor atau reply pesan orang yang ingin di kick`)
            }
            break
        case prefix+'welcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
             img = await fadly.prepareMessage("0@s.whatsapp.net", fs.readFileSync(pathImg), MessageType.image);
            (img.message.imageMessage.jpegThumbnail = fs.readFileSync(pathImg)), {
                encoding: "base64"
            };
            const buttonmsgp = {
                imageMessage: img.message.imageMessage,
                contentText: " Silahkan Pilih Enable / Disable",
                footerText: footxt,
                headerType: "IMAGE",
                buttons: [
                        { buttonId: 'welkom_on', buttonText: { displayText: 'Welcome Enable' }, type: 1},
                        { buttonId: 'welkom_off', buttonText: { displayText: 'Welcome Disable' }, type: 1}
                        ],
                contextInfo: {
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast",
                    quotedMessage: {
                        viewOnceMessage: {
                            message: {
                                videoMessage: {
                                    mimetype: "video/mp4",
                                    viewOnce: true,
                                },
                            },
                        },
                    },
                },
            };
            fadly.sendMessage(from, buttonmsgp, MessageType.buttonsMessage);
            break
        case prefix+'left':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let imge = await fadly.prepareMessage("0@s.whatsapp.net", fs.readFileSync(pathImg), MessageType.image);
            (imge.message.imageMessage.jpegThumbnail = fs.readFileSync(pathImg)), {
                encoding: "base64"
            };
            const buttonmsge = {
                imageMessage: imge.message.imageMessage,
                contentText: " Silahkan Pilih Enable / Disable",
                footerText: footxt,
                headerType: "IMAGE",
                buttons: [
                        { buttonId: 'left_on', buttonText: { displayText: 'Left Enable' }, type: 1},
                        { buttonId: 'left_off', buttonText: { displayText: 'Left Disable' }, type: 1}
                        ],
                contextInfo: {
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast",
                    quotedMessage: {
                        viewOnceMessage: {
                            message: {
                                videoMessage: {
                                    mimetype: "video/mp4",
                                    viewOnce: true,
                                },
                            },
                        },
                    },
                },
            };
            fadly.sendMessage(from, buttonmsge, MessageType.buttonsMessage);
            break
        case prefix+'setwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) return reply(`Set welcome already active`)
            addSetWelcome(q, from, set_welcome_db)
            reply(`Successfully set welcome!`)
            break
        case prefix+'changewelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_welcome*\n\n_Contoh_\n\n${command} Halo @user, Selamat datang di @group`)
            if (isSetWelcome(from, set_welcome_db)) {
                changeSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            } else {
                addSetWelcome(q, from, set_welcome_db)
                reply(`Sukses change set welcome teks!`)
            }
            break
        case prefix+'delsetwelcome':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetWelcome(from, set_welcome_db)) return reply(`Belum ada set welcome di sini..`)
            removeSetWelcome(from, set_welcome_db)
            reply(`Sukses delete set welcome`)
            break
        case prefix+'setleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) return reply(`Set left already active`)
            addSetLeft(q, from, set_left_db)
            reply(`Successfully set left!`)
            break
        case prefix+'changeleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!q) return reply(`Gunakan dengan cara ${command} *teks_left*\n\n_Contoh_\n\n${command} Halo @user, Selamat tinggal dari @group`)
            if (isSetLeft(from, set_left_db)) {
                changeSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            } else {
                addSetLeft(q, from, set_left_db)
                reply(`Sukses change set left teks!`)
            }
            break
        case prefix+'delsetleft':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isSetLeft(from, set_left_db)) return reply(`Belum ada set left di sini..`)
            removeSetLeft(from, set_left_db)
            reply(`Sukses delete set left`)
            break
        case prefix+'linkgc': case prefix+'linkgrup': case prefix+'linkgroup':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            fadly.groupInviteCode(from)
            .then((res) => reply('https://chat.whatsapp.com/' + res))
            break
        case prefix+'mute':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (isMuted) return reply(`udah mute`)
            mute.push(from)
            fs.writeFileSync('./database/mute.json', JSON.stringify(mute, null, 3))
            reply(`Bot berhasil dimute di chat ini`)
            break
        case prefix+'hidetag':
          case prefix+'h':{
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            let arr = [];
            for (let i of groupMembers) {
                arr.push(i.jid)
            }
            mentions(q, arr, false)
            }
            break
        case prefix+'tagall':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
            let arr = [];
            let txti = `*[ TAG ALL ]*\n\n${q ? q : ''}\n\n`
            for (let i of groupMembers){
                txti += `=> @${i.jid.split("@")[0]}\n`
                arr.push(i.jid)
            }
            mentions(txti, arr, true)
            break
        case prefix+'open':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            fadly.groupSettingChange(from, "announcement", false)
                .then((res) => reply('Success Open Group'))
                .catch((err) => reply('Error'))
            break
        case prefix+'close':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            fadly.groupSettingChange(from, "announcement", true)
                .then((res) => reply('Success Close Group'))
                .catch((err) => reply('Error'))
            break
        case prefix+'checksewa': case prefix+'ceksewa':
            if (!isSewa) return reply('Group ini tidak dipasang sewa berwaktu')
            var ceksewa = ms(_sewa.getSewaExpired(from, sewa) - Date.now())
            var sewatime = `Expired: ${ceksewa.days} Days ${ceksewa.hours} Hours ${ceksewa.minutes} Minutes`
            reply(sewatime)
            break

        // Menu Sistem
case prefix+'addvn':
  if (!isOwner) return reply(mess.OnlyOwner)
  if (!pes) return reply('Reply vnnya kak!')
	svst = (q)
	if (!args) return reply('Nama audionya apa?')
	boij = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
	delb = await fadly.downloadMediaMessage(boij)
	audionye.push(`${svst}`)
	fs.writeFileSync(`./strg/${svst}.mp3`, delb)
	fs.writeFileSync('./strg/audio.json', JSON.stringify(audionye))
	fadly.sendMessage(from, `Sukses Menambahkan Vn\nCek dengan cara ${prefix}listvn`, MessageType.text, {quoted: msg})
	break
	case prefix+'delvn':
	tex = args+'.mp3'
	anu = fs.readdirSync('./src')
	for (let o of anu) {
	if (o.toLowerCase().includes(tex)) {
		fs.unlinkSync(`./src/${tex}`)
	}
	}
	await reply('*Done!*')
	break
				case prefix+'vn':  // Herman Chanel
				if (!isOwner) return reply(mess.OnlyOwner)
					namastc = (q)
					buffer = fs.readFileSync(`./strg/${namastc}.mp3`)
					fadly.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: msg, ptt: true })
					break
				case prefix+'listvn':
				case prefix+'vnlist':  // Herman Chanel
				
					ini_txt = '*List Vn:*\n\n'
					for (let awokwkwk of audionye) {
						ini_txt += `- ${awokwkwk}\n`
					}
					ini_txt += `\n*Total : ${audionye.length}*`
					fadly.sendMessage(from, ini_txt.trim(), extendedText, { quoted: msg, contextInfo: { "mentionedJid": audionye } })
					break
case prefix+'nobadword':  // Herman Chanel

                    if (!isGroup) return reply(mess.OnlyGrup())

                if (!isOwner) return reply('fitur hanya untuk admin group'())
                if (args.length < 1) return reply('1 untuk menyalakan, 0 untuk mematikan')
                if (args[1] === '1') {
                if (isBadWord) return reply('*Fitur BadWord sudah aktif sebelum nya*')
                 	   badword.push(from)
                 	   fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
                  	   reply(`Fitur Badword Enable!`)
              	  } else if (args[0] === '0') {
                  	  badword.splice(from, 1)
                 	   fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
                 	    reply(`Fitur Badword Disable`)
             	   } else {
                 	   reply(ind.satukos())
                	}
                    break
				
				case prefix+'addbadword': // Herman Chanel
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (!isGroupAdmins) return reply(ind.admin())
                    if (args.length < 2) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menambahkan Bad Word!')
                    break
                case prefix+'delbadword':  // Herman Chanel
                    if (!isOwner) return reply(ind.ownerb())
                    if (!isGroupAdmins) return reply(ind.admin())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menghapus BAD WORD!')
                    break 
                case prefix+'listbadword':  // Herman Chanel
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➸ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break 
        case prefix+'antilink':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            const buttons2 = [
                        { buttonId: 'anti_link_on', buttonText: { displayText: 'Antilink Enable' }, type: 1},
                        { buttonId: 'anti_link_off', buttonText: { displayText: 'Antilink Disable' }, type: 1}
                        ]
            const prepare = await fadly.prepareMessage("0@s.whatsapp.net", {
                url: 'https://bit.ly/3HTRX1U'
            }, "imageMessage")
            const buttonMessagee = {
                imageMessage: prepare.message.imageMessage,
                contentText: 'Silahkan Pilih Enable / Disable',
                footerText: footxt,
                buttons: buttons2,
                headerType: 'IMAGE'
            }
            await fadly.sendMessage(from, buttonMessagee, MessageType.buttonsMessage, { quoted: msg })
            break
        case prefix+'antiwame':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            const buttons3 = [
                        { buttonId: 'anti_wame_on', buttonText: { displayText: 'Antilink Enable' }, type: 1},
                        { buttonId: 'anti_wame_off', buttonText: { displayText: 'Antilink Disable' }, type: 1}
                        ]
            const preparee = await fadly.prepareMessage("0@s.whatsapp.net", {
                url: 'https://bit.ly/3HTRX1U'
            }, "imageMessage")
            const buttonMessage3 = {
                imageMessage: preparee.message.imageMessage,
                contentText: 'Silahkan Pilih Enable / Disable',
                footerText: footxt,
                buttons: buttons3,
                headerType: 'IMAGE'
            }
            await fadly.sendMessage(from, buttonMessage3, MessageType.buttonsMessage, { quoted: msg })
            break
        case prefix+'antibitly':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            const buttons6 = [
                        { buttonId: 'anti_bitly_on', buttonText: { displayText: 'Antilink Enable' }, type: 1},
                        { buttonId: 'anti_bitly _off', buttonText: { displayText: 'Antilink Disable' }, type: 1}
                        ]
            const preparee6 = await fadly.prepareMessage("0@s.whatsapp.net", {
                url: 'https://bit.ly/3HTRX1U'
            }, "imageMessage")
            const buttonMessage6 = {
                imageMessage: preparee6.message.imageMessage,
                contentText: 'Silahkan Pilih Enable / Disable',
                footerText: footxt,
                buttons: buttons6,
                headerType: 'IMAGE'
            }
            await fadly.sendMessage(from, buttonMessage6, MessageType.buttonsMessage, { quoted: msg })
            break
        case prefix+'antiyt':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            const buttons4 = [
                        { buttonId: 'anti_yt_on', buttonText: { displayText: 'Antilink Enable' }, type: 1},
                        { buttonId: 'anti_yt_off', buttonText: { displayText: 'Antilink Disable' }, type: 1}
                        ]
            const prepare4 = await fadly.prepareMessage("0@s.whatsapp.net", {
                url: 'https://bit.ly/3HTRX1U'
            }, "imageMessage")
            const buttonMessage4 = {
                imageMessage: prepare4.message.imageMessage,
                contentText: 'Silahkan Pilih Enable / Disable',
                footerText: footxt,
                buttons: buttons4,
                headerType: 'IMAGE'
            }
            await fadly.sendMessage(from, buttonMessage4, MessageType.buttonsMessage, { quoted: msg })
            break
        case prefix+'antitele':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            const buttons5 = [
                        { buttonId: 'anti_tele_on', buttonText: { displayText: 'Antilink Enable' }, type: 1},
                        { buttonId: 'anti_tele_off', buttonText: { displayText: 'Antilink Disable' }, type: 1}
                        ]
            const prepare5 = await fadly.prepareMessage("0@s.whatsapp.net", {
                url: 'https://bit.ly/3HTRX1U'
            }, "imageMessage")
            const buttonMessage5 = {
                imageMessage: prepare5.message.imageMessage,
                contentText: 'Silahkan Pilih Enable / Disable',
                footerText: footxt,
                buttons: buttons5,
                headerType: 'IMAGE'
            }
            await fadly.sendMessage(from, buttonMessage5, MessageType.buttonsMessage, { quoted: msg })
            break

        // Menu Store
        case prefix+'list': case prefix+'daftar': case prefix+'toko':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Belum ada list message yang terdaftar di group ini`)
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id === from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    })
                }
            }
            var listMsg = {
                footerText: footxt,
                buttonText: 'Click Here!',
                description: 'Silahkan Pilih Produk Nya',
                sections: [{
                    title: groupName, rows: arr_rows
                }],
                listType: 1
            }
            fadly.sendMessage(from, listMsg, MessageType.listMessage)
            break
        case prefix+'addlist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]                
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
            if (isQuotedImage || isImage) {
                let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        addResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses set list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                addResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses set list message dengan key : *${args1}*`)
            }
            break
        case prefix+'dellist':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
            if (!q) return reply(`Gunakan dengan cara ${command} *key*\n\n_Contoh_\n\n${command} hello`)
            if (!isAlreadyResponList(from, q, db_respon_list)) return reply(`List respon dengan key *${q}* tidak ada di database!`)
            delResponList(from, q, db_respon_list)
            reply(`Sukses delete list message dengan key *${q}*`)
            break
        case prefix+'updatelist': case prefix+'update':
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            var args1 = q.split("@")[0]
            var args2 = q.split("@")[1]
            if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n${command} tes@apa`)
            if (!isAlreadyResponListGroup(from, db_respon_list)) return reply(`Maaf, untuk key *${args1}* belum terdaftar di group ini`)
            if (isQuotedImage || isImage) {
                let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                const fd = new FormData();
                fd.append('file', fs.readFileSync(media), '.tmp', '.jpg')
                fetch('https://telegra.ph/upload', {
                    method: 'POST',
                    body: fd
                }).then(res => res.json())
                    .then((json) => {
                        updateResponList(from, args1, args2, true, `https://telegra.ph${json[0].src}`, db_respon_list)
                        reply(`Sukses update list message dengan key : *${args1}*`)
                        if (fs.existsSync(media)) fs.unlinkSync(media)
                    })
            } else {
                updateResponList(from, args1, args2, false, '-', db_respon_list)
                reply(`Sukses update respon list dengan key *${args1}*`)
            }
            break
        case prefix+'jeda': {
            if (!isGroup) return reply(mess.OnlyGrup)
            if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            if (!isBotGroupAdmins) return reply(mess.BotAdmin)
            if (!args[1]) return reply(`kirim ${command} waktu\nContoh: ${command} 30m\n\nlist waktu:\ns = detik\nm = menit\nh = jam\nd = hari`)
            opengc[from] = { id: from, time: Date.now() + toMS(args[1]) }
            fs.writeFileSync('./database/opengc.json', JSON.stringify(opengc))
            fadly.groupSettingChange(from, "announcement", true)
            .then((res) => reply(`Sukses, group akan dibuka ${args[1]} lagi`))
            .catch((err) => reply('Error'))
            }
            break
        case prefix+'tambah':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one + nilai_two}`)
            break
        case prefix+'kurang':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one - nilai_two}`)
            break
        case prefix+'kali':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one * nilai_two}`)
            break
        case prefix+'bagi':
            if (args.length < 3) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
            var nilai_one = Number(args[1])
            var nilai_two = Number(args[2])
            reply(`${nilai_one / nilai_two}`)
            break
        case 'p': case 'proses': case 'y':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let numb = quotedMsg.sender
            let proses = `「 *TRANSAKSI PENDING* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n📝 Catatan :\n${quotedMsg.chats}\n\nPesanan @${numb.split("@")[0]} sedang di proses!`
            mentions(proses, [numb], true)
            break
        case 'd': case 'done':
            if (!isGroup) return
            if (!isOwner && !isGroupAdmins) return
            if (!isQuotedMsg) return
            let numbb = quotedMsg.sender
            let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih @${numbb.split("@")[0]} Next Order ya🙏`
            mentions(sukses, [numbb], true)
            break
        
        // Menu Download
        case prefix+'instagram':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://www.instagram.com/p/CWR_S4BF0mt/?utm_medium=copy_link`)
            if (q.includes('/p/')) {
                axios.get(`https://www.instagram.com/p/${q.match(/\/p\/(.*?)\//)[1]}/?__a=1`, {
                    headers: {
                        'Cookie': "ig_did=278B3F89-90A4-4EC4-829C-2C3C74F3C7F2; ig_nrcb=1; mid=Yb4RjAAEAAFipGvjXskoCN5zp672; csrftoken=hvW7h0Sv1ESih087Y7MuhERweQAEqL1u; rur='EAG\\05450262312153\\0541671382514:01f7006e8f12157606b84f3965eaab83df88729463b666546ce0561dbc3b423ed4a81636'; ds_user_id=50262312153; sessionid=50262312153%3AGOkvdjVholhDgr%3A8",
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0'
                    },
                }).then(async (res) => {
                    if (res.data.graphql.shortcode_media.__typename === 'GraphVideo') {
                        var result_text_igdl = `*IG-DOWNLOADER 📂*
                    
${monospace(`Type         : Video
Username     : ${res.data.graphql.shortcode_media.owner.username ? res.data.graphql.shortcode_media.owner.username : '-'}
Full_Name    : ${res.data.graphql.shortcode_media.owner.full_name ? res.data.graphql.shortcode_media.owner.full_name : '-'}
Viewer_Count : ${res.data.graphql.shortcode_media.video_view_count ? toRupiah(res.data.graphql.shortcode_media.video_view_count) : '-'}
Like_Count   : ${res.data.graphql.shortcode_media.edge_media_preview_like.count ? toRupiah(res.data.graphql.shortcode_media.edge_media_preview_like.count) : '-'}
Duration     : ${res.data.graphql.shortcode_media.video_duration ? formatSecond(res.data.graphql.shortcode_media.video_duration.toString().split('.')[0]) : '-'}
Caption      : ${res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text ? res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text.trim() : '-'}`)}`
                            sendFileFromUrl(from, res.data.graphql.shortcode_media.video_url, result_text_igdl, msg)
                            limitAdd(sender, limit)
                    } else if (res.data.graphql.shortcode_media.__typename === 'GraphImage') {
                        var result_text_igdl = `*IG-DOWNLOADER 📂*
                    
${monospace(`Type         : Image
Username     : ${res.data.graphql.shortcode_media.owner.username ? res.data.graphql.shortcode_media.owner.username : '-'}
Full_Name    : ${res.data.graphql.shortcode_media.owner.full_name ? res.data.graphql.shortcode_media.owner.full_name : '-'}
Viewer_Count : ${res.data.graphql.shortcode_media.video_view_count ? toRupiah(res.data.graphql.shortcode_media.video_view_count) : '-'}
Like_Count   : ${res.data.graphql.shortcode_media.edge_media_preview_like.count ? toRupiah(res.data.graphql.shortcode_media.edge_media_preview_like.count) : '-'}
Caption      : ${res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text ? res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text.trim() : '-'}`)}`
                            sendFileFromUrl(from, res.data.graphql.shortcode_media.display_url, result_text_igdl, msg)
                            limitAdd(sender, limit)
                    }
                }).catch(err => {
                    console.log(color('[ ERROR ]', 'red'), err)
                    reply(mess.error.api)
                })
            } else if (q.includes('/reel/')) {
                axios.get(`https://www.instagram.com/p/${q.split('/')[4]}/?__a=1`, {
                    headers: {
                        'Cookie': "ig_did=278B3F89-90A4-4EC4-829C-2C3C74F3C7F2; ig_nrcb=1; mid=Yb4RjAAEAAFipGvjXskoCN5zp672; csrftoken=hvW7h0Sv1ESih087Y7MuhERweQAEqL1u; rur='EAG\\05450262312153\\0541671382514:01f7006e8f12157606b84f3965eaab83df88729463b666546ce0561dbc3b423ed4a81636'; ds_user_id=50262312153; sessionid=50262312153%3AGOkvdjVholhDgr%3A8",
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0'
                    }
                }).then(async (res) => {
                    if (res.data.graphql.shortcode_media.__typename === 'GraphVideo') {
                        var result_text_igdl = `*IG-DOWNLOADER 📂*
                    
${monospace(`Type         : Video
Username     : ${res.data.graphql.shortcode_media.owner.username ? res.data.graphql.shortcode_media.owner.username : '-'}
Full_Name    : ${res.data.graphql.shortcode_media.owner.full_name ? res.data.graphql.shortcode_media.owner.full_name : '-'}
Viewer_Count : ${res.data.graphql.shortcode_media.video_view_count ? toRupiah(res.data.graphql.shortcode_media.video_view_count) : '-'}
Like_Count   : ${res.data.graphql.shortcode_media.edge_media_preview_like.count ? toRupiah(res.data.graphql.shortcode_media.edge_media_preview_like.count) : '-'}
Duration     : ${res.data.graphql.shortcode_media.video_duration ? formatSecond(res.data.graphql.shortcode_media.video_duration.toString().split('.')[0]) : '-'}
Caption      : ${res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text ? res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text.trim() : '-'}`)}`
                            sendFileFromUrl(from, res.data.graphql.shortcode_media.video_url, result_text_igdl, msg)
                            limitAdd(sender, limit)
                    } else if (res.data.graphql.shortcode_media.__typename === 'GraphImage') {
                        var result_text_igdl = `*IG-DOWNLOADER 📂*
                    
${monospace(`Type         : Image
Username     : ${res.data.graphql.shortcode_media.owner.username ? res.data.graphql.shortcode_media.owner.username : '-'}
Full_Name    : ${res.data.graphql.shortcode_media.owner.full_name ? res.data.graphql.shortcode_media.owner.full_name : '-'}
Viewer_Count : ${res.data.graphql.shortcode_media.video_view_count ? toRupiah(res.data.graphql.shortcode_media.video_view_count) : '-'}
Like_Count   : ${res.data.graphql.shortcode_media.edge_media_preview_like.count ? toRupiah(res.data.graphql.shortcode_media.edge_media_preview_like.count) : '-'}
Caption      : ${res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text ? res.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text.trim() : '-'}`)}`
                            sendFileFromUrl(from, res.data.graphql.shortcode_media.display_url, result_text_igdl, msg)
                            limitAdd(sender, limit)
                    }
                }).catch(err => {
                    console.log(color('[ ERROR ]', 'red'), err)
                    reply(mess.error.api)
                })
            }
            break
        case prefix+'youtube':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://youtu.be/J9YG0LxpSqM`)
            ytdlmp4(q).then(async res => {
                var prep_img = await fadly.prepareMessage(from, await getBuffer(res.data[0].thumbnail), MessageType.image)
                var buttonMsg = {
                    imageMessage: prep_img.message.imageMessage,
                    contentText: `*YOUTUBE-DOWNLOADER*
                        
📃 *Title:* ${res.data[0].title ? res.data[0].title : '-'}
⏳ *Duration:* ${res.data[0].durationNumber ? formatSecond(res.data[0].durationNumber) : '-'}

_Silahkan Pilih Format yang ada dibawah_`,
                    footerText: footxt,
                    buttons: [
                        { buttonId: `ytdl_video&${q}`, buttonText: { displayText: `Video` }, type: 1 },
                        { buttonId: `ytdl_audio&${q}`, buttonText: { displayText: `Audio` }, type: 1 }
                    ],
                    headerType: 4
                }
                fadly.sendMessage(from, buttonMsg, MessageType.buttonsMessage)
            }).catch(err => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
            })
            break
        case prefix+'tiktok':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSeCw9xb2/`)
            axios.get('https://tikdown.org/').then(r => {
                const $ = cheerio.load(r.data);
                const __token__ = $('#download-form > input:nth-child(2)').attr('value');
                axios.get(`https://tikdown.org/getAjax?url=${encodeURIComponent(q)}&_token=${__token__}`).then(async res => {
                    const $$ = cheerio.load(res.data.html);
                    const __video__ = $$('.download-links > div:nth-child(1) > a:nth-child(1)').attr('href');
                    const __audio__ = $$('div.button-primary-gradient:nth-child(2) > a:nth-child(1)').attr('href');
                    const __thumb__ = $$('.preview-image').attr('src')
                    var prep_img = await fadly.prepareMessage(from, await getBuffer(__thumb__), MessageType.image)
                    var buttonMsg = {
                        imageMessage: prep_img.message.imageMessage,
                        contentText: `*TIKTOK-DOWNLOADER*
                        
*ID:* ${require('crypto').randomBytes(5).toString('hex').toUpperCase()}

_Silahkan Pilih Format yang ada dibawah_`,
                        footerText: footxt,
                        buttons: [
                            { buttonId: `tiktok_video&${__video__}`, buttonText: { displayText: `Video` }, type: 1 },
                            { buttonId: `tiktok_audio&${__audio__}`, buttonText: { displayText: `Audio` }, type: 1 }
                        ],
                        headerType: 4
                    }
                    fadly.sendMessage(from, buttonMsg, MessageType.buttonsMessage)
                })
            }).catch(err => {
                console.log(color('[ ERROR ]', 'red'), err)
                reply(mess.error.api)
            })
            break
        
        // Menu Game
				case prefix+'caklontong':
				  if (!q)
					if (!isLimit) return reply('limit anda habis silahkan ketik .limit untuk cek')
					anu = await fetchJson(`https://api-mikubot.herokuapp.com/api/kuis/caklontong?apikey=RanddyGanz`, {method: 'get'})
					caklontong = `*${anu.pertanyaan}*`
					setTimeout( () => {
					fadly.sendMessage(from, '*тЮ╕ Jawaban :* '+anu.jawaban+ '\n\nтАв Penjelasan: *'+ anu.keterangan+'*', text, {quoted: msg }) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					fadly.sendMessage(from, '_10 Detik lagiтАж_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					fadly.sendMessage(from, '_20 Detik lagi_тАж', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					fadly.sendMessage(from, '_30 Detik lagi_тАж', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					fadly.sendMessage(from, caklontong, text, {quoted: msg }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
        case prefix+'tebakgambar': {
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (game.isTebakGambar(from, tebakgambar)) return reply(`Masih ada soal yang belum di selesaikan`)
            let anu = await axios.get(`https://api.lolhuman.xyz/api/tebak/gambar2?apikey=${apikeys}`)
            let anih = anu.data.result.answer.toLowerCase()
            game.addgambar(from, anih, gamewaktu, tebakgambar)
            const petunjuk = anu.data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
            sendFileFromUrl(from, anu.data.result.image, monospace(`Silahkan jawab soal berikut ini\n\nPetunjuk : ${petunjuk}\nWaktu : ${gamewaktu}s`), msg)
            gameAdd(sender, glimit)
            }
            break
        case prefix+'family100': {
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (game.isfam(from, family100)) return reply(`Masih ada soal yang belum di selesaikan`)
            let anu = await axios.get(`https://api.lolhuman.xyz/api/tebak/family100?apikey=${apikeys}`)
            reply(`*JAWABLAH SOAL BERIKUT*\n\n*Soal :* ${anu.data.result.question}\n*Total Jawaban :* ${anu.data.result.answer.length}\n\nWaktu : ${gamewaktu}s`)
            let anoh = anu.data.result.answer
            let rgfds = []
            for (let i of anoh) {
                let fefs = i.split('/') ? i.split('/')[0] : i
                let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ', '') : fefs
                let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                rgfds.push(axsf.toLowerCase())
            }
            game.addfam(from, rgfds, gamewaktu, family100)
            gameAdd(sender, glimit)
            }
            break
        case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':{
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            if (Object.values(tictactoe).find(room => [room.game.playerX, room.game.playerO].includes(sender))) return reply("Kamu masih berada di room tictactoe");
            let room = Object.values(tictactoe).find(room => room.state === 'WAITING' && (q ? room.name == q : true))
            if (room) {
                reply("Lawan ditemukan")
                room.o = from
                room.game.playerO = sender
                room.state = 'PLAYING'
                let str = `*Tic Tac Toe*

Room ID : ${room.id}

1️⃣ 2️⃣ 3️⃣
4️⃣ 5️⃣ 6️⃣
7️⃣ 8️⃣ 9️⃣

Giliran @${room.game.turn.split("@")[0]}`
                if (room.x !== room.o) fadly.sendMessage(room.x, str, extendedText, { contextInfo: { mentionedJid: [room.game.turn] }})
                fadly.sendMessage(room.o, str, extendedText, { contextInfo: { mentionedJid: [room.game.turn] }})
            } else {
                room = {
                    id: Date.now(),
                    x: from,
                    o: '',
                    game: new TicTacToe(sender, 'o'),
                    state: "WAITING"
                }
                if (q) room.name = q
                reply(`Menunggu lawan`)
                tictactoe[room.id] = room
            }
            }
            break
        case prefix+'suit':
            let su = `Pilih Dibawah Untuk Bermain`
            let it = [
            { buttonId: '#sbatu', buttonText: { displayText: 'Batu ✊' }, type: 1 },
            { buttonId: '#skertas', buttonText: { displayText: 'Kertas 🖐️' }, type: 1 },
            { buttonId: '#sgunting', buttonText: { displayText: 'Gunting ✌️' }, type: 1 }
            ]
            sendButMessage(from, su, footxt, it)
            break
        case prefix+'sbatu':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            var ba = randomNomor(100)
            addBalance(sender, ba, balance)
            const batu = [`Kamu batu\nKomputer  gunting\nKamu menang\nHadiah : ${ba} balance`,`Kamu batu\nKomputer  batu\nSeri`,`Kamu batu\nKomputer  batu\nSeri`]
            const batuh = batu[Math.floor(Math.random() * batu.length)]
            var batuh2 = `${batuh}`
            fadly.sendMessage(from, batuh2, text, { quoted: msg })
            gameAdd(sender, glimit)
            break
        case prefix+'skertas':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            var ker = randomNomor(100)
            addBalance(sender, ker, balance)
            const kertas = [`Kamu kertas\nKomputer  kertas\nSeri`,`Kamu kertas\nKomputer  batu\nKamu menang\nHadiah : ${ker} balance`,`Kamu kertas\nKomputer  gunting\nKamu kalah`]
            const kertash = kertas[Math.floor(Math.random() * kertas.length)]
            var kertash2 = `${kertash}`
            fadly.sendMessage(from, kertash2, text, { quoted: msg })
            gameAdd(sender, glimit)
            break
        case prefix+'sgunting':
            if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            var gun = randomNomor(100)
            addBalance(sender, gun, balance)
            const gunting = [`Kamu gunting\nKomputer  batu\nKamu kalah`,`Kamu gunting\nKomputer  kertas\nKamu menang\nHadiah : ${gun} balance`,`Kamu gunting\nKomputer  gunting\nseri`]
            const guntingh = gunting[Math.floor(Math.random() * gunting.length)]
            var guntingh2 = `${guntingh}`
            fadly.sendMessage(from, guntingh2, text, { quoted: msg })
            gameAdd(sender, glimit)
            break
        case prefix+'akinator': { // Jangan hapus we em ;v
            if (isGroup) return reply(mess.OnlyPM)
            if (from in akinator) return reply(`Masih ada game akinator yg berlangsung`)
            await reply("Game akan segera dimulai")
            akinator[from] = new Aki({ region: "id", childMode: false })
            await akinator[from].start()
            await reply(`*Progress: ${akinator[from].progress.toFixed(2)}%*

${akinator[from].question}

1. Iya
2. Tidak
3. Tidak tahu
4. Mungkin
5. Mungkin tidak
6. Kembali`)
            }
            break
        case prefix+'topglobal':{
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPGLOBAL 」 ──*\n\n'
            let arrTop = []
            for (let i = 0; i < 10; i ++){
                top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                arrTop.push(balance[i].id)
            }
            mentions(top, arrTop, true)
            }
            break
        case prefix+'toplocal':{
            if (!isGroup)return reply(mess.OnlyGrup)
            balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            let top = '*── 「 TOPLOCAL 」 ──*\n\n'
            let arrTop = []
            let anggroup = groupMembers.map(a => a.jid)
            for (let i = 0; i < balance.length; i ++){
                if (arrTop.length >= 10) continue
                if (anggroup.includes(balance[i].id)) {
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
            }
            mentions(top, arrTop, true)
            }
            break
        
        // Menu Random
        case prefix+'asupan': {
             if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=${apikeys}`)
                .then(({ data }) => {
                    sendFileFromUrl(from, data.result, 'Asupan neh', msg)
                        .catch((err) => {
                            sendMess(ownerNumber, 'Asupan : ' + err)
                            console.log(color('[ ASUPAN ]', 'red'), err)
                            reply(mess.error.api)
                        })
                        limitAdd(sender, limit)
                })
            }
            break
        case prefix+'couple': case prefix+'kapel': case prefix+'ppcp': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            let anu = await axios.get(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${apikeys}`)
            sendFileFromUrl(from, anu.data.result.male, 'Cowo', msg)
                .then((res) => sendFileFromUrl(from, anu.data.result.female, 'Cewe', res))
                .catch((err) => {
                    reply(mess.error.api)
                })
                limitAdd(sender, limit)
            }
            break
        case prefix+'meme': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            // sendFileFromUrl(from, `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${apikeys}`, '*Random Meme Indo*', msg)
            let meme = await getBuffer(`https://api.lolhuman.xyz/api/meme/memeindo?apikey=${apikeys}`)
            let butmim = [ { buttonId: `${prefix}meme`, buttonText: { displayText: 'Next Photo' }, type: 1 } ]
            sendButImage(from, '*Random Meme*', footxt, meme, butmim)
                .catch((err) => {
                    sendMess(ownerNumber, 'Meme : ' + err)
                    console.log(color('[ MEME ]', 'red'), err)
                    reply(mess.error.api)
                })
            limitAdd(sender, limit)
            }
            break
        case prefix+'waifu': case prefix+'wibu': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            // sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/waifu?apikey=${apikeys}`, '*Cintai waifu mu >\\<*', msg)
            let wibu = await getBuffer(`https://api.lolhuman.xyz/api/random/waifu?apikey=${apikeys}`)
            let butwibu = [ { buttonId: `${prefix}wibu`, buttonText: { displayText: 'Next Photo' }, type: 1 } ]
            sendButImage(from, '*Cintai waifu mu >\\<*', footxt, wibu, butwibu)
                .catch((err) => {
                    sendMess(ownerNumber, 'waifu : ' + err)
                    console.log(color('[ WAIFU ]', 'red'), err)
                    reply(mess.error.api)
                })
            limitAdd(sender, limit)
            }
            break
        case prefix+'gachacowok': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            // sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/cogan?apikey=${apikeys}`, 'COGAN NIH BOS:V', msg)
            let couo = await getBuffer(`https://api.lolhuman.xyz/api/random/cogan?apikey=${apikeys}`)
            let butcwo = [ { buttonId: `${prefix}gachacowok`, buttonText: { displayText: 'Next Photo' }, type: 1 } ]
            sendButImage(from, 'Cogan Nih Bos:v', footxt, couo, butcwo)
                .catch((err) => {
                    sendMess(ownerNumber, 'Gacha cowok : ' + err)
                    console.log(color('[ GACHA ]', 'red'), err)
                    reply(mess.error.api)
                })
            limitAdd(sender, limit)
            }
            break
        case prefix+'gachacewek': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            reply(mess.wait)
            // sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/cecan?apikey=${apikeys}`, 'CECAN NIH BOS:V', msg)
            let ceue = await getBuffer(`https://api.lolhuman.xyz/api/random/cecan?apikey=${apikeys}`)
            let butcwe = [ { buttonId: `${prefix}gachacewek`, buttonText: { displayText: 'Next Photo' }, type: 1 } ]
            sendButImage(from, 'Cecan Nih Bos:v', footxt, ceue, butcwe)
                .catch((err) => {
                    sendMess(ownerNumber, 'Gacha cewek : ' + err)
                    console.log(color('[ GACHA ]', 'red'), err)
                    reply(mess.error.api)
                })
            limitAdd(sender, limit)
            }
            break
        case prefix+'quotes':{
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            data = fs.readFileSync("../lib/quote.json");
            jsonData = JSON.parse(data);
            randIndex = Math.floor(Math.random() * jsonData.length);
            randKey = jsonData[randIndex];
            randQuote = '' + randKey.quote + '\n\n_By: ' + randKey.by + '_'
            // reply(randQuote)
            let butqt = [ { buttonId: `${prefix}quotes`, buttonText: { displayText: 'Next Quotes' }, type: 1 } ]
            sendButMessage(from, randQuote, footxt, butqt)
            limitAdd(sender, limit)
            }
            break
        case prefix+'bucin': case prefix+'pantun': case prefix+'katabijak': case prefix+'faktaunik':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            axios.get(`https://api.lolhuman.xyz/api/random/${command.slice(1)}?apikey=${apikeys}`)
                .then(({ data }) => {
                    // reply(data.result)
                    let butrndm = [ { buttonId: `${prefix}${command.slice(1)}`, buttonText: { displayText: 'Get Again' }, type: 1 } ]
                    sendButMessage(from, data.result, footxt, butrndm)
                    limitAdd(sender, limit)
                })
            break

        // Menu Textpro
        case prefix+'blackpink':
        case prefix+'neon':
        case prefix+'greenneon':
        case prefix+'advanceglow':
        case prefix+'futureneon':
        case prefix+'sandwriting':
        case prefix+'sandsummer':
        case prefix+'sandengraved':
        case prefix+'metaldark':
        case prefix+'neonlight':
        case prefix+'holographic':
        case prefix+'text1917':
        case prefix+'minion':
        case prefix+'deluxesilver':
        case prefix+'newyearcard':
        case prefix+'bloodfrosted':
        case prefix+'halloween':
        case prefix+'jokerlogo':
        case prefix+'fireworksparkle':
        case prefix+'natureleaves':
        case prefix+'bokeh':
        case prefix+'toxic':
        case prefix+'strawberry':
        case prefix+'box3d':
        case prefix+'roadwarning':
        case prefix+'breakwall':
        case prefix+'icecold':
        case prefix+'luxury':
        case prefix+'cloud':
        case prefix+'summersand':
        case prefix+'horrorblood':
        case prefix+'thunder': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text\n\nContoh : ${command} Fadly`)
            reply(mess.wait)
            sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome/${command.slice(1)}?apikey=${apikeys}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break
        case prefix+'pornhub':
        case prefix+'glitch':
        case prefix+'avenger':
        case prefix+'space':
        case prefix+'ninjalogo':
        case prefix+'marvelstudio':
        case prefix+'lionlogo':
        case prefix+'wolflogo':
        case prefix+'steel3d':
        case prefix+'wallgravity': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text1|text2\n\nContoh : ${command} Fadly|ID`)
            if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2\n\nContoh : ${command} Fadly|ID`)
            reply(mess.wait)
            sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome2/${command.slice(1)}?apikey=${apikeys}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break

        // Menu Photooxy
        case prefix+'shadow':
        case prefix+'cup':
        case prefix+'cup1':
        case prefix+'romance':
        case prefix+'smoke':
        case prefix+'burnpaper':
        case prefix+'lovemessage':
        case prefix+'undergrass':
        case prefix+'love':
        case prefix+'coffe':
        case prefix+'woodheart':
        case prefix+'woodenboard':
        case prefix+'summer3d':
        case prefix+'wolfmetal':
        case prefix+'nature3d':
        case prefix+'underwater':
        case prefix+'golderrose':
        case prefix+'summernature':
        case prefix+'letterleaves':
        case prefix+'glowingneon':
        case prefix+'fallleaves':
        case prefix+'flamming':
        case prefix+'harrypotter':
        case prefix+'carvedwood': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text\n\nContoh : ${command} Fadly`)
            reply(mess.wait)
            sendFileFromUrl(from, `https://api.lolhuman.xyz/api/photooxy1/${command.slice(1)}?apikey=${apikeys}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break
        case prefix+'arcade8bit':
        case prefix+'battlefield4':
        case prefix+'pubg': {
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (args.length < 2) return reply(`Penggunaan ${command} text1|text2\n\nContoh : ${command} Fadly|ID`)
            if (!q.includes("|")) return reply(`Penggunaan ${command} text1|text2\n\nContoh : ${command} Fadly|ID`)
            reply(mess.wait)
            sendFileFromUrl(from, `https://api.lolhuman.xyz/api/photooxy2/${command.slice(1)}?apikey=${apikeys}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
            limitAdd(sender, limit)
            }
            break
        
        // Menu Search
        case prefix+'nickff':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 646675175`)
            axios.get(`https://api.lolhuman.xyz/api/freefire/${args[1]}?apikey=${apikeys}`)
            .then(({data}) => {
            let epep = `*🔎 CHECK NICK FREE FIRE 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(epep)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                reply(mess.error.api)
            })
            break
        case prefix+'nickml':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            var args1 = q.split("/")[0]
            var args2 = q.split("/")[1]                
            if (!q.includes("/")) return reply(`Gunakan dengan cara ${command} *id/server*\n\n_Contoh_\n\n${command} 617243212/8460`)
            axios.get(`https://api.lolhuman.xyz/api/mobilelegend/${args1}/${args2}?apikey=${apikeys}`)
            .then(({data}) => {
            let emel = `*🔎 CHECK NICK MOBILE LEGENDS 🔍*

ID : ${args[1]}
Nick : ${data.result}`
reply(emel)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                reply(mess.error.api)
            })
            break
        case prefix+'nickpubg':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 5217933016`)
            axios.get(`https://api.lolhuman.xyz/api/pubg/${args[1]}?apikey=${apikeys}`)
            .then(({data}) => {
            let pubg = `*🔎 CHECK NICK PUBG 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(pubg)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                reply(mess.error.api)
            })
            break
        case prefix+'nickdomino':
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply(`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            if (!q) return reply(`Gunakan dengan cara ${command} *id*\n\n_Contoh_\n\n${command} 291756557`)
            axios.get(`https://api.lolhuman.xyz/api/higghdomino/${args[1]}?apikey=${apikeys}`)
            .then(({data}) => {
            let domino = `*🔎 CHECK NICK HIGGS DOMINO 🔍*

ID : ${args[1]}
Nick : ${data.result}`
            reply(domino)
            limitAdd(sender, limit)
            })
            .catch((err) => {
                reply(mess.error.api)
            })
            break

        // Menu Jadibot
        case prefix+'jadibot':{
            if (!isPremium) return reply(`Lu Gak Premium Anjg`)
            if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
            limitAdd(sender, limit)
            let parent = args[1] && args[1] == 'plz' ? fadly : global.fadly
            let auth = false
            if (global.conns.length >= 100) return reply(`Maaf Udah Maksimal Yang Jadibot, coba lain kali`)
            if ((args[0] && args[0] == 'plz') || global.fadly.user.jid == fadly.user.jid || fadly.user.jid == ownerNumber) {
                let id = global.conns.length
                let conn = new global.fadly.constructor()
                conn.multi = true
                conn.nopref = false
                conn.prefa = 'anjing'
                if (args[1] && args[1].length > 200) {
                    let json = Buffer.from(args[1], 'base64').toString('utf-8')
                    // global.conn.reply(m.isGroup ? m.sender : m.chat, json, m)
                    let obj = JSON.parse(json)
                    await conn.loadAuthInfo(obj)
                    auth = true
                    conn.multi = false
                    conn.nopref = false
                    conn.prefa = args[2] ? args[2] : '#'
                }
                conn.mode = 'public'
                conn.spam = []
                conn.baterai = {
                    baterai: 0,
                    cas: false
                };
                conn.logger.level = 'warn'
                conn.browserDescription = ['Numpang Di Fadly', 'Safari', '3.0']
                conn.on('qr', async qr => {
                    qrcode.toDataURL(qr, { scale: 8 }, async(err, Durl) => {
                        const data = Durl.replace(/^data:image\/png;base64,/, '')
                        const bufferDataQr = new Buffer.from(data, 'base64');
                        let scan = await parent.sendImage(from, bufferDataQr, 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik', msg)
                        setTimeout(() => {
                        parent.deleteMessage(from, scan.key)
                        }, 30000)
                    })
                })
                conn.connect().then(async ({user}) => {
                    parent.reply(from, `Berhasil tersambung dengan WhatsApp - mu.\nSekarang kamu berada di mode self, kirim ${prefix}public untuk pindah ke mode public\n*NOTE: Ini cuma numpang*\n` + JSON.stringify(user, null, 2), msg)
                    if (auth) return
                    await parent.sendMessage(user.jid, `Kamu bisa login tanpa qr dengan pesan dibawah ini. untuk mendapatkan kode lengkapnya, silahkan kirim *${prefix}getcode* untuk mendapatkan kode yang akurat`, MessageType.extendedText)
                    parent.sendMessage(user.jid, `${command} ${Buffer.from(JSON.stringify(conn.base64EncodedAuthInfo())).toString('base64')}`, MessageType.extendedText)
                })
                conn.on('chat-update', async (qul) =>{
                    if (!qul.hasNewMessage) return
                    qul = qul.messages.all()[0]
                    // Anti oversized
                    if (qul.messageStubType){
                        if (qul.messageStubType == 68){
                            fadly.modifyChat(qul.key.remoteJid, 'clear')
                        }
                    }

                    if (!qul.message) return
                    if (qul.key && qul.key.remoteJid == 'status@broadcast') return
                    let msg = serialize(conn, qul)
                    // Detect Troli
                    if (msg.message && msg.isBaileys && msg.isQuotedMsg && msg.quotedMsg.type === 'orderMessage'){
                        fadly.clearMessage(msg.key)
                    }
                    module.exports(conn, msg, blocked, _afk, welcome, left)
                    })
                conn.on('CB:action,,battery', json => {
                    const a = json[2][0][1].value
                    const b = json[2][0][1].live
                    conn.baterai.baterai = a
                    conn.baterai.cas = b
                })
                conn.regenerateQRIntervalMs = null
                setTimeout(() => {
                    if (conn.user) return
                    conn.close()
                    let i = global.conns.indexOf(conn)
                    if (i < 0) return
                    delete global.conns[i]
                    global.conns.splice(i, 1)
                }, 60000)
                conn.on('close', () => {
                    setTimeout(async () => {
                        try {
                            if (conn.state != 'close') return
                            if (conn.user && conn.user.jid)
                            parent.sendMessage(conn.user.jid, `Koneksi terputus...`, MessageType.extendedText)
                            let i = global.conns.indexOf(conn)
                            if (i < 0) return
                            delete global.conns[i]
                            global.conns.splice(i, 1)
                            } catch (e) { conn.logger.error(e) }
                        }, 30000)
                    })
                    global.conns.push(conn)
                } else {
                    reply('Tidak bisa membuat bot didalam bot!\n\nhttps://wa.me/' + global.fadly.user.jid.split`@`[0] + '?text=#jadibot')
                }
            }
            break
        case prefix+'stopjadibot':{
            if (global.fadly.user.jid == fadly.user.jid) fadly.reply(from, 'Kenapa nggk langsung ke terminalnya?', msg)
            else {
                await fadly.reply(from, 'Bye...', msg).then(() => fadly.close())
            }
            }
            break
        case prefix+'getcode':{
            if (global.fadly.user.jid == fadly.user.jid) fadly.reply(from, 'Command ini hanya untuk yang jadi bot', msg)
            else global.fadly.reply(fadly.user.jid, `${prefix}jadibot ${Buffer.from(JSON.stringify(fadly.base64EncodedAuthInfo())).toString('base64')}`, msg)
            }
            break
        case prefix+'listbot':{
            let arrayBot = [];
            let tmx = `「 *LIST-BOT NUMPANG* 」\n\n`
            tmx += `• *Nomor:* @${global.fadly.user.jid.split("@")[0]}\n`
            tmx += `• *Prefix:* ${global.fadly.multi ? 'MULTI PREFIX' : global.fadly.nopref ? 'NO PREFIX' : global.fadly.prefa}\n`
            tmx += `• *Status:* ${global.fadly.mode.toUpperCase()}\n\n`
            arrayBot.push(global.fadly.user.jid)
            for (let i of conns){
                tmx += `• *Nomor:* @${i.user.jid.split("@")[0]}\n`
                tmx += `• *Prefix:* ${i.multi ? 'MULTI PREFIX' : i.nopref ? 'NO PREFIX' : i.prefa}\n`
                tmx += `• *Status:* ${i.mode.toUpperCase()}\n\n`
                arrayBot.push(i.user.jid)
            }
            tmx += `Total : ${conns.length + 1}`
            mentions(tmx, arrayBot, true)
            }
            break

        // Menu Owner
				case prefix+'listgc':case prefix+'listgroup':case prefix+'grouplist':ini_txt = fadly.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`${getName(v.jid)}\n${v.jid} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
					reply(`*LIST GROUP DI BOT INI:*\n${ini_txt}`)
					break
case prefix+'setfakegam':if (!isOwner && !ben.key.fromMe) return fadly.sendMessage(from, `*Maaf @${sender.split('@')[0]} Perintah ${prefix}${command} tidak ada di list ${prefix}menu!*`, text, { contextInfo: {mentionedJid: [sender]}, quoted: msg})
		            msg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: setgrup } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": fake, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 500, "width": 500, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": setthumb, "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==" } } } 
					fadly.sendMessage(from, `*Berhasil ubah Fake reply menjadi ${command.split('fake')[1]}*`, text, {quoted: msg})
					break
        case prefix+'bc': case prefix+'broadcast':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Masukkan text`)
            let chiit = await fadly.chats.all()
            if (isImage || isQuotedImage) {
                let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadMediaMessage(encmedia)
                let butbc = [ { buttonId: '#menu', buttonText: { displayText: 'Menu' }, type: 1 }, { buttonId: '#author', buttonText: { displayText: 'Owner' }, type: 1 } ]
                for (let i of chiit){
                    sendButImage(i.jid, q, "BROADCAST", media, butbc)
                }
                reply(`Sukses`)
            } else if (isVideo || isQuotedVideo) {
                let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                let media = await fadly.downloadMediaMessage(encmedia)
                let butbc = [ { buttonId: '#menu', buttonText: { displayText: 'Menu' }, type: 1 }, { buttonId: '#author', buttonText: { displayText: 'Owner' }, type: 1 } ]
                for (let i of chiit){
                    sendButVideo(i.jid, q, "BROADCAST", media, butbc)
                }
                reply(`Sukses`)
            } else {
                let butbc = [ { buttonId: '#menu', buttonText: { displayText: 'Menu' }, type: 1 }, { buttonId: '#author', buttonText: { displayText: 'Owner' }, type: 1 } ]
                for (let i of chiit){
                    sendButMessage(i.jid, q, "BROADCAST", butbc)
                }
                reply(`Sukses`)
            }
            break
        case prefix+'bcsewa': {
            if (!isOwner) return reply(mess.OnlyOwner)
            if (!q) return reply("Masukkan teks")
            for (let i of sewa){
                await fadly.sendMessage(i.id, q, text)
                await sleep(3000) // delay 3 detik
            }
                reply(`Sukses bc ke ${sewa.length}`)
            }
            break
        case prefix+'join':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}join* link grup`)
            if (!isUrl(args[1]) && !args[1].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
            let code = args[1].replace('https://chat.whatsapp.com/', '')
            fadly.acceptInvite(code)
            .then((res) => reply('Success Join Group'))
            .catch((err) => reply('Error'))
            break
        case prefix+'exif': {
            if (!isOwner) return reply(mess.OnlyOwner)
            if (!q) return reply(`Contoh: ${command} ${ownerName}`)
            const namaPack = q.split('|')[0] ? q.split('|')[0] : q
            const authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            exif.create(namaPack, authorPack)
            await reply('Success Min')
            }
            break
        case prefix+'self': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            fadly.mode = 'self'
            reply('Berhasil berubah ke mode self')
            }
            break
        case prefix+'publik':
        case prefix+'public': {
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            fadly.mode = 'public'
            reply('Berhasil berubah ke mode public')
            }
            break
        case prefix+'setlogo':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (!isQuotedImage) return reply('Reply imagenya kak!')
            let messimagethumb = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
            let downiamgethumb = await fadly.downloadMediaMessage(messimagethumb)
            fs.unlinkSync(`${pathImg}`)
            await sleep(2000)
            fs.writeFileSync(`${pathImg}`, downiamgethumb)
            reply('Success')
            break
        case prefix+'setprefix':
            if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
            if (q === 'multi') {
                fadly.multi = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else if (q === 'nopref') {
                fadly.multi = false
                fadly.nopref = true
                reply(`Berhasil mengubah prefix ke ${q}`)
            } else {
                fadly.multi = false
                fadly.nopref = false
                fadly.prefa = `${q}`
                reply(`Berhasil mengubah prefix ke ${q}`)
            }
            break
        case prefix+'ban':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (mentioned.length !== 0) {
                for (let i = 0; i < mentioned.length; i++) {
                    addBanned(mentioned[0], args[2], ban)
                }
                reply('Sukses')
            } else if (isQuotedMsg) {
                if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa ban Owner`)
                addBanned(quotedMsg.sender, args[1], ban)
                reply(`Sukses ban target`)
            } else if (!isNaN(args[1])) {
                addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                reply('Sukses')
            } else {
                reply(`Kirim perintah ${prefix}ban @tag atau nomor atau reply pesan orang yang ingin di ban`)
            }
            break
        case prefix+'unban':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (mentioned.length !== 0) {
                for (let i = 0; i < mentioned.length; i++) {
                    unBanned(mentioned[i], ban)
                }
                reply('Sukses')
            }
            if (isQuotedMsg) {
                unBanned(quotedMsg.sender, ban)
                reply(`Sukses unban target`)
            } else if (!isNaN(args[1])) {
                unBanned(args[1] + '@s.whatsapp.net', ban)
                reply('Sukses')
            } else {
                reply(`Kirim perintah ${prefix}unban @tag atau nomor atau reply pesan orang yang ingin di unban`)
            }
            break
        case prefix+'addsewa':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addsewa* linkgc waktu`)
            let ceh = await fadly.cekInviteCode(args[1].replace('https://chat.whatsapp.com/', ''))
            if (ceh.status === 200) {
                fadly.acceptInvite(args[1].replace('https://chat.whatsapp.com/', ''))
                    .then((res) => {
                        _sewa.addSewaGroup(res.gid, args[2], sewa)
                        reply(`Success Add Sewa Group Berwaktu!`)
                    })
            } else {
                reply(`link salah`)
            }
            break
        case prefix+'delsewa':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* idgroup`)
            sewa.splice(_sewa.getSewaPosition(args[1], sewa), 1)
            fs.writeFileSync('./database/sewa.json', JSON.stringify(sewa, null, 3))
            reply(`Sukses lur`)
            break
        case prefix+'addprem':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${command}* @tag waktu\n*${command}* nomor waktu\n\nContoh:\n*${command}* @tag 30d\n*{command}* 62855xxx 30d`)
            if (mentioned.length !== 0) {
                _prem.addPremiumUser(mentioned[0], args[2], premium)
                reply('Sukses')
            } else {
                _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                reply('Sukses')
            }
            break
        case prefix+'delprem':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (args.length < 2) return reply(`Penggunaan :\n*${command}* @tag\n*${command}* nomor\n\nContoh:\n*${command}* @tag\n*${command}* 62855xxx`)
            if (mentioned.length !== 0) {
                for (let i = 0; i < mentioned.length; i++) {
                    premium.splice(_prem.getPremiumPosition(mentioned[i], premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                }
                reply('Sukses')
            } else {
                premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
            }
            break
        
        // Menu Other
				case prefix+'nsfwneko':
				  gatauda = (q)
					reply(mess.wait)
					 anu = await fetch(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=Tobzzz17`)
					buffer = await getBuffer(anu.result)
					fadly.sendMessage(from, buffer, image, { caption: `NSFW NEKO!`, quoted: msg })
					break
        case prefix+'listban':
            if (!isOwner) return reply(mess.OnlyOwner)
            let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
            let menx = [];
            for (let i of ban) {
                menx.push(i.id)
                txtx += `*ID :* @${i.id.split("@")[0]}\n`
                if (i.expired === 'PERMANENT') {
                    let cekvip = 'PERMANENT'
                    txtx += `*Expired :* PERMANENT\n\n`
                } else {
                    let cekvip = ms(i.expired - Date.now())
                    txtx += `*Expired :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
            }
            mentions(txtx, menx, true)
            break
        case prefix+'listsewa':
            if (!isOwner) return reply(mess.OnlyOwner)
            if (sewa.length === 0) return reply(`Database masih kosong`)
            let list_sewa_list = `*LIST-SEWA-GROUP*\n\n*Total:* ${sewa.length}\n\n`
            let data_array = [];
            for (let x of sewa) {
                data_array.push(await getAtminTag(x.id))
                list_sewa_list += `*Name:* ${await getGcName(x.id)}\n*ID:* ${x.id}\n*Expired:* ${ms(x.expired - Date.now()).days ? ms(x.expired - Date.now()).days : '-'} Days ${ms(x.expired - Date.now()).hours ? ms(x.expired - Date.now()).hours : '-'} Hours ${ms(x.expired - Date.now()).minutes ? ms(x.expired - Date.now()).minutes : '-'} Minutes\n${await getAtmin(x.id)}\n\n`
            }
            mentions(list_sewa_list.trim(), data_array[0], true)
            break
        case prefix+'cekprem': case prefix+'cekpremium':
            if (!isPremium) return reply(`Kamu bukan user premium, hubungi owner untuk membeli premium\n\nketik *.owner*`)
            let cekvipp = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
            let premiumnyaa = `*Expire :* ${cekvipp.days} day(s) ${cekvipp.hours} hour(s) ${cekvipp.minutes} minute(s)`
            reply(premiumnyaa)
            break
        case prefix+'listprem':
            let txt = `List Premium User\nJumlah : ${premium.length}\n\n`
            let men = [];
            for (let i of premium) {
                men.push(i.id)
                let cekvippp = ms(i.expired - Date.now())
                txt += `*ID :* @${i.id.split("@")[0]}\n*Expired :* ${cekvippp.days} day(s) ${cekvippp.hours} hour(s) ${cekvippp.minutes} minute(s) ${cekvippp.seconds} second(s)\n\n`
            }
            mentions(txt, men, true)
            break
        case prefix+'limit': case prefix+'ceklimit': case prefix+'balance': case prefix+'glimit':
            if (mentioned.length !== 0) {
                reply(`💳 Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : `${getLimit(mentioned[0], limitCount, limit)}/${limitCount}`}\n🕹️ Limit Game : ${cekGLimit(mentioned[0], gcount, glimit)}/${gcount}\n🏦 Balance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $100 balance`)
            } else {
                reply(`💳 Limit : ${isPremium ? 'Unlimited' : `${getLimit(sender, limitCount, limit)}/${limitCount}`}\n🕹️ Limit Game : ${cekGLimit(mentioned[0], gcount, glimit)}/${gcount}\n🏦 Balance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit *jumlah* dan ${prefix}buyglimit *jumlah* untuk membeli game limit\n\n*Example :*\n${prefix}buylimit 1\n${prefix}buyglimit 1\n\n*Note :*\n• Harga 1 limit = $100 balance`)
            }
            break
        case prefix+'buylimit': {
            if (global.fadly.user.jid !== fadly.user.jid) return reply('Tidak melakukan command ini di dalam bot!\n\nhttps://wa.me/' + global.fadly.user.jid.split`@`[0] + `?text=${command}`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nContoh : ${command} 5\n\nHarga 1 limit = $50 balance`)
            if (args[1].includes('-')) return reply(body.replace(args[1], "*" + args[1] + "*") + '\n\n' + 'Jangan menggunakan -' + `\nContoh : ${command} 5`)
            if (isNaN(args[1])) return reply(body.replace(args[1], "*" + args[1] + "*") + '\n\n' + 'Pembelian limit harus berupa angka' + `\nContoh : ${command} 5`)
            let ane = Number(nebal(args[1]) * 100)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            kurangBalance(sender, ane, balance)
            giveLimit(sender, nebal(args[1]), limit)
            reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
            break
        case prefix+'buygamelimit': case prefix+'buyglimit': {
            if (global.fadly.user.jid !== fadly.user.jid) return reply('Tidak melakukan command ini di dalam bot!\n\nhttps://wa.me/' + global.fadly.user.jid.split`@`[0] + `?text=${command}`)
            if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nContoh : ${command} 5\n\nHarga 1 limit = $100 balance`)
            if (args[1].includes('-')) return reply(body.replace(args[1], "*" + args[1] + "*") + '\n\n' + 'Jangan menggunakan -' + `\nContoh : ${command} 5`)
            if (isNaN(args[1])) return reply(body.replace(args[1], "*" + args[1] + "*") + '\n\n' + 'Pembelian limit harus berupa angka' + `\nContoh : ${command} 5`)
            let ane = Number(nebal(args[1]) * 100)
            if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            kurangBalance(sender, ane, balance)
            givegame(sender, nebal(args[1]), glimit)
            reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
            break
        case prefix+'transfer': case prefix+'tf':{
            if (global.fadly.user.jid !== fadly.user.jid) return reply('Tidak melakukan command ini di dalam bot!\n\nhttps://wa.me/' + global.fadly.user.jid.split`@`[0] + `?text=${command}`)
            if (args.length < 2) return mentions(`Kirim perintah *${command}* @tag nominal balance yang ingin di transfer\n\nContoh : ${command} @${Verified.split("@")[0]} 1000`, [Verified], true)
            if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
            if (!args[2]) return reply(`Masukkan nominal nya!`)
            if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
            if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
            var anu = getBalance(sender, balance)
            if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            kurangBalance(sender, parseInt(args[2]), balance)
            addBalance(mentioned[0], parseInt(args[2]), balance)
            fadly.sendMessage(from, `Success transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`, text, { quoted: msg, contextInfo: { mentionedJid: [mentioned[0]] } })
            }
            break
/*case prefix+'shopee':
  if (!isGroup) return reply(mess.OnlyGrup)
                    if (!q) return reply(`Contoh: ${command} tas gendong`)
                    query = args.join(q)
                    anu = await axios.get(`https://api.lolhuman.xyz/api/shopee?apikey=${apikeys}&query=${q}`)
                    anu = anu.data.result
                    ini_txt = 'Shopee Search : \n'
                    for (var x of anu) {
                        ini_txt += `Name : ${x.name}\n`
                        ini_txt += `Terjual : ${x.sold}\n`
                        ini_txt += `Stock : ${x.stock}\n`
                        ini_txt += `Lokasi : ${x.shop_loc}\n`
                        ini_txt += `Link : ${x.link_produk}\n\n`
                    }
                    reply(ini_txt)
                    break*/

}
    } catch (err) {
        console.log(color('[ ERROR ]', 'red'), err)
    }
}
