import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';

import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = [1, 2, 3];
const status = ['正常', '冻结', '被举报'];
const columns = [
  {
    title: '编号',
    dataIndex: 'adNo',
    width: 100,
  },
  {
    title: '类型',
    dataIndex: 'tradeType',
    width: 100,
  },
  {
    title: '国家',
    dataIndex: 'tradeType',
    width: 80,
  },
  {
    title: '创建人',
    dataIndex: 'tradeType',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'tradeType',
    width: 100,
  },
  {
    title: '付款方式',
    dataIndex: 'tradeType',
    width: 100,
  },
  {
    title: '交易价格',
    dataIndex: 'price',
    align: 'right',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 100,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '更新时间',
    dataIndex: 'createdAt',
    width: 100,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '操作人',
    dataIndex: 'createdAt',
    width: 100,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '操作栏',
    width: 200,
    render: () => (
      <Fragment>
        <a href="">查看</a>
      </Fragment>
    ),
  },
];

@connect(({ adManage, loading }) => ({
  data: adManage.data,
  loading: loading.models.adManage,
}))
export default class TableList extends PureComponent {
  // state = {
  //   selectedRows: [],
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adManage/fetch',
    });
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
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
      type: 'adManage/fetch',
      payload: params,
    });
  }

  handleSearch = (values) => {
    const { dispatch } = this.props;
    // console.log(values);
    dispatch({
      type: 'adManage/fetch',
      payload: values,
    });
  }

  render() {
    const { data: { list, pagination }, loading } = this.props;

    return (
      <PageHeaderLayout title="广告管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} />
        </Card>
        <div className={styles.tableList}>
          <Card bordered={false}>
            <Table
              loading={loading}
              rowKey={record => record.key}
              dataSource={list}
              scroll={{ x: 1300 }}
              columns={columns}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>

        </div>
      </PageHeaderLayout>
    );
  }
}