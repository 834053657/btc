import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SysForm.less';
import MsgForm from './MsgForm.js';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
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

    return (
      <PageHeaderLayout title="系统配置">
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark={false}
            style={{ marginTop: 8 }}
            layout='inline'
            ref={(form) => this.form1 = form}
          >
            <FormItem
              {...formItemLayout}
              label="平台手续费"
            >
              {getFieldDecorator('fee', {
                rules: [{
                  required: true, message: '请输入平台手续费',
                }],
              })(
                <Input
                  placeholder="手续费"
                  prefix='$'
                  //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  //parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              )}
            </FormItem>

            <FormItem {...submitFormLayout}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                保存
              </Button>
            </FormItem>
          </Form>
        </Card>
        <Card bordered={false}>
          <MsgForm submitting={submittingMsg}  dispatch={this.props.dispatch}/>
        </Card>
      </PageHeaderLayout>
    );
  }
}
