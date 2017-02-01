import { updateUsersBySocket } from '../apis/socket'

module.exports = {
  namespace: 'users',
  state: { 
    list: {}
  },
  reducers: {
  	update: (state, data) => {
  		state.list = data
  		return {
		    list: state.list
		  }
		}
  },
  subscriptions: {
  	'updateUsersBySocket': updateUsersBySocket
  }
}