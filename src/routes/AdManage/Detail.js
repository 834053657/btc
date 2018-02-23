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


@connect(({ adDetail, loading }) => ({
  adDetail,
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
    const { adDetail: { userInfo = {}, authInfo = {}, btcInfo = {}, authLogs = [] }, form, loading } = this.props;
    const detail = userInfo;
    const { getFieldDecorator } = form;

    const columns = [
      {
        title: '创建时间',
        dataIndex: 'update_time',
        width: '20%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '订单ID',
        dataIndex: 'admin_name',
        width: '20%',
      },
      {
        title: '订单状态',
        dataIndex: 'remark',
        width: '20%',
      },
      {
        title: '交易金额',
        dataIndex: 'auth_log',
        width: '20%',
      },
      {
        title: '操作',
        width: '20%',
        render: r => <a href={`/#/${r.id}`}>查看</a>
      }
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


    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '广告管理', href: '/ad-manage' }, { title: '广告详情' }];

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
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>广告类型</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>所在地</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>付款方式</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>货币</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>是否设置溢价</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>溢价</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>交易价格</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>开放时间</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>交易要求</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>交易限额</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>付款期限</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>安全选项</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>是否开启流动性选项</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>交易条款</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>归属订单列表</div>
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
