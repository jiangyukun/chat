/**
 * jiangyukun on 2016/07/27 12:35
 */
import React, {Component, PropTypes} from 'react'
import {Panel, Accordion} from 'react-bootstrap'
import GroupChat from './GroupChat'
import UserChat from './UserChat'
import chatActions from '../actions/ChatActions'

let CHAT_TYPE_USER = 1;
let CHAT_TYPE_GROUP = 2;

class ChatPanel extends Component {
    static contextTypes = {
        patients: PropTypes.array,
        patientGroups: PropTypes.array,
        message: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            to: '',
            newMessage: ''
        }
    }

    userChat(patient) {
        console.log(patient)
        
        this.setState({
            chatType: CHAT_TYPE_USER,
            user: {
                userId: patient.name,
                username: patient.name
            }
        })
        chatActions.readMessage(patient.name)
    }

    groupChat(patientGroup) {
        this.setState({
            chatType: CHAT_TYPE_GROUP,
            room: {
                roomId: patientGroup.roomId,
                roomName: patientGroup.name
            }
        })
    }

    render() {
        let self = this;

        function unreadMessage(userId) {
            let message = self.context.message[userId]
            let count = 0;
            if (message && message.unread) {
                count = message.unread.count
            }
            return count > 0 ? <span className="red">({count})</span> : null
        }

        return (
            <div className="row chat-box">
                <div className="col-xs-3 contact-list">
                    <section className="row">
                        <div className="col-xs-8">
                            <input className="form-control" type="text" placeholder="输入账号"/>
                        </div>
                        <div className="col-xs-4">
                            <button className="btn btn-primary">搜索</button>
                        </div>
                    </section>
                    <section className="row mt-15">
                        <Accordion>
                            <Panel header="患者" eventKey="1">
                                <ul className="list-group">
                                    {
                                        this.context.patients.map((patient, index) => {
                                            return (
                                                <li key={index} className="list-group-item" onClick={()=>{this.userChat(patient)}}>
                                                    {patient.name} 
                                                    {unreadMessage(patient.name)}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Panel>
                            <Panel header="患者群组" eventKey="2">
                                <ul className="list-group">
                                    {
                                        this.context.patientGroups.map((patientGroup, index) => {
                                            return (
                                                <li key={index} className="list-group-item" onClick={()=>{this.groupChat(patientGroup)}}>
                                                    {patientGroup.name}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Panel>
                            <Panel header="医生" eventKey="3">
                            </Panel>
                        </Accordion>
                    </section>
                </div>

                {
                    this.state.chatType == CHAT_TYPE_GROUP ? (<GroupChat room={this.state.room}/>) : null
                }

                {
                    this.state.chatType == CHAT_TYPE_USER ? (<UserChat user={this.state.user}/>) : null
                }

            </div>
        )
    }
}

export default ChatPanel
