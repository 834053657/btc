import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Button, Badge, Modal, Form, Input, Select } from 'antd';
import {CSVLink} from 'react-csv';
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
const reviewStatusMap = ['default', 'success', 'error'];
const reviewStatus = ['待审核', '已通过', '已驳回'];


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
      dataIndex: 'serialNo',
      sorter: true,
      width: '80',
    },
    {
      title: '时间',
      dataIndex: 'actionDate',
      sorter: true,
      width: '100',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '国家',
      dataIndex: 'country',
      sorter: true,
      width: '80',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      sorter: true,
      width: '100',
      render: (v, r) => (
        <a href={`/#/user-detail/${r.id}`}>{v}</a>
      ),
    },
    {
      title: '转账类型',
      dataIndex: 'transferType',
      sorter: true,
      width: '80',
    },
    {
      title: '收支类型',
      dataIndex: 'budgetType',
      sorter: true,
      width: '60',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      sorter: true,
      width: '100',
    },
    {
      title: '广告费',
      dataIndex: 'adFee',
      sorter: true,
      width: '100',
    },
    {
      title: '手续费',
      dataIndex: 'fee',
      sorter: true,
      width: '100',
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      sorter: true,
      width: '100',
    },
    {
      title: '目标地址',
      dataIndex: 'desAddr',
      sorter: true,
      width: '100',
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      sorter: true,
      width: '100',
      render: (v) => (
        <a href={`/#/order-detail/${v}`}>{v}</a>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '80',
      sorter: true,
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      width: '80',
      sorter: true,
      render(val) {
        return <Badge status={reviewStatusMap[val]} text={reviewStatus[val]} />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedDate',
      sorter: true,
      width: '120',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      sorter: true,
      width: '150',
    },
    {
      title: '操作人',
      dataIndex: 'actionBy',
      sorter: true,
      width: '80',
    },
    {
      title: '操作',
      width: '80',
      render: (r) => {
        if (r.reviewStatus === 0) {
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
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
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
    dispatch({
      type: 'transferManage/fetch',
      payload: values,
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

  handlePendingReview = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'transferManage/fetchPendingCount',
      payload: {},
    });
  }

  handleExport = (values) => {
    const { dispatch } = this.props;
    this.isExport = true;
    dispatch({
      type: 'transferManage/exportToCSV',
      payload: values,
    });
  }


  render() {
    const { transfer: { data, count, csvData }, loading } = this.props;
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

    let pendingBtnTxt = '';
    if (count !== undefined && count !== null & count !== '') {
      pendingBtnTxt = `待审核 (${count})`;
    } else { pendingBtnTxt = '待审核'; }

    const headers = [
      {label: 'First Name', key: 'firstname'},
      {label: 'Last Name', key: 'lastname'},
      {label: 'Email', key: 'email'},
    ];

    const csvData2 = csvData || []
    if(csvData2 && this.isExport === true) {
      this.isExport = false;
      this.exportElement && this.exportElement.click()
    }

    const csvHeaders = [
      {label: '流水号', key: 'serialNo'},
      {label: '时间', key: 'actionDate'},
      {label: '国家', key: 'country'},
      {label: '用户名', key: 'userName'},
      {label: '转账类型', key: 'transferType'},
      {label: '收支类型', key: 'budgetType'},
      {label: '金额', key: 'amount'},
      {label: '广告费', key: 'adFee'},
      {label: '手续费', key: 'fee'},
      {label: '账户余额', key: 'balance'},
      {label: '目标地址', key: 'desAddr'},
      {label: '订单号', key: 'orderNo'},
      {label: '状态', key: 'status'},
      {label: '审核状态', key: 'reviewStatus'},
      {label: '更新时间', key: 'updatedDate'},
      {label: '备注', key: 'remark'},
      {label: '操作人', key: 'actionBy'},
    ];

    return (
      <PageHeaderLayout title="转账管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} onExport={this.handleExport} />
        </Card>
        <div className={styles.tableList}>
          <Card bordered={false}>
            <div className={styles.tableListOperator}>
              <Button onClick={this.handlePendingReview}>{pendingBtnTxt}</Button>
              <div style={{ display: 'none' }}>
                <CSVLink data={csvData2} headers={csvHeaders} filename={"transfer_list.csv"} target="_blank">
                  <span ref={input => this.exportElement = input} >export</span>
                </CSVLink>
              </div>
            </div>
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
