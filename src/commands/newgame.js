
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToe',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'One day you will be able to play a game of tictactoe',
    color: '#2FA44F',
    text: '`/tic newgame @username` challenges username to newgame ',
    mrkdwn_in: ['text']
  },
  {
    title: 'Tic Tac Toe Help',
    color: '#777777',
    text: '`/tic help` ... shows all available commands \n',
    mrkdwn_in: ['text']
  }
]

const handler = (payload, res) => {

	console.log("needs to accept payload with challenger name and validate that. payload:", payload);

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /newgame/ig, handler: handler }
