import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Detail.less';
import { routerRedux } from 'dva/router';


const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});


@connect(({ tradeDetail, loading }) => ({
  tradeDetail,
  loading: loading.models.tradeDetail,
}))
export default class TradeDetail extends PureComponent {
  state = {
    columns: [
      {
        title: '时间',
        dataIndex: 'operate_time',
        width: '25%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作人',
        dataIndex: 'name',
        width: '25%',
      },
      {
        title: '行为',
        dataIndex: 'behavior',
        width: '25%',
      },
      {
        title: '备注',
        dataIndex: 'log',
        width: '25%',
      },
    ]
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'tradeDetail/fetch',
      payload: { id: this.props.match.params.id },
    });
  }


  render() {
    const { tradeDetail: { detail = {}, prices = {}, traders: { dealer = {}, owner = {} }, op_logs = [] }, loading } = this.props;
    const { dealer: pdealer = {}, owner: powner = {} } = prices || {};
    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '交易管理', href: '/train-manage' }, { title: '订单详情' }];

    return (
      <PageHeaderLayout title="订单详情" breadcrumbList={breadcrumbList}>
        <div className={clsString}>
          <Card bordered={false} >
            <a className={styles.bt_btn} onClick={() => this.props.dispatch(routerRedux.goBack())}>返回</a>
          </Card>

          <Card>
            <div className={styles.title}>订单基本信息</div>
            <Row>
              <Col span={6}>
                <div className={styles.term}>订单ID</div>
                <div className={styles.detail}>{detail.order_id}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>订单状态</div>
                <div className={styles.detail}>{detail.order_status ? CONFIG.trade_status[detail.order_status] : '-'}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>交易类型</div>
                <div className={styles.detail}>{detail.trade_type ? CONFIG.trade_type[detail.trade_type] : '-'}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>交易发起人</div>
                <div className={styles.detail}>{detail.dealer_name}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>归属广告ID</div>
                <div className={styles.detail}>{detail.ad_id}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告类型</div>
                <div className={styles.detail}>{detail.ad_type ? CONFIG.ad_type[detail.ad_type] : '-'}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告主所在地</div>
                <div className={styles.detail}>{detail.owner_country ? CONFIG.countries[detail.owner_country] : '-'}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告主</div>
                <div className={styles.detail}>{detail.owner_name}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>付款方式</div>
                <div className={styles.detail}>{detail.accept_money ? CONFIG.pay_methods[detail.accept_money] : '-'}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>付款期限</div>
                <div className={styles.detail}>{detail.pay_limit}分钟</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>交易条款</div>
                <div className={styles.detail}>{detail.terms}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>交易者信息</div>
            <div className={styles.sub_title}>买家信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>用户名</div>
                <div className={styles.detail}>{dealer.name}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>国家</div>
                <div className={styles.detail}>{dealer.country ? CONFIG.countries[dealer.country] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>认证等级</div>
                <div className={styles.detail}>{dealer.auth_level}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>{dealer.real_name}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>{dealer.email}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>电话</div>
                <div className={styles.detail}>{dealer.phoneno || '-'}</div>
              </Col>
            </Row>
            <div className={styles.sub_title}>卖家信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>用户名</div>
                <div className={styles.detail}>{owner.name}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>国家</div>
                <div className={styles.detail}>{owner.country ? CONFIG.countries[owner.country] : '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>认证等级</div>
                <div className={styles.detail}>{owner.auth_level}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>{owner.real_name || '-'}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>{owner.email}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>电话</div>
                <div className={styles.detail}>{owner.phoneno}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>买方价格明细 {dealer.id === detail.owner_id ? <span className="text-red">(广告主)</span> : null}</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>汇率</div>
                <div className={styles.detail}>{pdealer.price}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>法币</div>
                <div className={styles.detail}>{pdealer.deal_cny}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>成交金额</div>
                <div className={styles.detail}>{pdealer.deal_btc}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易费率</div>
                <div className={styles.detail}>{pdealer.deal_price}%</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易费</div>
                <div className={styles.detail}>{pdealer.fee}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>总金额</div>
                <div className={styles.detail}>{pdealer.deal_total}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>卖方价格明细 {owner.id === detail.owner_id ? <span className="text-red">(广告主)</span> : null}</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>汇率</div>
                <div className={styles.detail}>{powner.price}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>法币</div>
                <div className={styles.detail}>{powner.deal_cny}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>成交金额</div>
                <div className={styles.detail}>{powner.deal_btc}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易费率</div>
                <div className={styles.detail}>{powner.deal_price}%</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易费</div>
                <div className={styles.detail}>{powner.fee}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>总金额</div>
                <div className={styles.detail}>{powner.deal_total}</div>
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>订单日志</div>
            <Table
              rowKey={r => r.by_id}
              dataSource={op_logs}
              columns={this.state.columns}
              pagination={false}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
