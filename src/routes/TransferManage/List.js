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
const statusMap = [1, 2, 3];
const status = ['待处理', '已确认', '已驳回'];
const columns = [
  {
    title: '用户名',
    sorter: true,
    dataIndex: 'userName',
    width: '20%',
  },
  {
    title: 'BTC',
    sorter: true,
    dataIndex: 'btc',
    align: 'right',
    width: '20%',
  },
  {
    title: '目标',
    sorter: true,
    dataIndex: 'goal',
    width: '20%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: [
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
    ],
    width: '20%',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '操作',
    width: '20%',
    render: () => (
      <Fragment>
        <a href="">确认</a>
        <Divider type="vertical" />
        <a href="">驳回</a>
      </Fragment>
    ),
  },
];

@connect(({ transfer_manage, loading }) => ({
  transfer: transfer_manage,
  loading: loading.models.transfer_manage,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transfer_manage/fetch',
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
      type: 'transfer_manage/fetch',
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
      type: 'transfer_manage/fetch',
      payload: values,
    });
  }

  render() {
    const { transfer: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout title="交易管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} />
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
            />
          </Card>

        </div>
      </PageHeaderLayout>
    );
  }
}
