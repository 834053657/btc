import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import classNames from 'classnames';
import moment from 'moment';
import { map, delay } from 'lodash';
import { Button, Card, Row, Col, Modal, Input, Tabs, Icon, List, Avatar, Badge, Spin, Upload } from 'antd';
import { Link } from 'dva/router';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ComplainForm from './ComplainForm';
import { getAuthority } from '../../utils/authority';
import styles from './IM.less';

const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const { Description } = DescriptionList;

@connect(({ tradeIm, loading }) => ({
  tradeIm,
  loading: loading.effects['tradeIm/connectSuccess'],
}))
export default class TradeIM extends PureComponent {
  state = {
    maxImg: null
  };

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;

    dispatch({
      type: 'tradeIm/fetch',
      payload: { id },
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.tradeIm.historyList !== newProps.tradeIm.historyList) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'tradeIm/Unmount' });
  }

  handleKeyPress = (e) => {
    if (e.shiftKey && e.charCode === 13) {
      return true;
    }
    if (e.charCode === 13) {
      this.handleSubmit();
      e.preventDefault();
      return false;
    }
  }

  msgClick = (e) => {
    if (e.target.nodeName === 'IMG') {
      this.setState({
        maxImg: e.target.src
      });
    }
  }

  handleSubmit = (e) => {
    const { message } = this.state;
    console.log(message);

    if (message) {
      this.props.dispatch({
        type: 'tradeIm/sendMessage',
        payload: { message, messagetype: 1 },
        callback: () => this.setState({ message: '' })
      });
    }
  }

  scrollToBottom = () => {
    delay(() => {
      const messagesContainer = findDOMNode(this.messagesBox);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
  }

  handlerChangeMsg = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  handlerUpload(event) {
    if (event.file.status !== 'done' || !event.file.response) {
      return false;
    }
    let fileType = event.file.type ? event.file.type.toLowerCase() : '';
    let content = null;
    if (~fileType.indexOf('image/')) {
      let url = event.file.response.data.url;
      content = `<img class="btc-chat-img" src=${url} alt=${event.file.name}/>`;
    } else {
      let url = event.file.response.Data.url;
      content = `<a href=${url} download=${event.file.name}>${event.file.name}</a>`;
    }
    this.props.dispatch({
      type: 'tradeIm/sendMessage',
      payload: { message: content, messagetype: 1 }
    });
  }

  render() {
    console.log(getAuthority());
    const { maxImg } = this.state;
    const { id: uid, name, token } = getAuthority() || {};
    const { tradeIm: { orderInfo, historyList, roomInfo }, loading, match: { params: { id } } } = this.props;
    const { detail = {}, prices = {}, traders = {} } = orderInfo;
    const { dealer = {}, owner = {} } = traders || {};
    const { membersonlinestatus = {} } = roomInfo || {};
    const breadcrumbList = [{ title: '首页', href: '/' }, { title: '订单管理', href: '/trade-manage' }, { title: '处理申诉' }];
    console.log('historyList', historyList);
    const props = {
      name: 'uploadfile',
      action: CONFIG.upload_url,
      showUploadList: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      data: (file) => {
        return {
          username: name,
          token,
          filename: file.name,
        };
      },
      accept: 'image/png, image/jpeg, image/gif',
      onChange: this.handlerUpload,
    };
    return (
      <PageHeaderLayout breadcrumbList={breadcrumbList}>
        <Spin spinning={loading}>
          <Card
            bodyStyle={{ padding: 0 }}
            className={styles.chat_card}
            title={(
              <div>
                <Badge style={{ marginRight: 15 }} status={membersonlinestatus[dealer.name] && !!membersonlinestatus[dealer.name].status ? 'success' : 'default'} text={dealer.name} />
                <Badge style={{ marginRight: 15 }} status={membersonlinestatus[owner.name] && !!membersonlinestatus[owner.name].status ? 'success' : 'default'} text={owner.name} />
                <Badge status="success" text={name} />
              </div>
            )}
            extra={!detail.operator_id && detail.order_status === 'COMPLAINT' ? <ComplainForm title="申诉处理" id={id} /> : <Button>已处理</Button>}
          >
            <Row className={styles.card_body}>
              <Col md={14} className={styles.left}>
                <div ref={el => this.messagesBox = el} className={styles.chat_history}>
                  {
                    historyList.length > 0 ?
                      (
                        <List
                          size="large"
                          rowKey="messageid"
                          loading={loading}
                          dataSource={historyList}
                          renderItem={item => (
                            <List.Item>
                              {
                                item.messagetype !== 1 ?
                                  <div style={{ textAlign: 'center', flex: 1, color: '#1890ff' }}>{item.message}</div>
                                  :
                                  (
                                    <List.Item.Meta
                                      className={item.sender === name ? styles.myMessageBox : null}
                                      avatar={<Avatar style={{ backgroundColor: '#f5222d', color: '#fff', verticalAlign: 'middle' }} size="large" >{item.sender.substr(0, 1)}</Avatar>}
                                      title={item.sender}
                                      description={(
                                        <div>
                                          <div className={styles.messageContent} onClick={this.msgClick} dangerouslySetInnerHTML={{ __html: item.message }} />
                                          <div className={styles.sendtime}>{moment(item.sendtime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                                        </div>
                                      )}
                                    />
                                  )
                              }
                            </List.Item>
                          )}
                        />
                      )
                      :
                      null
                  }
                </div>
                <div className={styles.chat_message_box}>
                  <div className={styles.chat_tools}>
                    {/* <Icon type="smile-o" style={{ fontSize: 18, marginRight: 15 }} /> */}
                    <Upload {...props}>
                      <Icon type="picture" style={{ fontSize: 18 }} />
                    </Upload>
                  </div>
                  <TextArea value={this.state.message} onChange={this.handlerChangeMsg} rows={4} placeholder="请按回车键发送消息" onKeyPress={this.handleKeyPress} />
                </div>
              </Col>
              <Col md={10} className={styles.right}>
                <Tabs defaultActiveKey="1" >
                  <TabPane tab="订单信息" key="1" className={styles.tabs_content}>
                    <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                      <Description term="订单号">{detail.order_id}</Description>
                      <Description term="订单状态">{detail.order_status ? CONFIG.trade_status[detail.order_status] : '-'}</Description>
                      <Link to={`/trade-detail/${this.props.match.params.id}`}>查看订单详情</Link>
                    </DescriptionList>
                  </TabPane>
                  <TabPane tab="买方信息" key="2" className={styles.tabs_content} >
                    <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                      <Description term={`买方 ${owner.id === detail.owner_id ? '（广告主）' : '（发起人）'}`}>{owner.name}</Description>
                      <Description term="认证等级">{ CONFIG.auth_level[owner.auth_level] || '-'} </Description>
                      <Description term="交易量">{owner.trade_amount} </Description>
                      <Description term="好评率">{owner.good_rating_ratio} </Description>
                    </DescriptionList>
                  </TabPane>
                  <TabPane tab="卖方信息" key="3" className={styles.tabs_content} >
                    <DescriptionList size="small" style={{ marginBottom: 32 }} col="1" >
                      <Description term={`卖方${dealer.id === detail.owner_id ? '（广告主）' : '（发起人）'}`}>{dealer.name}</Description>
                      <Description term="认证等级">{CONFIG.auth_level[dealer.auth_level] || '-'} </Description>
                      <Description term="交易量">{dealer.trade_amount} </Description>
                      <Description term="好评率">{dealer.good_rating_ratio} </Description>
                    </DescriptionList>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
          <Modal
            visible={!!maxImg}
            footer={null}
            onCancel={() => this.setState({ maxImg: false })}
          >
            <div className="maxImg">
              {maxImg && <img src={maxImg} alt="img" />}
            </div>
          </Modal>
        </Spin>
      </PageHeaderLayout>
    );
  }
}
