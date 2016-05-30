
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

  // to have access to payload need to log here
  console.log("I am in the show command, presumably I run logic here? \n payload:", payload)
// there will be a function here for going from the game state to creating
// a string that can be displayed

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

console.log("before sending msg", msg);

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /show/ig, handler: handler }
