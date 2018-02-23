import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Table } from 'antd';
import { Link } from 'dva/router';
import classNames from 'classnames';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ComplainList.less';

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    render: val => <span>{val ? CONFIG.ad_type[val] : '-'}</span>
  },
  {
    title: '国家',
    dataIndex: 'country',
    width: 80,
    render: val => <span>{val ? CONFIG.countries[val] : '-'}</span>
  },
  {
    title: '创建人',
    dataIndex: 'name',
    width: 100,
    render: (val, row) => <Link to={`/user-detail/${row.uid}`}>{val}</Link>
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    render: val => <span>{val ? CONFIG.ad_status[val] : '-'}</span>
  },
  {
    title: '付款方式',
    dataIndex: 'payments',
    width: 100,
  },
  {
    title: '交易价格',
    dataIndex: 'price',
    align: 'right',
    width: 100,
    render: val => <span>{val ? `${val}BTC` : '-'}</span>
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    width: 100,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
  {
    title: '更新时间',
    dataIndex: 'last_modify_time',
    width: 100,
    render: val => <span>{val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
  },
  {
    title: '操作人',
    dataIndex: 'operator_name',
    width: 100
  },
  {
    title: '操作',
    width: '100',
    render: r => <a href={`/#/ad-detail/${r.id}`}>查看</a>,
  },
];
const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});

@connect(({ adManage, loading }) => ({
  data: adManage.data,
  loading: loading.models.list,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'adManage/fetch'
    });
  }

  render() {
    const { data: { list, pagination }, loading } = this.props;
    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '广告管理', href: '/ad-manage' }, { title: '被举报广告' }];

    return (
      <PageHeaderLayout title="被举报广告" breadcrumbList={breadcrumbList}>
        <div className={clsString}>
          <Card bordered={false} >
            <a className={styles.bt_btn} href="/#/ad-manage">返回</a>
          </Card>
          <Card>
            <Table
              loading={loading}
              rowKey={record => record.id}
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
