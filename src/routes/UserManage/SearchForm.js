import React, { Component } from 'react';
import { map } from 'lodash';
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
    this.tag.onSelectAll(false);
    if (this.props.onSearch) {
      this.props.onSearch({});
    }
  }

  render() {
    const { form: { getFieldDecorator }, user: { pendingData: { auth_count } } } = this.props;

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
        <StandardFormRow title="用户状态" block>
          <FormItem>
            {getFieldDecorator('status')(
              <TagSelect ref={node => this.tag = node}>
                {
                  map(CONFIG.auth_status, (text, value) => {
                    return <TagSelect.Option key={value} value={`${value}`}>{text}</TagSelect.Option>;
                  })
                }
              </TagSelect>
            )}
          </FormItem>
        </StandardFormRow>
        <div className="btn-box">
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => this.props.onSearch({ status: [1] })}>待审核用户 ({auth_count || 0})</Button>
        </div>
      </Form>
    );
  }
}

