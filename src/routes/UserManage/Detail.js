import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Icon, Tooltip, Row, Col, Divider
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Detail.less';
import UserIcon from './UserIcon.js';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['sys_config/submitForm'],
  submittingMsg: loading.effects['sys_config/submitFormMsg'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'sys_config/submitForm',
          payload: values,
        });
      }
    });
  }

  handleSubmitMsg = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }


  render() {
    const { submitting, submittingMsg } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      },
    };

    const formItemLayoutMsg = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
        md: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 6, offset: 18 },
      },
    };

    const submitFormLayoutMsg = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
      },
    };

    const name = {name: 'Alex', portrait_url: null}

    return (
      <PageHeaderLayout title="用户资料">
        <div className={styles.user_detail_content}>
          <Card bordered={false} className={styles.bt_user_detail_page}>
              <Row>
                <Col span={24}>
                  <a className={styles.bt_btn} href="/#/user-manage">返回</a>
                </Col>
              </Row>
              <Row>
                <Col span={18}>
                  <div className="avatar-div">
                    <UserIcon userinfo={name}/>
                    <div className={styles.avatar_detail}>
                      <p>Alex Xiao</p>
                    </div>
                  </div>
                </Col>
                <Col span={6}>
                  <Button type="primary" >重置密码</Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>国家:</span>
                    <span className={styles.form_item}>中国</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>交易量:</span>
                    <span className={styles.form_item}>100</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>已确认的交易次数:</span>
                    <span className={styles.form_item}>100</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>评价得分:</span>
                    <span className={styles.form_item}>100</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>账户创建时间:</span>
                    <span className={styles.form_item}>2018-02-03 10:10</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>最后一次上线:</span>
                    <span className={styles.form_item}>2018-02-03 10:10</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>语言:</span>
                    <span className={styles.form_item}>4年，1月之前</span>
                  </div>
                  <div className={styles.form_div}>
                    <span className={styles.form_label}>信任:</span>
                    <span className={styles.form_item}>被10人屏蔽</span>
                  </div>
                </Col>
              </Row>
          </Card>
          
          <Card>
            <Row>
              <Col>
                <div className={styles.bt_user_detail_page}>
                  <h5 className={styles.bit_title}>认证情况</h5>
                  <div className={styles.assets_content}>
                    <Row>
                      <Col span={10}>
                        <span >C1证书资料</span>
                      </Col>
                      <Col span={7}><Button type="primary">通过</Button></Col>
                      <Col span={7}><Button type="default">驳回</Button></Col>
                    </Row>
                  </div>
                  <Divider style={{ marginBottom: 15 }} />
                  <div className={styles.assets_content}>
                    <Row>
                      <Col span={10}>
                        <span >C2a证书资料</span>
                      </Col>
                      <Col span={7}><Button type="primary">通过</Button></Col>
                      <Col span={7}><Button type="default">驳回</Button></Col>
                    </Row>
                  </div>
                  <Divider style={{ marginBottom: 15 }} />
                  <div className={styles.assets_content}>
                    <Row>
                      <Col span={10}>
                        <span >C3证书资料</span>
                      </Col>
                      <Col span={7}><Button type="primary">通过</Button></Col>
                      <Col span={7}><Button type="default">驳回</Button></Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
