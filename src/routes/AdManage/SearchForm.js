import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button, DatePicker } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './SearchForm.less';

const FormItem = Form.Item;
const { Option } = Select;
// const status = ['正常', '冻结', '被举报'];
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

      if (this.props.onSearch) {
        this.props.onSearch(values);
      }
    });
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();

    if (this.props.onSearch) {
      this.props.onSearch({});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="广告类型">
              {getFieldDecorator('country')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">买入</Option>
                  <Option value="1">卖出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="广告状态">
              {getFieldDecorator('country')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">买入</Option>
                  <Option value="1">卖出</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="国家">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
        <StandardFormRow title="支付方式" block>
          <FormItem>
            {getFieldDecorator('status')(
              <TagSelect onChange={this.handleFormSubmit}>
                <TagSelect.Option value="cat1">正常</TagSelect.Option>
                <TagSelect.Option value="cat2">冻结</TagSelect.Option>
                <TagSelect.Option value="cat3">被举报</TagSelect.Option>
              </TagSelect>
            )}
          </FormItem>
        </StandardFormRow>
        <div className="btn-box">
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
        </div>
      </Form>
    );
  }
}

