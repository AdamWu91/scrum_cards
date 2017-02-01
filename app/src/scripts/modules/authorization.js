import { setNick, logIn } from '../apis/account'
import { updateUsersBySocket } from '../apis/socket'

module.exports = {
  namespace: 'auth',
  state: { 
    title: 'Podaj nick',
    nick: ''
  },
  reducers: {
    logIn: logIn,
    setNick: setNick
  },
  subscriptions: {
  	'updateUsersBySocket': updateUsersBySocket
  }
}