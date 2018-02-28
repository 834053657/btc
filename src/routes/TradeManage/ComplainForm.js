import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import { Form, Input, Button, Modal, Select } from 'antd';

// import styles from './Detail.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()
export default class ComplainForm extends PureComponent {
  state = {
    modalVisible: false,
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        // dispatch({
        //   type: 'userDetail/complain',
        //   payload: { id: this.props.uid, auth_level: this.props.authLevel, auth_status: values.auth_status, auth_log: values.reason },
        // });

        this.handleCancel();
      }
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  }


  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      modalVisible: false,
    });
  }
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
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
        <Button type="primary" onClick={this.showModal} loading={submitting}>{this.props.title}</Button>
        <Modal
          title="申诉处理"
          visible={this.state.modalVisible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          maskClosable={false}
          afterClose={this.props.onClosed}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="审核结果" {...formItemLayout}>
              {getFieldDecorator('auth_status', {
              rules: [{ required: true, message: '请选择审核结果' }],
            })(
              <Select placeholder="请选择" >
                <Option value="2">取消订单</Option>
                <Option value="3">释放比特币</Option>
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
            <div className="btn-box">
              <Button type="primary" htmlType="submit">保存</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>取消</Button>
            </div>
          </Form>
        </Modal>
      </div>
    );
  }
}
