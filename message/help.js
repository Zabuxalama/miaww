exports.menu = (ucapanWaktu, sender, pushname, mundur, ownerName, botName, tanggal, jam, runtime, isOwner, isPremium, sisalimit, limitCount, sisaGlimit, gcount, expired, prefix) => {
    return `${ucapanWaktu} @${sender.split("@")[0]}
    
 • Hitung Mundur Idul Adha
${mundur}

👑 Creator : ${ownerName}
🤖 Bot Name : ${botName}
📆 Tanggal : ${tanggal}
⌚ Jam : ${jam}
⏳ Runtime : ${runtime(process.uptime())}

*USER INFO*

*‣ Name : ${pushname}*
*‣ Status : ${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Gratisan'}*
*‣ Limit : ${isPremium ? 'Unlimited' : `${sisalimit}/${limitCount}`}*
*‣ Limit Game : ${isOwner ? 'Unlimited' : `${sisaGlimit}/${gcount}`}*
*‣ Expired Prem : ${isOwner ? '-' : isPremium ? expired : 'Not Premium'}*

*LIST MENU BOT*

❏ ${prefix}menusimple
❏ ${prefix}menusticker
❏ ${prefix}menugabut
❏ ${prefix}menugroup
❏ ${prefix}menusistem
❏ ${prefix}menustore
❏ ${prefix}menudownload
❏ ${prefix}menugame
❏ ${prefix}menurandom
❏ ${prefix}menutextpro
❏ ${prefix}menuphotooxy
❏ ${prefix}menusearch
❏ ${prefix}menujadibot
❏ ${prefix}menuowner
❏ ${prefix}menuother
`
}

exports.simpleMenu = (prefix) => {
    return `
❏ ${prefix}sticker
❏ ${prefix}attp
❏ ${prefix}nulis
❏ ${prefix}miaw < hi >
❏ ${prefix}hartatahta
`
}

exports.stickerMenu = (prefix) => {
    return `
❏ ${prefix}sticker
❏ ${prefix}swm
❏ ${prefix}attp
❏ ${prefix}pentol
❏ ${prefix}toimg
`
}

exports.gabutMenu = (prefix) => {
    return `
❏ ${prefix}apakah
❏ ${prefix}kapankah
❏ ${prefix}bisakah
❏ ${prefix}hobby
❏ ${prefix}rate
❏ ${prefix}truth
❏ ${prefix}dare
❏ ${prefix}cekbapak
❏ ${prefix}seberapagay
❏ ${prefix}jadian
❏ ${prefix}ganteng
❏ ${prefix}cantik
`
}

exports.groupMenu = (prefix) => {
    return `
❏ ${prefix}afk
❏ ${prefix}add
❏ ${prefix}kick
❏ ${prefix}welcome
❏ ${prefix}left
❏ ${prefix}setwelcome
❏ ${prefix}changewelcome
❏ ${prefix}delsetwelcome
❏ ${prefix}setleft
❏ ${prefix}changeleft
❏ ${prefix}delsetleft
❏ ${prefix}linkgc
❏ ${prefix}mute
❏ ${prefix}unmute
❏ ${prefix}hidetag
❏ ${prefix}tagall
❏ ${prefix}open
❏ ${prefix}close
❏ ${prefix}checksewa
❏ ${prefix}nobadword 1 / 0
❏ ${prefix}addbadword
❏ ${prefix}delbadword
❏ ${prefix}listbadword
❏ ${prefix}listadmin
`
}

exports.sistemMenu = (prefix) => {
    return `
❏ ${prefix}antilink
❏ ${prefix}antiwame
❏ ${prefix}antiyt
❏ ${prefix}antitele
❏ ${prefix}antibitly
❏ ${prefix}setcmd
❏ ${prefix}delcmd
`
}

exports.storeMenu = (prefix) => {
    return `
❏ ${prefix}list
❏ ${prefix}addlist
❏ ${prefix}dellist
❏ ${prefix}update
❏ ${prefix}jeda
❏ ${prefix}tambah
❏ ${prefix}kurang
❏ ${prefix}kali
❏ ${prefix}bagi
❏ proses < reply chat >
❏ done < reply chat >
`
}

exports.downloadMenu = (prefix) => {
    return `
❏ ${prefix}instagram
❏ ${prefix}youtube
❏ ${prefix}tiktok
`
}

exports.gameMenu = (prefix) => {
    return `
❏ ${prefix}tebakgambar
❏ ${prefix}family100
❏ ${prefix}tictactoe
❏ ${prefix}suit
❏ ${prefix}akinator
❏ ${prefix}topglobal
❏ ${prefix}toplocal
`
}

