import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

// function initTotalList(columns) {
//   const totalList = [];
//   columns.forEach((column) => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

class CustomTable extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   const { columns } = props;
  //   const needTotalList = initTotalList(columns);

  //   this.state = {
  //     selectedRowKeys: [],
  //     needTotalList,
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   // clean state
  //   if (nextProps.selectedRows.length === 0) {
  //     const needTotalList = initTotalList(nextProps.columns);
  //     this.setState({
  //       selectedRowKeys: [],
  //       needTotalList,
  //     });
  //   }
  // }

  // handleRowSelectChange = (selectedRowKeys, selectedRows) => {
  //   let needTotalList = [...this.state.needTotalList];
  //   needTotalList = needTotalList.map((item) => {
  //     return {
  //       ...item,
  //       total: selectedRows.reduce((sum, val) => {
  //         return sum + parseFloat(val[item.dataIndex], 10);
  //       }, 0),
  //     };
  //   });

  //   if (this.props.onSelectRow) {
  //     this.props.onSelectRow(selectedRows);
  //   }

  //   this.setState({ selectedRowKeys, needTotalList });
  // }

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  // cleanSelectedKeys = () => {
  //   this.handleRowSelectChange([], []);
  // }

  render() {
    // const { selectedRowKeys, needTotalList } = this.state;
    const { data: { list, pagination }, loading, columns, scroll } = this.props;

    const paginationProps = {
      // showSizeChanger: true,
      // showQuickJumper: true,
      ...pagination
    };

    return (
      <div className={styles.customTable}>
        <div className={styles.tableAlert} />
        <Table
          loading={loading}
          rowKey={record => record.id}
          dataSource={list}
          scroll={scroll}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CustomTable;
