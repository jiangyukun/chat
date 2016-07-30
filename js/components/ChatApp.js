/**
 * jiangyukun on 2016/07/28 10:00
 */
import React, {Component, PropTypes} from 'react'
import Header from './Header'
import ChatPanel from './ChatPanel'
import ChatStore from '../stores/ChatStore'

function getChatState() {
    return {
        patients: ChatStore.getPatientList(),
        patientGroups: ChatStore.getPatientGroupList()
    }
}

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = getChatState();
    }

    getChildContext() {
        return {
            patients: this.state.patients,
            patientGroups: this.state.patientGroups
        }
    }

    componentWillMount() {
        ChatStore.addChangeListener(()=> {this._onChange()})
    }

    render() {
        return (
            <div className="chat">
                <Header />
                <div className="container-fluid">
                    <div className="panel">
                        <div className="panel-heading">
                        </div>
                        <div className="panel-body">
                            <ChatPanel />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _onChange() {
        let chatState = getChatState()
        // console.log(chatState)
        // console.log(this)
        this.setState(chatState)
    }
}

ChatApp.childContextTypes = {
    patients: PropTypes.array,
    patientGroups: PropTypes.array
}

export default ChatApp
