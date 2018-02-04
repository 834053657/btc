import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Button,
  Badge,
  Divider,
} from 'antd';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';

import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = [1, 2, 3, 4];
const status = ['待认证', '认证中', '已认证', '认证驳回'];
const columns = [
  {
    title: '用户ID',
    sorter: true,
    dataIndex: 'no',
    width: '10%',
  },
  {
    title: '用户名',
    sorter: true,
    dataIndex: 'owner',
    width: '9%',
  },
  {
    title: '手机号码',
    sorter: true,
    dataIndex: 'callNo',
    width: '12%',
  },
  {
    title: '邮箱',
    sorter: true,
    dataIndex: 'email',
    width: '10%',
  },
  {
    title: '用户状态',
    dataIndex: 'status',
    sorter: true,
    /*filters: [
      {
        text: status[0],
        value: 0,
      },
      {
        text: status[1],
        value: 1,
      },
      {
        text: status[2],
        value: 2,
      },
      {
        text: status[3],
        value: 3,
      },
    ],*/
    width: '10%',
    /*render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },*/
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    sorter: true,
    width: '12%',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  }, {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true,
    width: '12%',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  }, {
    title: '国家',
    dataIndex: 'country',
    sorter: true,
    width: '10%',
    //render: val => `${val} 万`,
    // mark to display a total number
  },
  {
    title: '备注',
    dataIndex: 'country',
    sorter: true,
    width: '8%',
    //render: val => `${val} 万`,
    // mark to display a total number
  },
  {
    title: '操作',
    width: '9%',
    render: (r) => (
        <Fragment>
          <a href={'/#/user-detail/' + r.id}>查看</a>
        </Fragment>
    ),
  },
];

@connect(({ user_manage, loading }) => ({
  user: user_manage,
  loading: loading.models.user_manage,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user_manage/fetch',
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
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'user_manage/fetch',
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
    console.log(values);
    dispatch({
      type: 'user_manage/fetch',
      payload: values,
    });
  }

  render() {
    const { user: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout title="用户管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} />
        </Card>
        <div className={styles.tableList}>
          <Card bordered={false}>
            <div className={styles.tableListOperator}>
              <Button>待审核用户 (11)</Button>
            </div>
            <CustomTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleCustomTableChange}
            />
          </Card>

        </div>
      </PageHeaderLayout>
    );
  }
}
