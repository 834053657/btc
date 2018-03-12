import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { map } from 'lodash';
import { Button, Card, Row, Col, Modal, Input, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Detail.less';

const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});


@connect(({ adDetail, loading }) => ({
  adDetail,
  loading: loading.models.userDetail,
}))
export default class UserDetail extends PureComponent {
  state = {
    columns: [
      {
        title: '创建时间',
        dataIndex: 'created',
        width: '20%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '订单ID',
        dataIndex: 'order_id',
        width: '20%',
      },
      {
        title: '订单状态',
        dataIndex: 'order_status',
        width: '20%',
        render: val => <span> {CONFIG.trade_status[val]}</span>
      },
      {
        title: '交易金额',
        dataIndex: 'deal_btc',
        width: '20%',
      },
      {
        title: '操作',
        width: '20%',
        render: r => <a href={`/#/trade-detail/${r.order_id}`}>查看</a>
      }
    ]
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'adDetail/fetch',
      payload: { id: this.props.match.params.id },
    });

    dispatch({
      type: 'adDetail/fetchOrders',
      payload: { id: this.props.match.params.id },
    });
  }


  render() {
    const { adDetail: { info, orderList }, form, loading } = this.props;
    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '广告管理', href: '/ad-manage' }, { title: '广告详情' }];

    let security_option = '';
    if (info) {
      security_option = info.only_trusted ? '仅限受信任的交易者' : '';
      if (info.auth_level_quota) {
        security_option += `${(security_option ? ', ' : '')}交易者的认证等级至少为C${info.auth_level_quota}`;
      }
      if (!security_option) {
        security_option = '无限制';
      }
    }

    return (
      <PageHeaderLayout title="广告基本信息" breadcrumbList={breadcrumbList}>
        <div className={clsString}>
          <Card bordered={false} >
            <a className={styles.bt_btn} href="/#/ad-manage">返回</a>
          </Card>

          <Card>
            <div className={styles.title}>广告基本信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>广告ID</div>
                <div className={styles.detail}>{info.ad_id}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>广告类型</div>
                <div className={styles.detail}>{info.type ? CONFIG.ad_type[info.type] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>所在地</div>
                <div className={styles.detail}>{info.country ? CONFIG.countries[info.country] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>付款方式</div>
                <div className={styles.detail}>{info.accept_money ? CONFIG.pay_methods[info.accept_money] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>货币</div>
                <div className={styles.detail}>{info.accept_money ? CONFIG.accept_money[info.accept_money] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>是否设置溢价</div>
                <div className={styles.detail}>{info.discount ? '是' : '否'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>溢价</div>
                <div className={styles.detail}>{info.discount}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易价格</div>
                <div className={styles.detail}>{info.price}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>开放时间</div>
                <Row className={styles.detail}>
                  {
                    map(info.open_times, (i) => {
                      return <Col key={i.key} span={7}>{i.key} {i.start} - {i.end}</Col>;
                    })
                  }
                </Row>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>交易要求</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易限额</div>
                <div className={styles.detail}>{info.min_total} ~ {info.max_total}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>付款期限</div>
                <div className={styles.detail}>{info.paying_timelimit}分钟</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>安全选项</div>
                <div className={styles.detail}>{security_option}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>是否开启流动性选项</div>
                <div className={styles.detail}>{+info.fluidity_option ? '是' : '否'}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>交易条款</div>
                <div className={styles.detail}>{info.terms}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>归属订单列表</div>
            <Table
              rowKey={record => record.id}
              dataSource={orderList}
              columns={this.state.columns}
              pagination={false}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
