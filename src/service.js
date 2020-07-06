const stompit = require('stompit')

const service = {
  connectOptions: {
    host: 'localhost',
    port: 61613,
    ssl: false,
    timeout: 30000,
    connectHeaders: {
      host: 'localhost',
      'heart-beat': '1000,2000',
    },
  },

  init() {
    this.manager = new stompit.ConnectFailover([this.connectOptions], {
      maxReconnects: 10,
    })
    return this
  },

  subscribe({ destination, onMessage }) {
    this.manager.connect(function(error, client, reconnect) {
      if (error) {
        // console.log('connect error ' + error.message)
        reconnect()
        // return
      }

      client.on('error', function(error) {
        console.error('This is error', error)
        reconnect()
      })

      client.on('connecting', function(connector) {
        console.log('Could not connect to ' + connector)
      })

      const subscribeHeaders = {
        timeout: 30000,
        destination,
        ack: 'client',
        heartbeat: [5000, 5000],
      }

      client.subscribe(subscribeHeaders, function(error, message) {
        if (error) {
          console.log('subscribe error ' + error.message)
          return
        }

        message.readString('utf-8', function(error, body) {
          if (error) {
            console.log('read message error ' + error.message)
            return
          }
          onMessage({ error, body, client, message })
        })
      })
    })
  },
}

module.exports = service
