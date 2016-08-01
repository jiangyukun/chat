
import AppDispatcher from '../dispatcher/AppDispatcher'
import ChatConstants from '../constants/ChatConstants'


var chatActions = {

	login: function (username, password, success, error) {
		AppDispatcher.dispatch({
			actionType: ChatConstants.LOGIN, username, password, success, error
		})
	},

	sendMessage: function (to, textMessage) {
		AppDispatcher.dispatch({
			actionType: ChatConstants.SEND_MESSAGE, to, textMessage
		})
	},

	sendGroupMessage: function (to, textMessage) {
		AppDispatcher.dispatch({
			actionType: ChatConstants.SEND_GROUP_MESSAGE, to, textMessage
		})
	},

	readMessage: function (sendUserId) {
		AppDispatcher.dispatch({
			actionType: ChatConstants.READ_MESSAGE, sendUserId
		})
	}
}

export default chatActions
