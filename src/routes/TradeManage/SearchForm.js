import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button, Modal } from 'antd';
// import moment from 'moment';
import { map } from 'lodash';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@Form.create()
export default class SearchForm extends Component {
  // constructor(props) {
  //   super(props);
  // }

  submit = (e) => {
    e.preventDefault();

    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let values = {
        ...fieldsValue,
      };

      if (this.props.onSearch) {
        if (values.date && values.date.length === 2) {
          values.begin_time = values.date[0].format('YYYY-MM-DD');
          values.end_time = values.date[1].format('YYYY-MM-DD');
          delete values.date;
        }
        this.props.onSearch(values);
      }
    });
  }

  handleExport = () => {
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let values = {
        ...fieldsValue,
      };

      if (this.props.onExportSVG) {
        if (values.date && values.date.length === 2) {
          values.begin_time = values.date[0].format('YYYY-MM-DD');
          values.end_time = values.date[1].format('YYYY-MM-DD');
          delete values.date;
          this.props.onExportSVG(values);
        } else {
          Modal.info({
            title: '提示',
            content: '请选择创建时间的起止.'
          });
        }
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

  render() {
    const { onSearch, complaint_count, form: { getFieldDecorator } } = this.props;

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="交易单号">
              {getFieldDecorator('order_id')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="交易类型">
              {getFieldDecorator('trade_type')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.trade_type, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="交易状态">
              {getFieldDecorator('status')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.trade_status, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="广告ID">
              {getFieldDecorator('match_id')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="交易发起人">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('date')(
                <RangePicker
                  allowClear
                  format="YYYY/MM/DD"
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => this.props.onSearch({ status: 'COMPLAINT' })}>申述中（{complaint_count || 0}）</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleExport}>导出</Button>
        </div>
      </Form>
    );
  }
}

