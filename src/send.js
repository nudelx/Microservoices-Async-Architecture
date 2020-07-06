#!/usr/bin/env node
const stompit = require('stompit')
const fs = require('fs')
const argv = require('yargs')
  .usage(
    `$0 Usage: <filename> -q "/test/test" -m 'message' -h localhost 
    
    -h    [host/ip] 
    -q    [queue] 
    -m    [message] 
    -p    [port| default: 61613] 
    -u    [user] 
    -t    [type]
    -v    [verbose]
    --pass [password]
    --readfile [boolean]
    --ssl [boolean]`
  )
  .string('h')
  .options({
    ssl: {
      describe: 'use ssl',
    },
  })
  .demandOption(['q', 'm', 'h']).argv

const getContent = (argv) => {
  if (argv.readfile) return fs.readFileSync(argv.m, 'utf8')
  return typeof argv.m === 'string' ? argv.m : JSON.stringify(argv.m)
}

if (argv.v) console.log('argument', argv)
const header = {
  host: argv.h,
  port: argv.p || 61613,
  ssl: !!argv.ssl,
  connectHeaders: {
    'heart-beat': '1000,2000',
    host: argv.h,
    login: argv.u,
    passcode: argv.pass,
  },
}
if (argv.v) console.log('HEADERS', header)

stompit.connect(header, (err, client) => {
  if (err) console.log(err)
  const frame = client.send({
    destination: argv.q,
    messageType: argv.t,
    persistent: true,
  })
  frame.write(getContent(argv))
  frame.end()
  client.disconnect()
  console.log(' 📧  message sent !')
})
