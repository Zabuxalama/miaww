exports.wait = () => {
	return`ℙ𝔼ℝ𝕄𝕀ℕ𝕋𝔸𝔸ℕ 𝕂𝔸𝕄𝕌 𝕊𝔼𝔻𝔸ℕ𝔾 𝕊𝔸𝕐𝔸 ℙℝ𝕆𝕊𝔼𝕊 ツ`
}

exports.succes = () => {
	return`*「 SUCCES 」*`
}

exports.lvlon = () => {
	return`*「 ENABLE 」 LEVELING*`
}

exports.lvloff = () => {
	return`*「 DISABLE 」 LEVELING*`
}

exports.lvlnul = () => {
	return`*LEVELMU MASIH KOSONG*`
}

exports.lvlnoon = () => {
	return`*LEVEL DI GRUB BELUM DI AKTIFKAN*`
}

exports.noregis = () => {
	return`━▣━◤BELUM TERDAFTAR ;(◢━▣━━\n\n*Cara daftar ${prefix}daftar nama|umur* \n*contoh ${prefix}daftar ${pushname}|18*`
}

exports.rediregis = () => {
	return`━▣━◤SUDAH TERDAFTAR :)◢━▣━━\n\n*Kamu sudah terdaftar*`
}

exports.stikga = () => {
	return`*Yah gagal coba ulangi beberapa saat lagi*`
}

exports.linkga = () => {
	return`*Maaf link tidak valid*`
}

exports.groupo = () => {
	return`𝔽𝕀𝕋𝕌ℝ 𝕀ℕ𝕀 ℍ𝔸ℕ𝕐𝔸 𝔹𝕀𝕊𝔸 𝔻𝕀 𝔾𝕌ℕ𝔸𝕂𝔸ℕ 𝔻𝕀 𝔻𝔸𝕃𝔸𝕄 𝔾ℝ𝕌ℙ `
}

exports.ownerb = () => {
	return`𝔽𝕀𝕋𝕌ℝ 𝕀ℕ𝕀 ℍ𝔸ℕ𝕐𝔸 𝔹𝕀𝕊𝔸 𝔻𝕀 𝔾𝕌ℕ𝔸𝕂𝔸ℕ 𝕆𝕃𝔼ℍ 𝕆𝕎ℕ𝔼ℝ 𝔹𝕆𝕋`
}

exports.ownerg = () => {
	return`𝔽𝕀𝕋𝕌ℝ 𝕀ℕ𝕀 ℍ𝔸ℕ𝕐𝔸 𝔹𝕀𝕊𝔸 𝔻𝕀 𝔾𝕌ℕ𝔸𝕂𝔸ℕ 𝕆𝕃𝔼ℍ 𝕆𝕎ℕ𝔼ℝ 𝕂𝔼𝕋𝕀𝕂𝔸 𝔻𝕀 𝔾ℝ𝕌ℙ`
}

exports.admin = () => {
	return`𝔽𝕀𝕋𝕌ℝ 𝕀ℕ𝕀 ℍ𝔸ℕ𝕐𝔸 𝔹𝕀𝕊𝔸 𝔻𝕀 𝔾𝕌ℕ𝔸𝕂𝔸ℕ 𝕆𝕃𝔼ℍ 𝔸𝔻𝕄𝕀ℕ 𝔾ℝ𝕌ℙ`
}

exports.badmin = () => {
	return`𝔽𝕀𝕋𝕌ℝ 𝕀ℕ𝕀 ℍ𝔸ℕ𝕐𝔸 𝔹𝕀𝕊𝔸 𝔻𝕀 𝔾𝕌ℕ𝔸𝕂𝔸ℕ 𝕂𝔼𝕋𝕀𝕂𝔸 𝔹𝕆𝕋 𝕄𝔼ℕ𝕁𝔸𝔻𝕀 𝔸𝔻𝕄𝕀ℕ`
}

exports.nsfwoff = () => {
	return`ℕ𝕊𝔽𝕎 𝔹𝔼𝕃𝕌𝕄 𝔻𝕀 𝔸𝕂𝕋𝕀𝔽𝕂𝔸ℕ`
}

