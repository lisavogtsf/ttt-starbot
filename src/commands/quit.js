
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
    title: 'You have now quit your game of tictactoe',
    color: 'danger',
    text: '`/tic quit` ends the game',
    footer: "Thank you for playing Tic Tac Toe",
    footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
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

module.exports = { pattern: /quit/ig, handler: handler }
