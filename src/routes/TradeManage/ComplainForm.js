import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Modal, Select } from 'antd';

// import styles from './Detail.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@connect(({ loading }) => ({
  loading: loading.effects['tradeIm/changeStatus'],
}))
@Form.create()
export default class ComplainForm extends PureComponent {
  state = {
    modalVisible: false,
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'tradeIm/changeStatus',
          payload: { id: this.props.id, ...values },
        });

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
    const { loading } = this.props;
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
        <Button type="primary" onClick={this.showModal} loading={loading}>{this.props.title}</Button>
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
              {getFieldDecorator('status', {
              rules: [{ required: true, message: '请选择审核结果' }],
            })(
              <Select placeholder="请选择" >
                <Option value="CANCELED">取消订单</Option>
                <Option value="DONE">释放比特币</Option>
              </Select>
            )}
            </Form.Item>
            <FormItem
              {...formItemLayoutTe}
            >
              {getFieldDecorator('content', {
                rules: [{
                  required: true, message: '请输入审核理由',
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
