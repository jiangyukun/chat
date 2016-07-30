/*
 * jiangyukun on 2016-07-27 20:19
 */
import React from 'react';
import util from './util';

class PaginateList extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = 'PaginateList';

		var paginateListInfo = props.paginateList || {};
		let recordsTotal = paginateListInfo.recordsTotal || 0;


		console.log(recordsTotal);
		this.state = {
			currentPage: 1,
			recordsTotal: recordsTotal,
			pages: util.getPagesToShow(recordsTotal, 1)
		}
	}

	jumpToPage(page) {
		this.setState({currentPage: page});
	}

	beforePage() {
		this.setState({currentPage: this.state.currentPage - 1});
	}

	nextPage() {
		this.setState({currentPage: this.state.currentPage + 1});
	}

	render() {
		// var paginateList = this.props.paginateList;

		return (
			<div className="table relative">
			    <div className="js-table-container">{this.props.children}</div>
			    <div className="pull-left">
				    {
				    	this.state.recordsTotal > 0 ? (
								<span>
						            当前第{this.state.currentPage}页，共{this.state.recordsTotal}条数据
						        </span>
				    		) : (
					    		<span>
						            暂无数据
						        </span>
					    	)
				    }
			    </div>

			    {
			    	this.state.pages.length > 0 ? (
						<nav className="pull-right">
					        <ul className="pagination">
					            <li className={this.state.currentPage == 1 ? 'disabled' : ''} onClick={this.beforePage}>
					                <a aria-label="Previous">
					                    上一页
					                </a>
					            </li>

					            {
					            	this.state.pages.map((page, index) => {
					            		return (
											<li key={page} className={page == this.state.currentPage ? 'active': ''}>
								                <a onClick={this.jumpToPage.bind(this, page)}>{page}</a>
								            </li>
					            		)
					            	})
					            }

					            <li className={this.currentPage == this.state.pages.length ? 'disabled' : ''} onClick={this.nextPage}>
					                <a aria-label="Next">
					                    下一页
					                </a>
					            </li>
					        </ul>
					    </nav>
			    	) : null
			    }
			</div>
		);
	}
}

module.exports = PaginateList;
