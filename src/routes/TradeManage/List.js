import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Card, Badge, Button } from 'antd';
import { routerRedux } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';

import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const columns = [
  {
    title: '订单编号',
    dataIndex: 'order_id',
    width: 120,
  },
  {
    title: '交易类型',
    dataIndex: 'trade_type',
    width: 100,
    render: val => <span>{val ? CONFIG.trade_type[val] : '-'}</span>

  },
  {
    title: '广告ID',
    dataIndex: 'match_id',
    width: 110,
  },
  {
    title: '交易发起人',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '交易状态',
    dataIndex: 'order_status',
    width: 100,
    render: val => <span>{val ? CONFIG.trade_status[val] : '-'}</span>
  },
  {
    title: '法币',
    dataIndex: 'deal_cny',
    width: 150,
    render: val => <span>{val} BTC</span>
  },
  {
    title: '交易金额',
    dataIndex: 'deal_btc',
    width: 150,
    render: val => <span>{val} BTC</span>
  },
  {
    title: '交易费',
    dataIndex: 'deal_price',
    width: 100,
    render: val => <span>{val} BTC</span>
  },
  {
    title: '总金额',
    dataIndex: 'deal_total',
    width: 150,
    render: val => <span>{val} BTC</span>
  },
  {
    title: '汇率',
    dataIndex: 'price',
    width: 150,
    render: val => <span>{val} BTC</span>
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    align: 'center',
    width: 250,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '更新时间',
    dataIndex: 'update_at',
    align: 'center',
    width: '250px',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '操作人',
    dataIndex: 'operator_name',
    width: 100,
  },
  {
    title: '操作',
    width: 100,
    render: r => (
      <Fragment>
        <a href={`/#/trade-detail/${r.id}`}>查看</a>
      </Fragment>
    ),
  },
];

@connect(({ tradeManage, loading }) => ({
  data: tradeManage.data,
  loading: loading.models.tradeManage,
}))
export default class TableList extends PureComponent {
  state = {
    // selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tradeManage/fetch',
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
      page: pagination.current,
      page_size: pagination.pageSize,
      ...formValues,
      // ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'tradeManage/fetch',
      payload: params,
    });
  }

  handleSearch = (values) => {
    const { dispatch } = this.props;
    // console.log(values);
    dispatch({
      type: 'tradeManage/fetch',
      payload: values,
    });
  }

  handleExportSVG = (values) => {
    const { dispatch } = this.props;
    // console.log(values);
    dispatch({
      type: 'tradeManage/exportSVG',
      payload: values
    });
  }

  render() {
    const { data: { list, pagination, complaint_count }, loading, dispatch } = this.props;

    return (
      <PageHeaderLayout title="交易管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} complaint_count={complaint_count} onExportSVG={this.handleExportSVG} />
        </Card>
        <div className={styles.tableList}>
          <Card
            bordered={false}
          >
            <Table
              loading={loading}
              rowKey={record => record.id}
              dataSource={list}
              scroll={{ x: 1500 }}
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
