import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Modal, Form, Input, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CustomTable from '../../components/CustomTable';
import styles from './Detail.less';
import UserIcon from './UserIcon.js';
import ReviewForm from './ReviewForm.js';

const FormItem = Form.Item;

const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});


@connect(({ userDetail, loading }) => ({
  userDetail,
  loading: loading.models.userDetail,
}))

/* @connect((userDetail, loading) => {
  return {data: userDetail, loading: loading}
}) */
@Form.create()
export default class UserDetail extends PureComponent {
  state = {
    selectedRows: [],
    showUpdateIDNo: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'userDetail/fetch',
      payload: { id: this.props.match.params.id },
    });
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        dispatch({
          type: 'userDetail/updateIDNo',
          payload: { id: this.props.match.params.id, citizen_id: values.idNo },
        });

        this.setState({
          showUpdateIDNo: false,
        });
      }
    });
  }

  showModalAvatar = () => {
    this.setState({
      showAvatar: true,
    });
  }
  handleCancelAvatar = () => {
    this.setState({
      showAvatar: false,
    });
  }

  showModalIdImage1 = () => {
    this.setState({
      showIdImage_1: true,
    });
  }
  handleCancelIdImage1 = () => {
    this.setState({
      showIdImage_1: false,
    });
  }

  showModalIdImage2 = () => {
    this.setState({
      showIdImage_2: true,
    });
  }
  handleCancelIdImage2 = () => {
    this.setState({
      showIdImage_2: false,
    });
  }


  showModalIDNo = () => {
    this.setState({
      showUpdateIDNo: true,
    });
  }
  handleOkIDNo = () => {
    this.handleSubmit();
    /* this.setState({
      showUpdateIDNo: false,
    }); */
  }
  handleCancelIDNo = () => {
    this.setState({
      showUpdateIDNo: false,
    });
  }

  closeModalIDNo = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'userDetail/fetch',
      payload: { id: this.props.match.params.id },
    });
  }

  render() {
    const { userDetail: { userInfo = {}, authInfo = {}, btcInfo = {}, authLogs = [] }, form, loading } = this.props;
    const detail = userInfo;
    const { selectedRows } = this.state;
    const { getFieldDecorator } = form;

    const columns = [
      {
        title: '修改日期',
        dataIndex: 'update_time',
        width: '25%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '修改人',
        dataIndex: 'admin_name',
        width: '25%',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: '25%',
      },
      {
        title: '不通过原因',
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


    const userAvatar = { name: detail.user_name, portraitUrl: detail.portrait_url };
    const auStatusDesc = ['未认证', 'C1', 'C2', 'C3'];
    const status = ['未认证', '认证中', '已认证', '驳回'];
    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '用户管理', href: '/user-manage' }, { title: '用户详情' }];

    return (
      <PageHeaderLayout title="用户信息" breadcrumbList={breadcrumbList}>
        <div className={clsString}>
          <Card bordered={false} >
            <a className={styles.bt_btn} href="/#/user-manage">返回</a>
          </Card>
          <Card bordered={false} >
            <Row>
              <div className={styles.title}>基本信息</div>
              <Row gutter={32}>
                <Col span={21}>
                  <Col span={8}>
                    <div className={styles.term}>用户ID</div>
                    <div className={styles.detail}>{detail.id}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>用户名</div>
                    <div className={styles.detail}>{detail.name}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>国家</div>
                    <div className={styles.detail}>{detail.country}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>语言</div>
                    <div className={styles.detail}>{detail.language}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>时区</div>
                    <div className={styles.detail}>{detail.time_zone}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>手机号码</div>
                    <div className={styles.detail}>{detail.phoneno}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>电子邮箱</div>
                    <div className={styles.detail}>{detail.email}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>交易量</div>
                    <div className={styles.detail}>{detail.trade_amount}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>已完成交易次数</div>
                    <div className={styles.detail}>{detail.trade_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>交易伙伴数</div>
                    <div className={styles.detail}>{detail.trade_target_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>好评率</div>
                    <div className={styles.detail}>{detail.rating_ratio}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>被信任数</div>
                    <div className={styles.detail}>{detail.trust_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>被屏蔽数</div>
                    <div className={styles.detail}>{detail.deny_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>第一次交易时间</div>
                    <div className={styles.detail}>{detail.first_trade_time}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>创建时间</div>
                    <div className={styles.detail}>{detail.create_time}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>更新时间</div>
                    <div className={styles.detail}>{detail.update_time}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>最后一次上线时间</div>
                    <div className={styles.detail}>{detail.last_login}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>认证等级</div>
                    <div className={styles.detail}>{auStatusDesc[detail.authentication_level]}</div>
                  </Col>
                </Col>
                <Col span={3}>
                  <div className="avatar-div">
                    <UserIcon userinfo={userAvatar} onClick={this.showModalAvatar} />
                  </div>
                </Col>

              </Row>
            </Row>
          </Card>

          <Card>
            <div className={styles.title}>认证信息</div>
            <Row>
              <Col span={24}>
                <div className={styles.term}>C1认证状态</div>
                <div className={styles.detail}>{authInfo.c1 && status[authInfo.c1.auth_status]}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>{authInfo.c1 && authInfo.c1.auth_data && authInfo.c1.auth_data.email}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>手机号码</div>
                <div className={styles.detail}>{authInfo.c1 && authInfo.c1.auth_data && authInfo.c1.auth_data.phoneno}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>{authInfo.c1 && authInfo.c1.auth_data && authInfo.c1.auth_data.real_name}</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>身份证号</div>
                <div className={styles.detail}>{authInfo.c1 && authInfo.c1.auth_data && authInfo.c1.auth_data.citizen_id}</div>
              </Col>
              <Col span={7} />
              <Col span={7}>
                <Button onClick={this.showModalIDNo} >修改身份证号</Button>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>C2认证状态</div>
                <div className={styles.detail}>{authInfo.c2 && status[authInfo.c2.auth_status]}</div>
              </Col>
              <Col span={7}>
                <ReviewForm title="C2认证信息审核" dispatch={this.props.dispatch} uid={this.props.match.params.id} authLevel={2} />
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <div className={styles.term}>证件类型</div>
                <div className={styles.detail}>{authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.card_type}</div>
              </Col>
              <Col span={10}>
                <div className={styles.term}>不合格原因</div>
                <div className={styles.detail}>{authInfo.c2 && authInfo.c2.auth_log}</div>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                {
                  authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.front_url && (
                    <div className={styles.identity}>
                      <img className={styles.identity_img} alt="正面照" src={authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.front_url} onClick={this.showModalIdImage1} />
                      <div className={styles.identity_text}>正面照</div>
                    </div>
                  )
                }
              </Col>
              <Col span={10}>
                {
                  authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.back_url && (
                    <div className={styles.identity}>
                      <img className={styles.identity_img} alt="反面照" src={authInfo.c2 && authInfo.c2.auth_data && authInfo.c2.auth_data.back_url} onClick={this.showModalIdImage2} />
                      <div className={styles.identity_text}>反面照</div>
                    </div>
                  )
                }
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>C3认证状态</div>
                <div className={styles.detail}>{authInfo.c3 && status[authInfo.c3.auth_status]}</div>
              </Col>
              <Col span={7}>
                <ReviewForm title="C3认证信息审核" dispatch={this.props.dispatch} uid={this.props.match.params.id} authLevel={3} />
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>资产信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>账户余额</div>
                <div className={styles.detail}>{btcInfo.available_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>冻结资金</div>
                <div className={styles.detail}>{btcInfo.frozen_btc}</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>累计转出金额</div>
                <div className={styles.detail}>{btcInfo.outcoming_trade_amount}</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>累计转入金额</div>
                <div className={styles.detail}>{btcInfo.incoming_trade_amount}</div>
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>认证编辑日志</div>
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
          maskClosable={false}
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
