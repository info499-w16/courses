import {default as dgram} from 'dgram'
import {default as uuid} from 'uuid'

const REGISTRATION_PORT = process.env.REGISTRATION_PORT || 8888
const HEART_RATE = process.env.REGISTRATION_PORT || 1000 * 30

const NAME = 'courses'
const VERSION = '0.0.1'

const client = dgram.createSocket('udp4')
export default function heartbeat () {
  client.bind(REGISTRATION_PORT, () => {
    client.setBroadcast(true)

    const instanceData = JSON.stringify({
      name: NAME,
      version: VERSION,
      id: uuid.v4()
    })

    function sendRegistrationData () {
      client.send(instanceData, 0, instanceData.length, REGISTRATION_PORT, '255.255.255.255', (err) => {
        if (err) throw err
      })
    }

    sendRegistrationData()
    setInterval(sendRegistrationData, HEART_RATE)
  })
}
