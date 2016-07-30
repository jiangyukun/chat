/*
 * jiangyukun on 2016-07-30
 */
import React, {Component} from 'react'
import Message from './Message'
import chatActions from '../actions/ChatActions'

 class GroupChat extends Component {
 	constructor(props) {
 		super(props)
 		this.state = {newGroupMessage: ''}
 	}

 	onChange(event) {
        this.setState({
            newGroupMessage: event.target.value
        })
    }

    sendGroupMessage() {
        chatActions.sendGroupMessage(this.props.room.roomId, this.state.newGroupMessage);
    }

 	render() {
 		return (
			<div className="col-xs-9 message-box">
                <div className="row message-box-title">
                    <span>群组聊天中（{this.props.room.roomName}）</span>
                </div>
                <div className="row history-message">
                    <Message dir="left" />
                    <Message dir="right" />
                    <Message dir="right" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="left" />
                    <Message dir="right" />
                    <Message dir="right" />
                </div>
                <div className="row send-messge-box">
                    <div className="tools ">
                        <div className="pull-left"></div>
                        <div className="pull-right">
                            <input type="button" value="发送" className="btn btn-primary" 
                                disabled={this.state.newGroupMessage ? '': 'disabled'}
                                onClick={()=>{this.sendGroupMessage()}} />
                        </div>
                    </div>
                    <div className="input-box">
                        <div className="input-wrap">
                            <textarea onChange={(event)=>{this.onChange(event)}}></textarea>
                        </div>
                    </div>
                </div>
            </div>
 		)
 	}
 }

 export default GroupChat
