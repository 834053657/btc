import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Button, Badge, Modal, Form, Input, Select } from 'antd';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';
import styles from './List.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['success', 'processing', 'error'];
const status = ['成功', '进行中', '失败'];

const isBlank = v => {
  if (v === undefined || v === '' || v === null) {
    return true;
  }
  else {
    return false;
  }
};

@connect(({ transferManage, loading }) => ({
  transfer: transferManage,
  loading: loading.models.transferManage,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
    showUpdate: false,
    isRequiredReason: false,
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transferManage/fetch',
    });
  }

  columns = [
    {
      title: '流水号',
      dataIndex: 'id',
      width: '80',
    },
    {
      title: '时间',
      dataIndex: 'create_time',
      width: '100',
    },
    {
      title: '国家',
      dataIndex: 'country',
      width: '80',
      render: val => <span>{!isBlank(val) ? CONFIG.countries[val] : '-'}</span>
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: '100',
      render: (v, r) => (
        <a href={`/#/user-detail/${r.userid}`}>{v}</a>
      ),
    },
    {
      title: '转账类型',
      dataIndex: 'transfer_type',
      width: '80',
      render: val => <span>{!isBlank(val) ? CONFIG.transfer_type[val] : '-'}</span>
    },
    {
      title: '收支类型',
      dataIndex: 'trade_direction',
      width: '60',
      render: val => <span>{!isBlank(val) ? CONFIG.transfer_direction[val] : '-'}</span>
    },
    {
      title: '金额',
      dataIndex: 'trade_count',
      width: '100',
    },
    {
      title: '广告费',
      dataIndex: 'ad_fee',
      width: '100',
    },
    {
      title: '手续费',
      dataIndex: 'service_fee',
      width: '100',
    },
    {
      title: '账户余额',
      dataIndex: 'available_btc',
      width: '100',
    },
    {
      title: '目标地址',
      dataIndex: 'to_address',
      width: '100',
    },
    {
      title: '订单号',
      dataIndex: 'order_id',
      width: '100',
      render: (v, r) => (
        <a href={`/#/trade-detail/${r.order_db_id}`}>{v}</a>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80',
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'allow_proceed',
      width: '80',
      render: val => <span>{!isBlank(val) ? CONFIG.tansfer_audit_status[val] : '-'}</span>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedDate',
      width: '120',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: '150',
    },
    {
      title: '操作人',
      dataIndex: 'actionBy',
      width: '80',
    },
    {
      title: '操作',
      width: '80',
      render: (r) => {
        if (r.allow_proceed === 0) {
          return (
            <Fragment>
              <a onClick={this.showModal}>审核</a>
            </Fragment>);
        } else { return null; }
      },
    },
  ];

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

    dispatch({
      type: 'transferManage/fetch',
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
    // console.log(values);
    let params = {};
    console.log(values);
    if (!isBlank(values.audit_status)) {
      params = { ...params, audit_status: values.audit_status };
    }
    if (!isBlank(values.trade_type)) {
      params = { ...params, trade_type: values.trade_type };
    }
    if (!isBlank(values.trade_direction)) {
      params = { ...params, trade_direction: values.trade_direction };
    }
    if (!isBlank(values.order_id)) {
      params = { ...params, order_id: values.order_id };
    }
    if (!isBlank(values.name)) {
      params = { ...params, name: values.name };
    }
    if (!isBlank(values.country)) {
      params = { ...params, country: values.country };
    }
    if (values.createdDt && values.createdDt.length > 1) {
      params = { ...params, begin_time: moment(values.createdDt[0]).format('YYYY-MM-DD HH:mm:ss'), end_time: moment(values.createdDt[1]).format('YYYY-MM-DD HH:mm:ss') };
    }

    this.setState({
      formValues: params,
    });

    dispatch({
      type: 'transferManage/fetch',
      payload: params,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.setState({
          showUpdate: false,
          isRequiredReason: false,
        });
      }
    });
  }

  showModal = () => {
    this.setState({
      showUpdate: true,
      isRequiredReason: false,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.handleSubmit(e);
    /* this.setState({
      showUpdateIDNo: false,
    }); */
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      showUpdate: false,
      isRequiredReason: false,
    });
  }

  changeReviewType =(e) => {
    console.log(e);
    if (e === '2') {
      this.setState({
        isRequiredReason: true,
      });
    } else {
      this.setState({
        isRequiredReason: false,
      });
    }
  }

  handleExportSVG = (values) => {
    const { dispatch } = this.props;
    // console.log(values);
    dispatch({
      type: 'transferManage/exportSVG',
      payload: values
    });
  }

  render() {
    const { transfer: { data }, loading, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { selectedRows } = this.state;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutTe = {
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
        md: { span: 0 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      },
    };

    const csvHeaders = [
      { label: '流水号', key: 'serialNo' },
      { label: '时间', key: 'actionDate' },
      { label: '国家', key: 'country' },
      { label: '用户名', key: 'userName' },
      { label: '转账类型', key: 'transferType' },
      { label: '收支类型', key: 'budgetType' },
      { label: '金额', key: 'amount' },
      { label: '广告费', key: 'adFee' },
      { label: '手续费', key: 'fee' },
      { label: '账户余额', key: 'balance' },
      { label: '目标地址', key: 'desAddr' },
      { label: '订单号', key: 'orderNo' },
      { label: '状态', key: 'status' },
      { label: '审核状态', key: 'reviewStatus' },
      { label: '更新时间', key: 'updatedDate' },
      { label: '备注', key: 'remark' },
      { label: '操作人', key: 'actionBy' },
    ];

    return (
      <PageHeaderLayout title="转账管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} {...this.props} onExportSVG={this.handleExportSVG} />
        </Card>
        <div className={styles.tableList}>
          <Card bordered={false}>
            <CustomTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleCustomTableChange}
              scroll={{ x: 2100 }}
            />
          </Card>
          <Modal
            title="提现审核"
            visible={this.state.showUpdate}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="保存"
            destroyOnClose
          >
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="审核结果" {...formItemLayout}>
                {getFieldDecorator('reviewResult', {
                  rules: [{ required: true, message: '请选择审核结果' }],
                })(
                  <Select placeholder="请选择" onChange={this.changeReviewType}>
                    <Option value="1">通过</Option>
                    <Option value="2">不通过</Option>
                  </Select>
                )}
              </Form.Item>
              {!this.state.isRequiredReason && (
              <FormItem
                {...formItemLayoutTe}
              >
                  {getFieldDecorator('reason', {
                    rules: [{
                      required: false, message: '请输入内容',
                    }],
                  })(
                    <TextArea style={{ minHeight: 32 }} placeholder="内容" rows={4} />
                  )}
              </FormItem>
)}
              {this.state.isRequiredReason && (
              <FormItem
                {...formItemLayoutTe}
              >
                  {getFieldDecorator('reason', {
                    rules: [{
                      required: true, message: '请输入内容',
                    }],
                  })(
                    <TextArea style={{ minHeight: 32 }} placeholder="内容" rows={4} />
                  )}
              </FormItem>
)}
            </Form>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}
