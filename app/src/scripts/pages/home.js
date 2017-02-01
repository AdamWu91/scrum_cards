const cards = require('../elements/cards')
const header = require('../elements/header')
const footer = require('../elements/footer')
const html = require('choo/html')

module.exports = function (state, prev, send) {
	checkAuth()
  return html`
    <main>
      ${ header(state, prev, send) }
      ${ cards(state, prev, send) }
      ${ footer(state, prev, send) }
    </main>
  `
  function checkAuth() {
  	if (!state.auth.nick) {
  		send('location:set', '/')
  	}
  }
}