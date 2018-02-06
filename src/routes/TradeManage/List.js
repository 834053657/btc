import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Badge,
} from 'antd';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';

import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = [1, 2, 3];
const status = ['未付款', '申诉中', '已处理'];
const columns = [
  {
    title: '交易单号',
    sorter: true,
    dataIndex: 'tradeNo',
    width: '8%',
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'createdAt',
    align: 'right',
    width: '11%',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '交易类型',
    sorter: true,
    dataIndex: 'tradeType',
    width: '8%',
  },
  {
    title: '交易对象',
    sorter: true,
    dataIndex: 'trader',
    width: '7%',
  },
  {
    title: '交易状态',
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
    width: '9%',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '法币',
    sorter: true,
    dataIndex: 'currency',
    width: '10%',
  },
  {
    title: '交易金额',
    sorter: true,
    dataIndex: 'amount',
    align: 'right',
    width: '10%',
  },
  {
    title: '交易费',
    sorter: true,
    align: 'right',
    dataIndex: 'tradeFee',
    width: '10%',
  },
  {
    title: '总BTC',
    sorter: true,
    dataIndex: 'totalBTC',
    width: '10%',
  },
  {
    title: '汇率',
    sorter: true,
    dataIndex: 'rate',
    width: '10%',
  },
  {
    title: '操作',
    width: '7%',
    render: () => (
      <Fragment>
        <a href="">取消</a>
      </Fragment>
    ),
  },
];

@connect(({ tradeManage, loading }) => ({
  trade: tradeManage,
  loading: loading.models.tradeManage,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'tradeManage/fetch',
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
      type: 'tradeManage/fetch',
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
      type: 'tradeManage/fetch',
      payload: values,
    });
  }

  render() {
    const { trade: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout title="转账管理">
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
