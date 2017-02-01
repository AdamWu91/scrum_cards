const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div class="header">
      Wynik: <strong>${ state.app.result }</strong>
      Jesteś: <strong>${ state.auth.nick }</strong>
      <button onclick=${nextTask}>Nastepne zadanie</button>
    </div>
  `
  function nextTask() {
    send('app:reset')
  }
}