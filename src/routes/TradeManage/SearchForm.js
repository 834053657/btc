import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
// import moment from 'moment';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const { Option } = Select;
// const status = ['未付款', '申诉中', '已处理'];
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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="交易单号">
              {getFieldDecorator('tradeNo')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="交易类型">
              {getFieldDecorator('tradeType')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">买入</Option>
                  <Option value="1">卖出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('date')(
                <RangePicker
                  format="YYYY/MM/DD"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <StandardFormRow title="交易状态" block>
          <FormItem>
            {getFieldDecorator('status')(
              <TagSelect onChange={this.handleFormSubmit}>
                <TagSelect.Option value="cat1">未付款</TagSelect.Option>
                <TagSelect.Option value="cat2">申诉中</TagSelect.Option>
                <TagSelect.Option value="cat3">已处理</TagSelect.Option>
              </TagSelect>
            )}
          </FormItem>
        </StandardFormRow>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          </span>
        </div>
      </Form>
    );
  }
}

