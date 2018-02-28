import React, { PureComponent } from 'react';
// import { connect } from 'dva';
import { Form, Input, Button, Modal, Select } from 'antd';

// import styles from './Detail.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()
export default class BasicForms extends PureComponent {
  state = {
    showUpdate: false,
    showReason: false,
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'userDetail/updateAuthResult',
          payload: { id: this.props.uid, auth_level: this.props.authLevel, auth_status: values.auth_status, auth_log: values.reason },
        });

        this.setState({
          showUpdate: false,
          showReason: false,
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
    /* this.setState({
      showUpdateIDNo: false,
    }); */
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      showUpdate: false,
      showReason: false,
    });
  }

  changeAuthResult = (value) => {
    if (value === '2') {
      this.setState({ showReason: false });
    } else if (value === '3') {
      this.setState({ showReason: true });
    } else {
      this.setState({ showReason: false });
    }
  }

  closeModal = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'userDetail/fetch',
      payload: { id: this.props.uid },
    });
  }

  render() {
    const { submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

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
        <Button onClick={this.showModal} disabled={!this.props.authInfo} loading={submitting}>审核</Button>
        <Modal
          title={this.props.title}
          visible={this.state.showUpdate}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="保存"
          destroyOnClose
          maskClosable={false}
          afterClose={this.closeModal}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="审核结果" {...formItemLayout}>
              {getFieldDecorator('auth_status', {
              rules: [{ required: true, message: '请选择审核结果' }],
            })(
              <Select placeholder="请选择" onChange={this.changeAuthResult}>
                <Option value="2">通过</Option>
                <Option value="3">不通过</Option>
              </Select>
            )}
            </Form.Item>
            {
              this.state.showReason && (
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
              )
            }
          </Form>
        </Modal>
      </div>
    );
  }
}
