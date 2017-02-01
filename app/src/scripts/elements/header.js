const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div class="header">
      Wynik: <strong>${ state.app.result }</strong>
      Jesteś: <strong>${ state.app.user }</strong>
      Podaj login: <input type="text" oninput=${update}/>
      <button onclick=${nextTask}>Nastepne zadanie</button>
    </div>
  `
  function update (e) {
    send('app:setLogin', e.target.value)
  }

  function nextTask () {
    send('app:reset')
  }
}