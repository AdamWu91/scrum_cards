const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <main>
       Podaj login: <input type="text" oninput=${update}/>
       <button onclick=${logIn}>Zaloguj</button>
    </main>
  `
  function logIn() {
  	if (state.auth.nick.length > 0) {
  		send('auth:logIn', state.auth.nick)
  		send('location:set', '/cards')
  	} 
	}

	function update(e) {
	  send('auth:setNick', e.target.value)
	}
}