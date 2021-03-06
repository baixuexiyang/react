'use strict';

define([
    'react',
    'backbone',
    'common',
    'jsx!component/common/HeaderComponent.react'
], function (React, Backbone, common, HeaderComponent) {
	
    return React.createClass({
        getInitialState: function() {
            return {
                items: [{
                    ruleId: 0,
                    ruleName: '临床科室查房制度'
                }, {
                    ruleId: 1,
                    ruleName: '临床科室值班、交接班制度'
                }, {
                    ruleId: 2,
                    ruleName: '医嘱查对制度'
                }]
            };
        },
        componentWillUnmount: function() {
            // 页面离开时执行
        },
        componentDidMount: function() {
        	var me = this;
            $('#content').removeClass('home-loading').removeClass('pt-page-moveToLeft').addClass('pt-page-moveFromLeft');
            // me.setState({loading: false});
            common.scrollbar();
        },
        list: function(item) {
            $('#content').removeClass('pt-page-moveFromLeft').addClass('pt-page-moveToLeft');
            var rout = new Backbone.Router();
            setTimeout(function() {
                rout.navigate('rule/list2?id='+ item.ruleId, {
                     trigger: true
                });
            }, 100);
        },
        render: function () {
            var me = this;
            var header = '';
            if($TJ.hasHeader) {
                header = <HeaderComponent back={true} title={"规章制度"}/>;
            }
            var data = this.state.items;

            return <div>
                       {header}
                       <div className={$TJ.hasHeader ? 'hasHeader' : ''}>
                            <div className="list rule-list">
                        		{
                                    (data && data.length > 0) ?
                                        (data.map(function(item, i) {
                                            return (
                                                <div className="item top go-right rule-detail-list" onClick={me.list.bind(me, item)}>
                                                    {item.ruleName}
                                                </div>
                                            );
                                        })) : <div className="no-message">暂无规章制度</div>
                                }
                            </div>
                        </div>
                    </div>;
        }
    });

});
