import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Modal, Input, Tabs, Icon } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './IM.less';

const TabPane = Tabs.TabPane;
const { TextArea } = Input;

@connect(({ tradeInfo, loading }) => ({
  tradeInfo,
  loading: loading.models.tradeIM,
}))
export default class TradeIM extends PureComponent {
  state = {
  };

  componentDidMount() {
    const { dispatch } = this.props;

    // dispatch({
    //   type: 'tradeIM/fetch',
    //   payload: { id: this.props.match.params.id },
    // });
  }


  render() {
    const { tradeInfo, form, loading } = this.props;

    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '订单管理', href: '/trade-manage' }, { title: '处理申诉' }];

    return (
      <PageHeaderLayout breadcrumbList={breadcrumbList}>
        <Card
          bodyStyle={{ padding: 0 }}
          className={styles.chat_card}
          title={<div><span>罗先生,</span><span>wu,</span><span>客服</span></div>}
          extra={<Button type="primary">申诉处理</Button>}
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
                    订单信息
                </TabPane>
                <TabPane tab="买方信息" key="2" className={styles.tabs_content} >
                    买方信息
                </TabPane>
                <TabPane tab="卖方信息" key="3" className={styles.tabs_content} >
                    卖方信息
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
