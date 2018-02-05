import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, Button, Card, InputNumber, Modal, Select
} from 'antd';

import styles from './Detail.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    showUpdate: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.setState({
          showUpdate: false,
        });
      }
    });
  }

  showModal = () => {
    this.setState({
      showUpdate: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.handleSubmit(e);
    /*this.setState({
      showUpdateIDNo: false,
    });*/
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      showUpdate: false,
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

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
    const formItemLayoutTe = {
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


    return (
      <div>
        <Button onClick={this.showModal} loading={submitting}>审核</Button>
        <Modal
          title={this.props.title}
          visible={this.state.showUpdate}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
        >
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="审核结果" {...formItemLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择审核结果' }],
            })(
              <Select placeholder="请选择">
                <Option value="1">通过</Option>
                <Option value="2">不通过</Option>
              </Select>
            )}
          </Form.Item>
          <FormItem
              {...formItemLayoutTe}
            >
              {getFieldDecorator('reason', {
                rules: [{
                  required: true, message: '请输入内容',
                }],
              })(
                <TextArea style={{ minHeight: 32 }} placeholder="内容" rows={4} />
              )}
            </FormItem>
        </Form>
      </Modal>
    </div>
    );
  }
}
