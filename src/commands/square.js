
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
    text: '`/tic newgame @username` challenges username to newgame \n`/tic show` shows the state of the game \n`/tic square 7` makes a move in square 7 (if it\'s your turn) \n`/tic quit` ends the game',
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

  console.log("square needs to accept a payload, test for valid player, square then also run show? \n payload: ", payload);

  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: [
  {
    title: 'One day you will be able to play a game of tictactoe',
    color: '#2FA44F',
    text: '`/tic newgame @username` challenges username to newgame \n`/tic show` shows the state of the game \n`/tic square 7` makes a move in square 7 (if it\'s your turn) \n`/tic quit` ends the game',
    mrkdwn_in: ['text']
  },
  {
    title: 'Tic Tac Toe Help',
    color: '#777777',
    text: '`/tic help` ... shows all available commands \n',
    mrkdwn_in: ['text']
  }
]
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /square/ig, handler: handler }
