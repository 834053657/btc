import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button, Card, Icon, Tooltip, Row, Col, Divider, Modal, Form, Input
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CustomTable from '../../components/CustomTable';
import styles from './Detail.less';
import UserIcon from './UserIcon.js';
import classNames from 'classnames';
import moment from 'moment';
import ReviewForm from './ReviewForm.js';

const FormItem = Form.Item;

const size="large";
const clsString = classNames(styles.detail, 'horizontal', {}, {
    [styles.small]: size === 'small',
    [styles.large]: size === 'large',
  });


@connect(({ user_detail, loading }) => ({
  user_detail: user_detail,
  loading: loading.models.user_detail
}))

/*@connect((user_detail, loading) => {
  return {data: user_detail, loading: loading}
})*/
@Form.create()
export default class UserDetail extends PureComponent {
  state = {
    selectedRows: [],
    showUpdateIDNo: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.setState({
          showUpdateIDNo: false,
        });
      }
    });
  }

  showModalIDNo = () => {
    this.setState({
      showUpdateIDNo: true,
    });
  }
  handleOkIDNo = (e) => {
    console.log(e);
    this.handleSubmit(e);
    /*this.setState({
      showUpdateIDNo: false,
    });*/
  }
  handleCancelIDNo = (e) => {
    console.log(e);
    this.setState({
      showUpdateIDNo: false,
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'user_detail/fetch' ,
      payload: {id: this.props.match.params.id},
    });

    dispatch({
      type: 'user_detail/fetchLog' ,
      payload: {id: this.props.match.params.id},
    });
  }


  render() {
    const { user_detail, loading, form} = this.props;
    const detail = user_detail.data;
    console.log(user_detail)
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
      }
    ]

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

    

    const name = {name: detail.userName, portrait_url: null}

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
                    <Col span={18}>
                      <Col span={8}>
                        <div className={styles.term}>用户ID</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>用户名</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>国家</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>语言</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>时区</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>手机号码</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>电子邮箱</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>交易量</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>已完成交易次数</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>交易伙伴数</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>好评率</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>被信任数</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>被屏蔽数</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>第一次交易时间</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>创建时间</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>更新时间</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                      <Col span={8}>
                        <div className={styles.term}>最后一次上线时间</div>
                        <div className={styles.detail}>U000001</div>
                      </Col>
                    </Col>
                    <Col span={6}>
                      <div className="avatar-div">
                        <UserIcon userinfo={name}/>
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
              <Col span={6}>
                <div className={styles.term}>邮箱</div>
                <div className={styles.detail}>aa@aa.com</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>手机号码</div>
                <div className={styles.detail}>156565657</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>真实姓名</div>
                <div className={styles.detail}>xiao</div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>身份证号</div>
                <div className={styles.detail}>360889889898</div>
              </Col>
              <Col span={6}>
              </Col>
              <Col span={6}>
                <Button onClick={this.showModalIDNo} loading={loading}>修改身份证号</Button>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>C2认证状态</div>
                <div className={styles.detail}>认证中</div>
              </Col>
              <Col span={6}>
                <ReviewForm submitting={loading} title="C2认证信息审核" dispatch={this.props.dispatch}/>
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
                  <img className={styles.identity_img}  src=""/>
                  <div className={styles.identity_text}>正面照</div>
                </div>
              </Col>
              <Col span={10}>
                <div className={styles.identity}>
                  <img className={styles.identity_img} src=""/>
                  <div className={styles.identity_text}>反面照</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <div className={styles.term}>C3认证状态</div>
                <div className={styles.detail}>待认证</div>
              </Col>
               <Col span={6}>
                <ReviewForm submitting={loading} title="C3认证信息审核" dispatch={this.props.dispatch}/>
              </Col>
            </Row>
          </Card>
          <Card>
            <div className={styles.title}>资产信息</div>
            <Row>
              <Col span={6}>
                <div className={styles.term}>账户余额</div>
                <div className={styles.detail}>88888</div>
              </Col>
              <Col span={6}>
                <div className={styles.term}>冻结资金</div>
                <div className={styles.detail}>66666</div>
              </Col>
              <Col span={6}>
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
              data={user_detail.logData}
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
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="身份证号: " {...formItemLayout}>
              {getFieldDecorator('idNo', {
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号！',
                  }
                ],
              })(<Input size="large" placeholder="身份证号码" />)}
            </FormItem>
          </Form>
        </Modal>
        
      </PageHeaderLayout>
    );
  }
}
