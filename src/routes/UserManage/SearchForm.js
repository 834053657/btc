import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Button } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
// import moment from 'moment';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const { Option } = Select;
// const status = ['待认证', '认证中', '已认证', '认证驳回'];
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

  render() {
    const { getFieldDecorator } = this.props.form;

    const countryList = [];
    countryList.push(<Option key="1" value="1">中国</Option>);
    countryList.push(<Option key="2" value="2">英国</Option>);
    countryList.push(<Option key="3" value="3">美国</Option>);

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="创建时间">
              {getFieldDecorator('createdDt')(
                <RangePicker
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <StandardFormRow title="用户状态" block>
          <FormItem>
            {getFieldDecorator('status')(
              <TagSelect onChange={this.handleFormSubmit}>
                <TagSelect.Option value="0">未认证</TagSelect.Option>
                <TagSelect.Option value="1">认证中</TagSelect.Option>
                <TagSelect.Option value="2">已认证</TagSelect.Option>
                <TagSelect.Option value="3">驳回</TagSelect.Option>
              </TagSelect>
                )}
          </FormItem>
        </StandardFormRow>
        <div className="btn-box">
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          <Button style={{ marginLeft: 8 }} loading={this.props.loading} onClick={this.props.onSearchPending}>{this.props.pendingText}</Button>
        </div>
      </Form>
    );
  }
}

