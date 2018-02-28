import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Card, Select, Radio, Badge, Divider } from 'antd';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import styles from './SysForm.less';
import SearchForm from './SearchForm';
import styles from './SysForm.less';

const FormItem = Form.Item;
const { Option } = Select;
// const { Option } = Select;
// const { RangePicker } = DatePicker;
// const { TextArea } = Input;

const isBlank = (v) => {
  if (v === undefined || v === '' || v === null) {
    return true;
  } else { return false; }
};

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'success'];
const status = ['未发布', '已发布'];

@connect(({ sysConfig, loading }) => ({
  sysConfig,
  submitting: loading.effects['sysConfig/submitForm'],
  loadingMsg: loading.effects['sysConfig/fetchMsgList'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFeeSetting: false,
      showMsgSetting: false,
      action: '_OPEN',
      selectedRows: [],
      showMaxFee: false,
    };
    if (props.location.search) {
      this.state.showFeeSetting = false;
      this.state.showMsgSetting = true;
      this.moduleValue = '2';
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'sysConfig/fetchMsgList',
    });
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: '20%',
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: '25%',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '20%',
      render(val) {
        return <Badge status={statusMap[val]} text={!isBlank(val) ? CONFIG.announcement_status[val] : '-'} />;
      },
    },
    {
      title: '操作',
      width: '15%',
      render: r => (
        <Fragment>
          <a href={`/#/msg-detail/${r.id}`}>查看</a>
          <Divider type="vertical" />
          {
            r.status === 0 &&
            <a onClick={() => this.releaseMsg(r.id)}>发布</a>
          }
        </Fragment>
      ),
    },
  ];

  releaseMsg = (id) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'sysConfig/releaseMsg',
      payload: {
        id,
        status: 1
      },
      callback: this.refreshGrid
    });
  }

  refreshGrid = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'sysConfig/fetchMsgList',
      payload: {},
    });
  }

  changeModule = (value) => {
    const { dispatch } = this.props;

    if (value === '1') {
      this.setState({ showFeeSetting: true, showMsgSetting: false });
      dispatch({
        type: 'sysConfig/fetchFee',
      });
    } else if (value === '2') {
      this.setState({ showFeeSetting: false, showMsgSetting: true });
    } else {
      this.setState({ showFeeSetting: false, showMsgSetting: false });
    }
    this.moduleValue = value;
  }

  changeFeeType = (e) => {
    if (e.target.value === '1') {
      this.props.sysConfig.feeData.fee_limit = 0;
      this.setState({ showMaxFee: false });
    } else if (e.target.value === '2') {
      this.setState({ showMaxFee: true });
    } else {
      this.setState({ showMaxFee: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'sysConfig/saveFee',
          payload: { fee: parseFloat(values.fee, 10), fee_limit: parseFloat(values.fee_limit, 10) },
        });
        this.setState({ action: '_OPEN' });
      }
    });
  }

  editFeeSetting = () => {
    this.setState({ action: '_EDIT' });
  }

  handleCustomTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      page: pagination.current,
      page_size: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    // const qParams = params;
    dispatch({
      type: 'sysConfig/fetchMsgList',
      payload: params,
    });
  }


  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (values) => {
    const { dispatch } = this.props;
    this.setState({
      formValues: values,
    });
    dispatch({
      type: 'sysConfig/fetchMsgList',
      payload: values,
    });
  }

  checkFeeFormat = (rule, value, callback) => {
    const form = this.props.form;
    let regx = /^[0-9]+(.[0-9]+)?$/;

    if (value && !regx.test(value)) {
      callback('请输入正确的数字格式');
    } else {
      callback();
    }
  }


  render() {
    const { sysConfig: { data, feeData }, submitting, loadingMsg } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows } = this.state;

    if (feeData && feeData.fee_limit > 0) {
      this.setState({
        showMaxFee: true,
      });
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    return (
      <PageHeaderLayout title="配置中心">
        <Card>
          <span style={{ marginRight: 10 }}>模块</span>
          <Select placeholder="请选择" style={{ width: 200 }} onChange={this.changeModule} value={this.moduleValue}>
            <Option value="1">交易费率设置</Option>
            <Option value="2">消息设置</Option>
          </Select>
        </Card>
        {
          this.state.showFeeSetting && (
            <Card bordered={false}>
              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark={false}
                style={{ marginTop: 8 }}
              >
                <FormItem
                  {...formItemLayout}
                  label="交易费率设置"
                >
                  {getFieldDecorator('fee', {
                    initialValue: feeData && feeData.fee,
                    rules: [{
                      required: true, message: '请输入交易费率',
                    }, {
                      validator: this.checkFeeFormat,
                    }],
                  })(
                    <Input
                      placeholder="交易费率"
                      disabled={this.state.action === '_OPEN'}
                      // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="交易费上限"
                >
                  {getFieldDecorator('fee_type', {
                    initialValue: feeData ? (feeData.fee_limit > 0 ? '2' : '1') : null,
                    rules: [{
                      required: true, message: '请选择交易费上限',
                    }],
                  })(
                    <Radio.Group disabled={this.state.action === '_OPEN'} onChange={this.changeFeeType}>
                      <Radio value="1">无上限</Radio>
                      <Radio value="2">有上限</Radio>
                    </Radio.Group>
                  )}
                </FormItem>

                {
                  this.state.showMaxFee && (
                    <FormItem
                      {...formItemLayout}
                      label="交易费上限"
                    >
                      {getFieldDecorator('fee_limit', {
                        initialValue: feeData && feeData.fee_limit,
                        rules: [{
                          required: true, message: '请输入交易费上限',
                        }, {
                          validator: this.checkFeeFormat,
                        }],
                      })(
                        <Input
                          placeholder="交易费上限"
                          disabled={this.state.action === '_OPEN'}
                          // formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          // parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      )}
                    </FormItem>
                  )
                }

                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  {this.state.action === '_OPEN' && <Button onClick={this.editFeeSetting}>修改</Button>}
                  {this.state.action !== '_OPEN' && <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" loading={submitting}>保存</Button>}
                </FormItem>
              </Form>
            </Card>
          )
        }
        {
          this.state.showMsgSetting && (
            <Card bordered={false}>
              <Card>
                <SearchForm onSearch={this.handleSearch} />
              </Card>
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <a className={styles.bt_btn_primary} href="/#/msg-detail-new">新建公告</a>
                </div>
                <CustomTable
                  selectedRows={selectedRows}
                  loading={loadingMsg}
                  data={data}
                  columns={this.columns}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleCustomTableChange}
                />
              </div>
            </Card>
          )
        }
      </PageHeaderLayout>
    );
  }
}
