import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Modal, Input, Tabs, Icon } from 'antd';
import { Link } from 'dva/router';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ComplainForm from './ComplainForm';
import styles from './IM.less';

const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const { Description } = DescriptionList;

@connect(({ tradeDetail, tradeIm, loading }) => ({
  tradeDetail,
  tradeIm,
  loading: loading.models.tradeIM,
}))
export default class TradeIM extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'tradeDetail/fetch',
      payload: { id: this.props.match.params.id },
    });
  }


  render() {
    const { tradeDetail: { detail = {}, prices = {}, traders: { dealer = {}, owner = {} } }, loading } = this.props;

    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '订单管理', href: '/trade-manage' }, { title: '处理申诉' }];

    return (
      <PageHeaderLayout breadcrumbList={breadcrumbList}>
        <Card
          bodyStyle={{ padding: 0 }}
          className={styles.chat_card}
          title={<div><span>罗先生,</span><span>wu,</span><span>客服</span></div>}
          extra={<ComplainForm title="申诉处理" />}
        >
          <Row className={styles.card_body}>
            <Col md={14} className={styles.left}>
              <ul className={styles.chat_history}>
                <li>转账了吗</li>
              </ul>
              <div className={styles.chat_message_box}>
                <div className={styles.chat_tools}>
                  <Icon type="smile-o" style={{ fontSize: 18, marginRight: 15 }} />
                  <Icon type="picture" style={{ fontSize: 18 }} />
                </div>
                <TextArea rows={4} placeholder="请按回车键发送消息" />
              </div>
            </Col>
            <Col md={10} className={styles.right}>
              <Tabs defaultActiveKey="1" >
                <TabPane tab="订单信息" key="1" className={styles.tabs_content}>
                  <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                    <Description term="订单号">{detail.order_id}</Description>
                    <Description term="订单状态">{detail.order_status ? CONFIG.trade_status[detail.order_status] : '-'}</Description>
                    <Link to={`/trade-detail/${this.props.match.params.id}`}>查看订单详情</Link>
                  </DescriptionList>
                </TabPane>
                <TabPane tab="买方信息" key="2" className={styles.tabs_content} >
                  <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                    <Description term={`买方 ${owner.id === detail.owner_id ? '（广告主）' : '（发起人）'}`}>{owner.name}</Description>
                    <Description term="认证等级">{owner.auth_level} </Description>
                    <Description term="交易量">{owner.auth_level} </Description>
                    <Description term="好评率">{owner.auth_level} </Description>
                  </DescriptionList>
                </TabPane>
                <TabPane tab="卖方信息" key="3" className={styles.tabs_content} >
                  <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                    <Description term={`买方${dealer.id === detail.owner_id ? '（广告主）' : '（发起人）'}`}>{dealer.name}</Description>
                    <Description term="认证等级">{dealer.auth_level} </Description>
                    <Description term="交易量">{dealer.auth_level} </Description>
                    <Description term="好评率">{dealer.auth_level} </Description>
                  </DescriptionList>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
