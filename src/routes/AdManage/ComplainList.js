import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Table, Divider, Modal, Button, message } from 'antd';
import { Link } from 'dva/router';
import classNames from 'classnames';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './ComplainList.less';

const size = 'large';
const clsString = classNames(styles.detail, 'horizontal', {}, {
  [styles.small]: size === 'small',
  [styles.large]: size === 'large',
});

@connect(({ adManage, loading }) => ({
  data: adManage.rptData,
  loading: loading.effects['adManage/fetchRpt'],
}))
export default class BasicList extends PureComponent {
  state = {
    visible: false,
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
        width: 100,
      },
      {
        title: '举报内容',
        dataIndex: 'type',
        width: 180,
        render: val => <span>{val ? CONFIG.ad_type[val] : '-'}</span>
      },
      {
        title: '处理状态',
        dataIndex: 'country',
        width: 100,
        render: val => <span>{val ? CONFIG.countries[val] : '-'}</span>
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 180,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '更新时间',
        dataIndex: 'last_modify_time',
        width: 180,
        render: val => <span>{val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>,
      },
      {
        title: '操作人',
        dataIndex: 'operator_name',
        width: 100
      },
      {
        title: '操作',
        render: r => (
          <Fragment>
            <Link to={`/ad-detail/${r.id}`}>查看</Link>
            <Divider type="vertical" />
            <a onClick={() => this.setState({ visible: r.id })}>处理</a>
          </Fragment>
        )
      },
    ]
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'adManage/fetchRpt',
      payload: {}
    });
  }

  // status 举报状态：1：取消广告、2：驳回
  handleChangeAd = (status) => {
    this.props.dispatch({
      type: 'adManage/cancel',
      payload: { id: this.state.visible, status },
      callback: () => {
        this.handleClose();
        message.success('操作成功');
      }
    });
  }

  handleClose= () => {
    this.setState({ visible: false });
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
              columns={this.state.columns}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
          <Modal
            title="处理举报"
            visible={!!this.state.visible}
            onCancel={this.handleClose}
            footer={[
              <Button key="cancel" onClick={() => this.handleChangeAd(1)}>取消广告</Button>,
              <Button key="back" type="primary" onClick={() => this.handleChangeAd(2)}>驳回</Button>,
            ]}
          >
            <p>若举报内容属实，可操作取消广告，若举报内容不属实，请处理驳回</p>
          </Modal>
        </div>
      </PageHeaderLayout>
    );
  }
}
