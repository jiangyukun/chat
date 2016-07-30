/*
 * jiangyukun on 2016-07-28 20:29
 */
import AppDispatcher from '../dispatcher/AppDispatcher'
import ChatConstants from '../constants/ChatConstants'
import {EventEmitter} from 'events'

let patientList = [];
let patientGroupList = [];
let CHANGE_EVENT = 'change';

let ChatStore = Object.assign({}, EventEmitter.prototype, {
	getPatientList: function () {
		return patientList;
	},

	getPatientGroupList: function () {
		return patientGroupList;
	},

	addChangeListener: function(callback) {
    	this.on(CHANGE_EVENT, callback);
  	}
})

let conn;

AppDispatcher.register(function (action) {
	switch(action.actionType) {
		case ChatConstants.LOGIN:
			login(action.username, action.password, action.success, action.error);
			break;

		case ChatConstants.SEND_MESSAGE:
			console.log('send user message')
			conn.sendTextMessage({
				type: 'chat',
				to: action.to,
				msg: action.message
			})
			break

		case ChatConstants.SEND_GROUP_MESSAGE:
			console.log('send group message')
			conn.sendTextMessage({
				type: 'groupchat',
				to: action.to,
				msg: action.message
			})
			break
		default:
			break;
	}
})

export default ChatStore

// -------------------------------------------------------------
let USER_NOT_FOUND = 3;
let loginSuccessCallback, loginErrorCallback;

conn = new Easemob.im.Connection({
    multiResources: Easemob.im.config.multiResources,
    https : Easemob.im.config.https,
    url: Easemob.im.config.xmppURL
});

function login(username, password, successCallback, errorCallback) {
	loginSuccessCallback = successCallback;
	loginErrorCallback = errorCallback;
	conn.open({
		// apiUrl: Easemob.im.config.apiURL,
		user: username,
		pwd: password,
		appKey: Easemob.im.config.appkey
	});
};

function handleOpen(conn) {
	console.log(conn)
	loginSuccessCallback && loginSuccessCallback();
	var curUserId = conn.context.userId;

	conn.getRoster({
		success: function(roster) {
			// console.log(roster)
			patientList = roster
			ChatStore.emit(CHANGE_EVENT)
			
		},
		error: function (error) {
			console.log(error)
		}
	});

	conn.listRooms({
		success: function(rooms) {
			patientGroupList = rooms
			ChatStore.emit(CHANGE_EVENT)
		},
		error: function(e) {
			console.log(e)
		}
	});
};

function handleError(error) {
	if (error.type == USER_NOT_FOUND) {
		loginErrorCallback && loginErrorCallback();
	}
	console.log(error)
}

function handleTextMessage(messageInfo) {
	console.log(messageInfo)
}

//初始化连接
conn.listen({
	//当连接成功时的回调方法
	onOpened: function() {
		handleOpen(conn);
	},
	//当连接关闭时的回调方法
	onClosed: function() {
		handleClosed();
	},
	//收到文本消息时的回调方法
	onTextMessage: function(message) {
		handleTextMessage(message);
	},
	//收到表情消息时的回调方法
	onEmotionMessage: function(message) {
		handleEmotion(message);
	},
	//收到图片消息时的回调方法
	onPictureMessage: function(message) {
		handlePictureMessage(message);
	},
	//收到音频消息的回调方法
	onAudioMessage: function(message) {
		handleAudioMessage(message);
	},
	//收到位置消息的回调方法
	onLocationMessage: function(message) {
		handleLocationMessage(message);
	},
	//收到文件消息的回调方法
	onFileMessage: function(message) {
		handleFileMessage(message);
	},
	//收到视频消息的回调方法
	onVideoMessage: function(message) {
		handleVideoMessage(message);
	},
	//收到联系人订阅请求的回调方法
	onPresence: function(message) {
		handlePresence(message);
	},
	//收到联系人信息的回调方法
	onRoster: function(message) {
		handleRoster(message);
	},
	//收到群组邀请时的回调方法
	onInviteMessage: function(message) {
		handleInviteMessage(message);
	},
	//异常时的回调方法
	onError: function(message) {
		handleError(message);
	}
});

// login('bkts1', '198811');
login('11111111111', 'tiger123456');
// login('15381080789', 'tiger123456');
