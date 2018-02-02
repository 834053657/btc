import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, InputNumber,
} from 'antd';

import styles from './SysForm.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'sys_config/submitFormMsg',
          payload: values,
        });
      }
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
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
        sm: { span: 24, offset: 0 },
      },
    };

    return (
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
            layout='horizontal'
          >
            <FormItem
              {...formItemLayout}
            >
              {getFieldDecorator('message', {
                rules: [{
                  required: true, message: '请输入内容',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="内容" rows={4} />
              )}
            </FormItem>

            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                发送
              </Button>
            </FormItem>
          </Form>
    );
  }
}
