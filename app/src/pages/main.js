const cards = require('../elements/cards')
const header = require('../elements/header')
const html = require('choo/html')
const socket = io()

module.exports = function (state, prev, send) {
  return html`
    <main>
      ${ header(state, prev, send) }
      ${ cards(state, prev, send) }
    </main>
  `
}