module.exports = async (baby, chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance) => {
    try {
        let room = Object.values(tictactoe).find(room => room.id && room.game && room.state && room.id && [room.game.playerX, room.game.playerO].includes(sender) && room.state == 'PLAYING')
        if (room) {
            if (sender != room.game.turn || isNaN(chats)) return
            chats = Number(chats)
            if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(chats)) {
                if (room.game.cekIsi(chats)) return reply("Nomor tersebut telah diisi")
                await room.game.isi(sender, chats)
                room.last_activity = Date.now()
                const menang = room.game.isWin()
                const seri = room.game.KeisiSemua()
                let str = `*Tic Tac Toe*

Room ID : ${room.id}

${room.game.ttt[0]}${room.game.ttt[1]}${room.game.ttt[2]}
${room.game.ttt[3]}${room.game.ttt[4]}${room.game.ttt[5]}
${room.game.ttt[6]}${room.game.ttt[7]}${room.game.ttt[8]}

❌: @${room.game.playerX.split('@')[0]}
⭕: @${room.game.playerO.split('@')[0]}

${menang ? '@' + sender.split("@")[0] + ' Menang, Hadiah $' + "100" : seri ? 'Pertandingan seri' : `Giliran @${room.game.turn.split("@")[0]}`}`
                let lawan = from == room.x ? room.o : room.x
                if (room.x !== room.o) baby.sendMessage(lawan, str, "extendedTextMessage", {
                    contextInfo: {
                        mentionedJid: [room.game.playerX, room.game.playerO]
                    }
                })
                baby.sendMessage(from, str, "extendedTextMessage", {
                    contextInfo: {
                        mentionedJid: [room.game.playerX, room.game.playerO]
                    }
                })
                if (menang || seri) {
                    if (menang) {
                        addBalance(sender, 100, balance)
                    }
                    delete tictactoe[room.id]
                }
            }
        }

    } catch (e) { console.log("TicTacToe Error :", e)}
}
