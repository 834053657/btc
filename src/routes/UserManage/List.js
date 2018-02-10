import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Button,
  Badge,
} from 'antd';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';

import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['未认证', '认证中', '已认证', '驳回'];
const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: '100',
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: '100',
  },
  {
    title: '手机号码',
    dataIndex: 'phoneno',
    width: '100',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '100',
  },
  {
    title: '用户状态',
    dataIndex: 'auth_status',
    width: '100',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: '80',
    //render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  }, {
    title: '更新时间',
    dataIndex: 'update_time',
    width: '80',
    //render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  }, {
    title: '国家',
    dataIndex: 'country',
    width: '100',
    // render: val => `${val} 万`,
    // mark to display a total number
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '150',
    // render: val => `${val} 万`,
    // mark to display a total number
  },
  {
    title: '操作',
    width: '100',
    render: r => (
      <Fragment>
        <a href={`/#/user-detail/${r.id}`}>查看</a>
      </Fragment>
    ),
  },
];

@connect(({ userManage, loading }) => ({
  user: userManage,
  loading: loading.models.userManage,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetch',
      payload: { isSearchPending: false },
    });
  }

  handlePendingReview = () => {
    const { dispatch } = this.props;
    this.isSearchPending = true;
    dispatch({
      type: 'userManage/fetch',
      payload: { status: 0, isSearchPending: true },
    });
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
      type: 'userManage/fetch',
      payload: this.isSearchPending ? { page: pagination.current, page_size: pagination.pageSize, isSearchPending: true } : { ...params, isSearchPending: false },
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
    this.isSearchPending = false;
    this.setState({
      formValues: values,
    });
    dispatch({
      type: 'userManage/fetch',
      payload: { ...values, isSearchPending: false },
    });
  }

  render() {
    const { user: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    let pendingBtnTxt = '';
    if (data && data.isSearchPending) {
      // console.log(data.list.length);
      pendingBtnTxt += `待审核用户 (${data.list.length})`;
    } else { pendingBtnTxt = '待审核用户'; }

    return (
      <PageHeaderLayout title="用户管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} pendingText={pendingBtnTxt} onSearchPending={this.handlePendingReview} />
        </Card>
        <div className={styles.tableList}>
          <Card bordered={false}>

            <CustomTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleCustomTableChange}
              scroll={{ x: 1200 }}
            />
          </Card>

        </div>
      </PageHeaderLayout>
    );
  }
}
