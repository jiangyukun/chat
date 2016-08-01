/*
 * jiangyukun on 2016-07-30 11:35
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import Message from './Message'
import SelectImage from './SelectImage'
import DoctorChatRecord from './DoctorChatRecord'
import MessageHelper from '../components/core/MessageHelper'
import chatActions from '../actions/ChatActions'

class UserChat extends Component {
    static contextTypes = {
        curUserId: PropTypes.string,
        message: PropTypes.array
    }

    constructor(props) {
        super(props)
        this.state = {
            newMessage: '',
            isImageDialogOpen: false
        }
    }

    openImageDialog() {
        this.setState({isImageDialogOpen: true})
    }

    closeImageDialog() {
        this.setState({isImageDialogOpen: false})
    }

    onChange(event) {
        this.setState({
            newMessage: event.target.value
        })
    }

    sendMessage() {
        chatActions.sendMessage(this.props.user.username, this.state.newMessage)
    }

    render() {
        let message = this.context.message
        let jid = this.props.user.jid

        let self = this

        function showMessage() {
            return MessageHelper.showMessageToUI(message, jid, (index, from, data) => {
                return <Message key={index} username={from} content={data} dir={self.context.curUserId == from ? 'right' : 'left'}/>
            })
        }

        return (
            <div className="col-xs-9 message-box">
                <div className="col-xs-6">
                    <div className="row message-box-title">
                        <span>与{this.props.user.username}聊天中</span>
                    </div>
                    <div className="row history-message">
                        {showMessage()}
                    </div>
                    <div className="row send-messge-box">
                        <div className="tools ">
                            <div className="pull-left">
                                <div className="send-image-icon">
                                    <i className="fa fa-lg fa-file-image-o" onClick={()=> {
                                        this.openImageDialog()
                                    }}></i>
                                </div>
                                <SelectImage show={this.state.isImageDialogOpen}
                                             close={this.closeImageDialog.bind(this)}/>
                            </div>
                            <div className="pull-right">
                                <input type="button" value="发送" className="btn btn-primary"
                                       disabled={this.state.newMessage ? '' : 'disabled'}
                                       onClick={()=> {
                                           this.sendMessage()
                                       }}/>
                            </div>
                        </div>
                        <div className="input-box">
                            <div className="input-wrap">
                                <textarea onChange={(event)=> {
                                    this.onChange(event)
                                }}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <DoctorChatRecord />
                </div>
            </div>
        )
    }
}

export default UserChat
