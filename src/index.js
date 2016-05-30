
'use strict'

// re-ES5-ing code

var express = require('express'); 
var proxy = require('express-http-proxy');
var bodyParser = require('body-parser');
var _ = require('lodash');
var config = require('./config');
var commands = require('./commands');
var helpCommand = require('./commands/help');

var bot = require('./bot');

var app = express();

// proxy troubleshooting
if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: function (req, res) { 
      return require('url').parse(req.url).path; 
    }
  }));
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => { 

  res.send('\n  ¯\\_(ツ)_/¯ 👋 🌍 \n') 

});




app.post('/commands/tictactoe', (req, res) => {
  var payload = req.body

  if (!payload || payload.token !== config('STARBOT_COMMAND_TOKEN')) {
    var err = '✋  My Star—what? An invalid slash token was provided\n' +
              '   Is your Slack slash token correctly configured?'
    console.log(err)
    res.status(401).end(err)
    return
  }

  var cmd = _.reduce(commands, (accumulator, command) => {
    return payload.text.match(command.pattern) ? command : accumulator
  }, helpCommand)

  cmd.handler(payload, res)
})

app.listen(config('PORT'), (err) => {
  if (err) throw err

  console.log(`\n🎮 💈 MyStarbot LIVES on PORT ${config('PORT')} 💈 🎮`)

  if (config('SLACK_TOKEN')) {
    console.log(`💈  beep boop: @starbot is real-time\n`)
    bot.listen({ token: config('SLACK_TOKEN') })
  }
})
