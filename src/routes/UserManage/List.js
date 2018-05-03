import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card } from 'antd';
import { Link, routerRedux } from 'dva/router';
import CustomTable from '../../components/CustomTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SearchForm from './SearchForm';
import { isBlank, getUrlParams } from '../../utils/utils';
import styles from './List.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const columns = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: '100',
    // render: (val, r) => <Link to={`/user-detail/${r.id}`}>{val}</Link>
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: '100',
    render: (val, r) => <Link to={`/user-detail/${r.id}`}>{val}</Link>
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
    render: val => <span>{!isBlank(val) ? CONFIG.auth_status[val] : '-'}</span>
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: '80',
  }, {
    title: '更新时间',
    dataIndex: 'update_time',
    width: '80',
  }, {
    title: '国家',
    dataIndex: 'country',
    width: '100',
    render: val => <span>{!isBlank(val) ? CONFIG.countries[val] : '-'}</span>
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
  constructor(props) {
    super(props);
    const search = getUrlParams(this.props.location.search);
    this.state = {
      selectedRows: [],
      formValues: {},
      checkingUser: search.checkingUser
    };
  }


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManage/fetch',
      payload: {},
    });
    dispatch({
      type: 'userManage/fetchPendingCount',
      payload: {},
    });
  }

  handlePendingReview = () => {
    const { dispatch } = this.props;
    this.isSearchPending = true;
    dispatch({
      type: 'userManage/fetchPendingCount',
      payload: {},
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

    dispatch({
      type: 'userManage/fetch',
      payload: params,
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleShowCheckUser = () => {
    const { dispatch } = this.props;
    const { pathname } = this.props.location;
    dispatch(routerRedux.replace(`${pathname}?checkingUser=true`));
    this.setState({
      checkingUser: true
    });
    this.handleSearch({ status: [1] });
  }

  handleSearch = (values) => {
    const { pathname } = this.props.location;
    const { dispatch } = this.props;
    if (!(values.status && !!~values.status.indexOf(1))) {
      dispatch(routerRedux.replace(`${pathname}`));
      this.setState({
        checkingUser: false
      });
    }
    this.setState({
      formValues: values,
    });

    let params = {};
    if (!isBlank(values.name)) {
      params = { ...params, name: values.name };
    }
    if (!isBlank(values.country)) {
      params = { ...params, country: values.country };
    }
    if (values.createdDt && values.createdDt.length > 1) {
      params = { ...params, begin_time: moment(values.createdDt[0]).format('YYYY-MM-DD HH:mm:ss'), end_time: moment(values.createdDt[1]).format('YYYY-MM-DD HH:mm:ss') };
    }
    if (values.status && values.status.length > 0) {
      params = { ...params, auth_status: values.status.join() };
    }

    this.setState({
      formValues: params,
    });

    dispatch({
      type: 'userManage/fetch',
      payload: params,
    });
  }

  render() {
    const { user: { data }, loading } = this.props;
    const { selectedRows, checkingUser } = this.state;

    return (
      <PageHeaderLayout title="用户管理">
        <Card>
          <SearchForm onSearch={this.handleSearch} onShowPend={this.handleShowCheckUser} checkingUser={checkingUser} {...this.props} />
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
