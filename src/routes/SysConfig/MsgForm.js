import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './SysForm.less';

// import styles from './SysForm.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ msgDetail, loading }) => ({
  msgDetail,
  loading: loading.models.msgDetail,
}))

@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      action: '_OPEN',
      pageTitle: '公告详情',
    };
    if (!props.match.params || props.match.params.id === '' || props.match.params.id === undefined) {
      this.state.action = '_NEW';
      this.state.pageTitle = '新建公告';
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    if (this.props.match.params.id) {
      dispatch({
        type: 'msgDetail/fetch',
        payload: { id: this.props.match.params.id },
      });
    }
  }

  componentWillUnmount() {

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'msgDetail/saveMsg',
          payload: values,
        });
        this.setState({ action: '_OPEN' });
        this.setState({ pageTitle: '公告详情' });
      }
    });
  }

  render() {
    const { msgDetail: { data }, submitting } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 15 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
        md: { span: 12, offset: 5 },
      },
    };

    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '配置中心', href: '/sys-config?r=msg' }, { title: this.state.pageTitle }];
    return (
      <PageHeaderLayout title={this.state.pageTitle} breadcrumbList={breadcrumbList}>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark={this.state.action === '_OPEN'}
          style={{ marginTop: 8 }}
          layout="horizontal"
        >
          <FormItem
            {...formItemLayout}
            label="标题"
            className={styles.title}
          >
            {getFieldDecorator('title', {
              initialValue: this.state.action === '_NEW' ? null : data && data.title,
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input
                placeholder="标题"
                maxLength={20}
                disabled={this.state.action === '_OPEN'}
              />
            )}
          </FormItem>

          <FormItem
            label="正文"
            {...formItemLayout}
          >
            {getFieldDecorator('content', {
              initialValue: this.state.action === '_NEW' ? null : data && data.content,
              rules: [{
                required: true, message: '请输入正文',
              }],
            })(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder="正文"
                rows={10}
                disabled={this.state.action === '_OPEN'}
              />
            )}
          </FormItem>

          <FormItem {...submitFormLayout}>
            {
              this.state.action !== '_OPEN' && (
                <div>
                  <Button type="primary" htmlType="submit" loading={submitting}>保存</Button>
                  <a className={styles.bt_btn} style={{ marginLeft: 8 }} href="/#/sys-config?r=msg">取消</a>
                </div>
              )
            }
            {
              this.state.action === '_OPEN' && (
                <div>
                  <a className={styles.bt_btn} href="/#/sys-config?r=msg">返回</a>
                </div>
              )
            }
          </FormItem>
        </Form>
      </PageHeaderLayout>
    );
  }
}
