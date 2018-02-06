import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Button } from 'antd';

import styles from './Register.less';

const FormItem = Form.Item;

@connect(({ forget, loading }) => ({
  forget,
  submitting: loading.effects['forget/submit'],
}))
@Form.create()
export default class Forget extends Component {
  state = {
  };

  componentWillUnmount() {

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'forget/submit',
          payload: {
            ...values,
            prefix: this.state.prefix,
          },
        });
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <h3>重置密码</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('mail', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(<Input size="large" placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              发送重置密码邮件
            </Button>
            <Link className={styles.login} to="/user/login">
              返回
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
