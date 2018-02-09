import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
// import moment from 'moment';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const { Option } = Select;
// const RangePicker = DatePicker.RangePicker;
const { RangePicker } = DatePicker;

@Form.create()
export default class SearchForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formValues: {},
  //   };
  // }

  submit = (e) => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      // this.setState({
      //   formValues: values,
      // });

      if (this.props.onSearch) {
        this.props.onSearch(values);
      }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    // this.setState({
    //   formValues: {},
    // });
    if (this.props.onSearch) {
      this.props.onSearch({});
    }
  }

  exportToCSV = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      if (this.props.onSearch) {
        this.props.onExport(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const transferTypeList = [];
    transferTypeList.push(<Option key="1" value="1">钱包充值</Option>);
    transferTypeList.push(<Option key="2" value="2">钱包提现</Option>);
    transferTypeList.push(<Option key="3" value="3">交易转账</Option>);
    transferTypeList.push(<Option key="4" value="4">非交易转账</Option>);

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('reviewType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">待审核</Option>
                  <Option value="2">已通过</Option>
                  <Option value="3">已驳回</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="转账类型">
              {getFieldDecorator('transferType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {transferTypeList}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="收支类型">
              {getFieldDecorator('budgetType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">转入</Option>
                  <Option value="1">转出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('orderNo')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('userName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="国家">
              {getFieldDecorator('country')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createdDt')(
                <RangePicker
                  format="YYYY/MM/DD"
                />
              )}
            </FormItem>
          </Col>


        </Row>
        <div className="btn-box">
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.props.onSearchPending}>{this.props.pendingText}</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.exportToCSV}>导出</Button>
        </div>
      </Form>
    );
  }
}

