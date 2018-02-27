import React, { Component } from 'react';
import { Row, Col, Form, Input, Select, Button, DatePicker } from 'antd';
import { map } from 'lodash';
import { routerRedux } from 'dva/router';
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

      let values = {
        ...fieldsValue,
      };

      if (this.props.onSearch) {
        if (values.date && values.date.length === 2) {
          values.begin_time = values.date[0].format('YYYY-MM-DD');
          values.end_time = values.date[1].format('YYYY-MM-DD');
          delete values.date;
        }
        if (values.pay_methods) {
          values.pay_methods = values.pay_methods.join(',');
        }
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
    const { dispatch, form: { getFieldDecorator }, data: { reporting_count = 0 } } = this.props;
    return (
      <Form onSubmit={this.submit} layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="广告类型">
              {getFieldDecorator('type')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.ad_type, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="广告状态">
              {getFieldDecorator('status')(
                <Select allowClear placeholder="请选择" style={{ width: '100%' }}>
                  {
                    map(CONFIG.ad_status, (text, value) => {
                      return <Option key={value} value={value}>{text}</Option>;
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={15} sm={24}>
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
            {getFieldDecorator('pay_methods')(
              <TagSelect ref={node => this.tag = node}>
                {
                  map(CONFIG.pay_methods, (text, value) => {
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
          <Button style={{ marginLeft: 8 }} onClick={() => dispatch(routerRedux.push('/complain-list'))}>被举报的广告({reporting_count})</Button>
        </div>
      </Form>
    );
  }
}

