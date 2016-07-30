/*
 * jiangyukun on 2016-07-29 19:25
 */
import React, {Component} from 'react'
import classnames from 'classnames'

class Message extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}

	render() {
		return (
			<div className="col-xs-12">
				<div className="row">
					<div className={classnames({
						"pull-left": this.props.dir == 'left',
						"pull-right": this.props.dir == 'right'
					})}>
						<div className="col-xs-12">
							<div className="row">xxx</div>
						</div>
						<div className="col-xs-12">
						 	<div className="row">content</div>
						</div>
						
	                   
	                </div>
				</div>
			</div>
		)
	}
}

export default Message
