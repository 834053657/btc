import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { Button, Card, Row, Col, Modal, Form, Input } from 'antd';
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

    dispatch({
      type: 'userDetail/fetchLog',
      payload: { id: this.props.match.params.id },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err) => {
      if (!err) {
        // console.log('Received values of form: ', values);

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

  render() {
    const { userDetail, form } = this.props;
    const { detail = {} } = userDetail || {};
    // console.log(userDetail);
    const { selectedRows } = this.state;
    const { getFieldDecorator } = form;

    const columns = [
      {
        title: '修改日期',
        sorter: true,
        dataIndex: 'updatedDate',
        width: '25%',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '修改人',
        sorter: true,
        dataIndex: 'updatedBy',
        width: '25%',
      },
      {
        title: '备注',
        sorter: true,
        dataIndex: 'remark',
        width: '25%',
      },
      {
        title: '不通过原因',
        sorter: true,
        dataIndex: 'reason',
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


    const name = { name: detail.user_name, portrait_url: detail.portrait_url };

    return (
      <PageHeaderLayout title="用户信息">
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
                    <div className={styles.detail}>{detail.user_id}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>用户名</div>
                    <div className={styles.detail}>{detail.user_name}</div>
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
                    <div className={styles.detail}>{detail.timezone}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>手机号码</div>
                    <div className={styles.detail}>{detail.mobile}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>电子邮箱</div>
                    <div className={styles.detail}>{detail.email}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>交易量</div>
                    <div className={styles.detail}>{detail.trade_volume}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>已完成交易次数</div>
                    <div className={styles.detail}>{detail.trade_completed_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>交易伙伴数</div>
                    <div className={styles.detail}>{detail.trade_partner_count}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>好评率</div>
                    <div className={styles.detail}>{detail.praise_rate}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>被信任数</div>
                    <div className={styles.detail}>{detail.trusted_number}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>被屏蔽数</div>
                    <div className={styles.detail}>{detail.shielded_number}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>第一次交易时间</div>
                    <div className={styles.detail}>{detail.first_trade_datetime}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>创建时间</div>
                    <div className={styles.detail}>{detail.created_datetime}</div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.term}>更新时间</div>
                    <div className={styles.detail}>{detail.updated_datetime}</div>
                  </Col>
                  <Col span={16}>
                    <div className={styles.term}>最后一次上线时间</div>
                    <div className={styles.detail}>{detail.last_login_datetime}</div>
                  </Col>
                </Col>
                <Col span={3}>
                  <div className="avatar-div">
                    <UserIcon userinfo={name} onClick={this.showModalAvatar} />
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
                <div className={styles.detail}>已认证</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>aa@aa.com</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>手机号码</div>
                <div className={styles.detail}>156565657</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>xiao</div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>身份证号</div>
                <div className={styles.detail}>360889889898</div>
              </Col>
              <Col span={7} />
              <Col span={7}>
                <Button onClick={this.showModalIDNo} >修改身份证号</Button>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>C2认证状态</div>
                <div className={styles.detail}>认证中</div>
              </Col>
              <Col span={7}>
                <ReviewForm title="C2认证信息审核" dispatch={this.props.dispatch} />
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <div className={styles.term}>证件类型</div>
                <div className={styles.detail}>身份证</div>
              </Col>
              <Col span={10}>
                <div className={styles.term}>不合格原因</div>
                <div className={styles.detail}>xxx</div>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <div className={styles.identity}>
                  <img className={styles.identity_img} alt="正面照" src={detail.id_image_1} onClick={this.showModalIdImage1} />
                  <div className={styles.identity_text}>正面照</div>
                </div>
              </Col>
              <Col span={10}>
                <div className={styles.identity}>
                  <img className={styles.identity_img} alt="反面照" src={detail.id_image_2} onClick={this.showModalIdImage2} />
                  <div className={styles.identity_text}>反面照</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={7}>
                <div className={styles.term}>C3认证状态</div>
                <div className={styles.detail}>待认证</div>
              </Col>
              <Col span={7}>
                <ReviewForm title="C3认证信息审核" dispatch={this.props.dispatch} />
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>资产信息</div>
            <Row>
              <Col span={7}>
                <div className={styles.term}>账户余额</div>
                <div className={styles.detail}>88888</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>冻结资金</div>
                <div className={styles.detail}>66666</div>
              </Col>
              <Col span={7}>
                <div className={styles.term}>累计转出金额</div>
                <div className={styles.detail}>16666</div>
              </Col>
              <Col span={24}>
                <div className={styles.term}>累计转入金额</div>
                <div className={styles.detail}>100000</div>
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>认证编辑日志</div>
            <CustomTable
              data={userDetail.logData}
              columns={columns}
              selectedRows={selectedRows}
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
              })(<Input size="large" placeholder="身份证号码" />)}
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
          <img src={detail.id_image_1} alt="id_image" />
        </Modal>
        <Modal
          footer={null}
          width={650}
          onCancel={this.handleCancelIdImage2}
          visible={this.state.showIdImage_2}
        >
          <img src={detail.id_image_2} alt="id_image_2" />
        </Modal>

      </PageHeaderLayout>
    );
  }
}
