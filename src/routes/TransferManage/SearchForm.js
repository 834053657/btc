import React, { Component } from 'react';
import { map } from 'lodash';
import { Row, Col, Form, Input, Select, DatePicker, Button, Modal } from 'antd';
import moment from 'moment';
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
      // if (err) return;

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
    //  formValues: {},
    // });
    if (this.props.onSearch) {
      this.props.onSearch({});
    }
  }

  handleExport = () => {
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      // if (err) return;

      let values = {
        ...fieldsValue,
      };

      if (this.props.onExportSVG) {
        if (values.createdDt && values.createdDt.length === 2) {
          values.begin_time = values.createdDt[0].format('YYYY-MM-DD');
          values.end_time = values.createdDt[1].format('YYYY-MM-DD');
          delete values.createdDt;
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

  render() {
    const { form: { getFieldDecorator }, transfer: { data: { need_audit_count } } } = this.props;

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="审核状态">
              {getFieldDecorator('audit_status')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.tansfer_audit_status, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="转账类型">
              {getFieldDecorator('trade_type')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.transfer_type, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="收支类型">
              {getFieldDecorator('trade_direction')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.transfer_direction, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('order_id')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="国家">
              {getFieldDecorator('country')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.countries, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createdDt')(
                <RangePicker
                  showTime
                  allowClear
                  format="YYYY/MM/DD HH:mm:ss"
                />
              )}
            </FormItem>
          </Col>


        </Row>
        <div className="btn-box">
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => this.props.onSearch({ audit_status: 0 })}>待审核（{need_audit_count || 0})</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleExport}>导出</Button>
        </div>
      </Form>
    );
  }
}

