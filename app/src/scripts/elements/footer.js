const html = require('choo/html')

module.exports = function (state, prev, send) {
  return html`
    <div class="footer">
      Lista uczestników: <strong>${ getUsers() }</strong>
    </div>
  `
  function getUsers() {
    let users = []
    for( let id in state.users.list) {
      let user = state.users.list[id]
      users.push(
        html`
          <strong>
            ${ state.auth.nick !== user ? user : '' }
          </strong>
        `
      )
    }
    return users
    
  }
}