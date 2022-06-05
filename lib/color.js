const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const markLog = (text, color) => {
	return !color ? chalk.yellow('[ FADLY ID ] ') + chalk.green(text) : chalk.yellow('[ FADLY ID ] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
	markLog
}
