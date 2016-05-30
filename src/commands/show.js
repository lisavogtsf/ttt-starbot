
'use strict'

const _ = require('lodash')
const config = require('../config')

console.log("I am in the show command, presumably I run logic here?")

const msgDefaults = {
  response_type: 'in_channel',
  username: 'TicTacToe',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'One day you will be able to play a game of tictactoe',
    color: '#2FA44F',
    text: '`/tic show` shows the state of the game ❌ ⭕ ✖️ ',
    mrkdwn_in: ['text']
  },
  {
    text: '❌ ⭕ ✖️ \n ❌ ⭕ ❌\n ⭕❌ ⭕\n',
    mrkdwn_in: ['text']
  },
  {
    text: 'Player 1: <name> ❌',
    mrkdwn_in: ['text']
  },
  {
    text: 'Player 2: <name> ⭕',
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
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /show/ig, handler: handler }