exports.randomMenu = (prefix) => {
    return `
❏ ${prefix}asupan
❏ ${prefix}couple
❏ ${prefix}meme
❏ ${prefix}waifu
❏ ${prefix}gachacewek
❏ ${prefix}gachacowok
❏ ${prefix}quotes
❏ ${prefix}bucin
❏ ${prefix}pantun
❏ ${prefix}katabijak
❏ ${prefix}faktaunik
`
}

exports.textproMenu = (prefix) => {
    return `
❏ ${prefix}blackpink
❏ ${prefix}neon
❏ ${prefix}greenneon
❏ ${prefix}advanceglow
❏ ${prefix}futureneon
❏ ${prefix}sandwriting
❏ ${prefix}sandsummer
❏ ${prefix}sandengraved
❏ ${prefix}metaldark
❏ ${prefix}neonlight
❏ ${prefix}holographic
❏ ${prefix}text1917
❏ ${prefix}minion
❏ ${prefix}deluxesilver
❏ ${prefix}newyearcard
❏ ${prefix}bloodfrosted
❏ ${prefix}halloween
❏ ${prefix}jokerlogo
❏ ${prefix}fireworksparkle
❏ ${prefix}natureleaves
❏ ${prefix}bokeh
❏ ${prefix}toxic
❏ ${prefix}strawberry
❏ ${prefix}box3d
❏ ${prefix}roadwarning
❏ ${prefix}breakwall
❏ ${prefix}icecold
❏ ${prefix}luxury
❏ ${prefix}cloud
❏ ${prefix}summersand
❏ ${prefix}horrorblood
❏ ${prefix}thunder
❏ ${prefix}pornhub
❏ ${prefix}glitch
❏ ${prefix}avenger
❏ ${prefix}space
❏ ${prefix}ninjalogo
❏ ${prefix}marvelstudio
❏ ${prefix}lionlogo
❏ ${prefix}wolflogo
❏ ${prefix}steel3d
❏ ${prefix}wallgravity
`
}

exports.photooxyMenu = (prefix) => {
    return `
❏ ${prefix}shadow
❏ ${prefix}cup
❏ ${prefix}cup1
❏ ${prefix}romance
❏ ${prefix}smoke
❏ ${prefix}burnpaper
❏ ${prefix}lovemessage
❏ ${prefix}undergrass
❏ ${prefix}love
❏ ${prefix}coffe
❏ ${prefix}woodheart
❏ ${prefix}woodenboard
❏ ${prefix}summer3d
❏ ${prefix}wolfmetal
❏ ${prefix}nature3d
❏ ${prefix}underwater
❏ ${prefix}golderrose
❏ ${prefix}summernature
❏ ${prefix}letterleaves
❏ ${prefix}glowingneon
❏ ${prefix}fallleaves
❏ ${prefix}flamming
❏ ${prefix}harrypotter
❏ ${prefix}carvedwood
❏ ${prefix}arcade8bit
❏ ${prefix}battlefield4
❏ ${prefix}pubg
`
}

exports.searchMenu = (prefix) => {
    return `
❏ ${prefix}nickff 
❏ ${prefix}nickml
❏ ${prefix}nickpubg
❏ ${prefix}nickdomino
`
}

exports.jadibotMenu = (prefix) => {
    return `
❏ ${prefix}jadibot
❏ ${prefix}stopjadibot
❏ ${prefix}getcode
❏ ${prefix}listbot
`
}

exports.ownerMenu = (prefix) => {
    return `
❏ ${prefix}bc
❏ ${prefix}bcsewa
❏ ${prefix}join
❏ ${prefix}exif
❏ ${prefix}self
❏ ${prefix}public
❏ ${prefix}setlogo
❏ ${prefix}setprefix
❏ ${prefix}ban
❏ ${prefix}unban
❏ ${prefix}addsewa
❏ ${prefix}delsewa
❏ ${prefix}addprem
❏ ${prefix}delprem
❏ ${prefix}listgc
❏ ${prefix}addvn (masukkan namanya)
❏ ${prefix}listvn
❏ ${prefix}vn (nama vn nya)
❏ ${prefix}delvn (masukkan namanya)
`
}

exports.otherMenu = (prefix) => {
    return `
❏ ${prefix}listban
❏ ${prefix}listsewa
❏ ${prefix}cekprem
❏ ${prefix}listprem
❏ ${prefix}limit
❏ ${prefix}balance
❏ ${prefix}buylimit
❏ ${prefix}buyglimit
❏ ${prefix}transfer
`
}
