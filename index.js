/**
 * To test the plugin
 * - install the plugin (for example with npm link)
 * - activate the plugin
 * - add an UDP NMEA0183 connection to the server
 * - send data via udp
 *     echo '$WIXDR,C,018.0,C,,*5B' | nc -u -w 0 127.0.0.1 7777
 */
const {description, name} = require('./package.json')

 module.exports = function (app) {
    const plugin = {
      id: name,
      name: 'LCJ Capteurs XDR Parser',
      description
    }
  
    plugin.start = function () {
      app.emitPropertyValue('nmea0183sentenceParser', {
        sentence: 'XDR',
        parser: ({ id, sentence, parts, tags }, session) => {
          return {
            updates: [
              {
                values: [
                  { path: 'environment.outside.temperature', value: Number(parts[1]) + 273.15}
                ]
              }
            ]
          }
        }
      })
    }
  
    plugin.stop = function () { }
    plugin.schema = {}
    return plugin
  }