exports.bug = () => {
	return`𝕄𝔸𝕊𝔸𝕃𝔸ℍ 𝕋𝔼𝕃𝔸ℍ 𝔻𝕀𝕃𝔸ℙ𝕆ℝ𝕂𝔸ℕ 𝕂𝔼 𝕆𝕎ℕ𝔼ℝ .𝕋𝕌ℕ𝔾𝔾𝕌 𝕆𝕎ℕ𝔼ℝ 𝕄𝔼ℕ𝔸ℕ𝔾𝔾𝔸ℙ𝕀 ℕ𝕐𝔸`
}

exports.wrongf = () => {
	return`*Format salah/text kosong*`
}

exports.clears = () => {
	return`*Clear all Success*`
}

exports.pc = () => {
	return`*「 REGISTRASI 」*\n\nUntuk mengetahui apa kamu sudah terdaftar silahkah check message yang saya kirim \n\nNOTE:\n*Jika kamu belum mendapatkan pesan. berarti kamu belum menyimpan nomer bot*`
}

exports.registered = (namaUser, umurUser, serialUser, time, sender) => {
	return`▣◤PENDAFTARAN SUKSES◢▣\n\n➳ *NAMA* : ${namaUser}\n➳ *NOMER* : wa.me/${sender.split("@")[0]}\n➳ *UMUR* : ${umurUser}\n*TERIMA KASIH SUDAH MENDAFTAR* >3\n━━▣━━◤THANKS◢━━▣━━━`
}

exports.cmdnf = (prefix, command) => {
	return`command *${prefix}${command}* tidak di temukan\coba tulis *${prefix}menu*`
}

exports.owneresce = (pushname) => {
	return`*Maaf tapi ${pushname} bukan owner script*`
}

exports.reglevelaha = (command, pushname, getLevelingLevel, sender, aha) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${aha}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.reglevelahb = (command, pushname, getLevelingLevel, sender, ahb) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${ahb}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.reglevelahc = (command, pushname, getLevelingLevel, sender, ahc) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${ahc}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.reglevelahd = (command, pushname, getLevelingLevel, sender, ahd) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${ahd}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.reglevelahe = (command, pushname, getLevelingLevel, sender, ahe) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${ahe}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.reglevelahf = (command, pushname, getLevelingLevel, sender, ahf) => {
	return`*Maaf ${pushname} level mu belum mencukupi*\n\n*┏⊱level mu : ${getLevelingLevel(sender)}*\n*┣⊱jenis command : ${command}*\n*┗⊱syarat level : ${ahf}*\n\n_NOTE : CHAT/SELALU ON UNTUK MENDAPATKAN XP_`
}

exports.menu = (pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku, role) => { 
	return `
`
}

exports.levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel, role) => {
	return`
*「 SELAMAT 」*
 📊➤ Nama : ${pushname}
 📊➤ Nomer : ${sender.split("@")[0]}
 📊➤ Xp : ${getLevelingXp(sender)}
 📊➤ Limit :  +3
 📊➤ Pangkat :  ${role}
 📊➤ Level : ${getLevel} ⊱ ${getLevelingLevel(sender)}
`}
 
exports.limitend = (pushname) => {
	return`*Maaf ${pushname} limit hari ini habis*\n*Hubungi kami* : wa.me/6283146208804\n\n*Note : Kami akan berikan random dari 1-10*`
}

exports.limitcount = (limitCounts) => {
	return`
*「 LIMIT COUNT 」*
sisa limit anda : ${limitCounts}

NOTE : Untuk mendapatkan limit. Bisa lewat naik level melalui group atau buylimit.
`}

exports.satukos = () => {
	return`*Tambah parameter 1/enable atau 0/disable`
}

exports.uangkau = (pushname, sender, uangkau) => {
	return`◪ *「 ATM 」*\n  ├─ ❏ *Name* : ${pushname}\n  ├─ ❏ *Nomor* : ${sender.split("@")[0]}\n  └─ ❏ *Uang* : ${uangkau}
`}
