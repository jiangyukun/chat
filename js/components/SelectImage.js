/*
 * jiangyukun on 2016-07-30 18:10
 */
import React, {Component} from 'react'
import {Modal, Button} from 'react-bootstrap'

class SelectImage extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	render() {
		return (
			<Modal show={this.props.show}>
				<Modal.Header closeButton>
            		<Modal.Title>选择图片</Modal.Title>
          		</Modal.Header>
          		<Modal.Body>
          			xxx
          		</Modal.Body>
          		<Modal.Footer>
            		<Button onClick={this.props.close}>取消</Button>
            		<Button className="btn btn-primary" onClick={this.props.close}>发送</Button>
          		</Modal.Footer>
			</Modal>
		)
	}
}

export default SelectImage
