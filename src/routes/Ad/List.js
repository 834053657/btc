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
const statusMap = ['pending', 'processing', 'completed'];
const status = ['正常', '冻结', '被举报'];
const columns = [
  {
    title: '广告编号',
    sorter: true,
    dataIndex: 'adNo',
    width: '15%',
  },
  {
    title: '交易类型',
    sorter: true,
    dataIndex: 'tradeType',
    width: '15%',
  },
  {
    title: '价格/BTC',
    sorter: true,
    dataIndex: 'price',
    align: 'right',
    width: '15%',
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
    width: '15%',
    render(val) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    sorter: true,
    width: '20%',
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '操作',
    width: '20%',
    render: () => (
      <Fragment>
        <a href="">冻结</a>
        <Divider type="vertical" />
        <a href="">取消</a>
      </Fragment>
    ),
  },
];

@connect(({ ad, loading }) => ({
  rule: ad,
  loading: loading.models.ad,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ad/fetch',
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
      type: 'ad/fetch',
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
      type: 'ad/fetch',
      payload: values,
    });
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    return (
      <PageHeaderLayout title="广告管理">
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
