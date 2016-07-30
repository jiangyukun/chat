/*
 * jiangyukun on 2016-07-27 21:27
 */

import React from 'react';

class QueryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'QueryFilter';
        this.state = {
            searchKey: '',
            more: false
        }
    }

    query() {

    }

    toggleMore() {
        this.setState({more: !this.state.more})
    }

    clearAll() {
        
    }

    render() {
        return (
            <div className="group-tools">
                <div className="filter-toolbar">
                    <!--工具按钮-->
                </div>
                <div className="group-search">
                    <div className="group-input">
                        <form>
                            <input type="text" placeholder="搜索关键词"/>
                            <button className="icon-search-btn" onClick="this.query();"></button>
                        </form>
                    </div>
                    <div className="group-select-btn {this.state.more ? 'selected' : ''}">
                        <a onClick="this.toggleMore">
                            <span>更多筛选</span>
                            <i className="icon-arrow-blue"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <div className="child group-select-more {queryFilter.query.more ? '' : 'hide'}">
                        <div className="group-top">
                            <div></div>
                        </div>
                        <!--筛选条件-->
                        <div className="group-select-more-btm">
                            <div>筛选条件:</div>
                            <div>
                                <a className="select-result select-result2 select-resultqage" data-ng-repeat="(typeCode, typeInfo) in queryFilter.selectedQueryCondition">
                                    <span>{typeInfo.typeText}： {typeInfo.itemText}</span>
                                    <i className="icon-close" data-ng-click="queryFilter.removeFilterType(typeCode);"></i>
                                </a>
                            </div>
                            <div className="select-result">
                                <button className="clear {queryFilter._selectedTypeCode.length ? '' : 'disabled'}" data-ng-click="this.clearAll;"
                                        data-ng-disabled="!queryFilter._selectedTypeCode.length">清除
                                </button>
                                <button className="submit" onClick="this.query();">确定</button>
                            </div>
                            <div className="clear disabled"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = QueryFilter;
