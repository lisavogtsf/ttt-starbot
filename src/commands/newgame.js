
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToe',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {

	console.log("needs to accept payload with challenger name and validate that. payload:", payload);

  // check if a game is already being played, create error message

  // check if there is a valid username being challenged, are they in this same channel? create error message

  // if all ok, create a newgame, pass in username/ids?


let attachments = [
  {
    title: 'Tic Tac Toe Help',
    color: '#777777',
    text: '`/tic help` ... shows all available commands \n',
    mrkdwn_in: ['text']
  }
]

console.log("attachments BEFORE shift", attachments);

attachments.shift({
    title: 'ADDED VIA SHIFT',
    color: '#2FA44F',
    text: '`/tic newgame @username` challenges username to newgame ',
    mrkdwn_in: ['text']
  });

console.log("attachments after shift", attachments);

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

console.log("before sending msg", msg);

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /newgame/ig, handler: handler }
