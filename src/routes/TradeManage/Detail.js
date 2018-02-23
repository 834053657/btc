import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Modal, Form, Input, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Detail.less';

const FormItem = Form.Item;

const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});


@connect(({ tradeDetail, loading }) => ({
  tradeDetail,
  loading: loading.models.userDetail,
}))
@Form.create()
export default class UserDetail extends PureComponent {
  state = {
    showUpdateIDNo: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'userDetail/fetch',
      payload: { id: this.props.match.params.id },
    });
  }


  render() {
    console.log(this.props);
    const { tradeDetail: { userInfo = {}, authInfo = {}, btcInfo = {}, authLogs = [] }, form, loading } = this.props;
    const detail = userInfo;
    const { getFieldDecorator } = form;

    const columns = [
      {
        title: '时间',
        dataIndex: 'update_time',
        width: '25%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作人',
        dataIndex: 'admin_name',
        width: '25%',
      },
      {
        title: '行为',
        dataIndex: 'remark',
        width: '25%',
      },
      {
        title: '备注',
        dataIndex: 'auth_log',
        width: '25%',
      },
    ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };


    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '交易管理', href: '/train-manage' }, { title: '订单详情' }];

    return (
      <PageHeaderLayout title="订单详情" breadcrumbList={breadcrumbList}>
        <div className={clsString}>
          <Card bordered={false} >
            <a className={styles.bt_btn} href="/#/trade-manage">返回</a>
          </Card>

          <Card>
            <div className={styles.title}>订单基本信息</div>
            <Row>
              <Col span={6}>
                <div className={styles.term}>订单ID</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>订单状态</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>交易类型</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>交易发起人</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>归属广告ID</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告类型</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告主所在地</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>广告主</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>付款方式</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>付款期限</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>交易条款</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>交易者信息</div>
            <div >买家信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>用户名</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>国家</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>认证等级</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>电话</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
            <div >卖家信息</div>

            <Row>
              <Col span={7}>
                <div className={styles.term}>用户名</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>国家</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>认证等级</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>电话</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>买方价格明细</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>汇率</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>法币</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>成交金额</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易费率</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易费</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>总金额</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>卖方价格明细</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>汇率</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>法币</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>成交金额</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易费率</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易费</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>总金额</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>订单日志</div>
            <Table
              dataSource={authLogs}
              columns={columns}
              pagination={false}
            />
          </Card>
        </div>
        <Modal
          title="修改身份证号"
          visible={this.state.showUpdateIDNo}
          onOk={this.handleOkIDNo}
          onCancel={this.handleCancelIDNo}
          okText="保存"
          destroyOnClose
          confirmLoading={loading}
          afterClose={this.closeModalIDNo}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="身份证号: " {...formItemLayout}>
              {getFieldDecorator('idNo', {
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号！',
                  },
                ],
              })(<Input size="large" placeholder="身份证号" />)}
            </FormItem>
          </Form>
        </Modal>

        <Modal
          footer={null}
          onCancel={this.handleCancelAvatar}
          visible={this.state.showAvatar}
          width={350}
        >
          <img src={detail.portrait_url} alt="portrait_url" />
        </Modal>

        <Modal
          footer={null}
          width={650}
          onCancel={this.handleCancelIdImage1}
          visible={this.state.showIdImage_1}
        >
          <img src={authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.front_url} alt="id_image" />
        </Modal>
        <Modal
          footer={null}
          width={650}
          onCancel={this.handleCancelIdImage2}
          visible={this.state.showIdImage_2}
        >
          <img src={authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.back_url} alt="id_image_2" />
        </Modal>

      </PageHeaderLayout>
    );
  }
}
