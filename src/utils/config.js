let upload_url = 'http://47.52.250.12:8099/upload';
// let im_http_url = 'http://47.52.250.12:8099';

const api_url_prod = 'http://47.52.250.12:19091';
const api_url_test = 'http://47.52.250.12:19091';
const api_url_dev = 'http://47.52.250.12:19091';

const socket_chat_path_dev = 'http://47.52.250.12:8098';
const socket_chat_path_test = 'http://47.52.250.12:8098';
const socket_chat_path_prod = 'http://chat.utomarket.com:8171';

const msg_path_dev = 'http://47.52.250.12:8160';
const msg_path_test = 'http://47.52.250.12:8160';
const msg_path_prod = 'https://api.utomarket.com:8160';

let base_url = api_url_prod;
let web_name = '乌托市场管理系统';
let im_url = socket_chat_path_prod;
let base_im_url = msg_path_prod;

if (__KG_API_ENV__ === 'dev') {
  base_url = api_url_dev;
  im_url = socket_chat_path_dev;
  base_im_url = msg_path_dev;
  web_name += '(DEV)';
} else if (__KG_API_ENV__ === 'test') {
  base_url = api_url_test;
  im_url = socket_chat_path_test;
  base_im_url = msg_path_test;
  web_name += '(TEST)';
}

export default {
  base_url,
  base_im_url,
  upload_url,
  web_name,
  message_url: {
    im_url
  },
  ad_status: {},
  ad_type: {},
  announcement_status: {},
  auth_level: {},
  auth_status: {},
  countries: {},
  pay_methods: {},
  tansfer_audit_status: {},
  trade_status: {},
  trade_type: {},
  transfer_direction: {},
  transfer_type: {},
  card_type: {},
  accept_money: {},
  reporting_ad_status: {},
  note_types: {
    1: '聊天消息',
    2: '【订单】买家已付款，请确认收款后再释放托管的比特币',
    3: '【订单】交易关闭，买家取消订单',
    4: '【订单】支付超时，关闭订单',
    5: '【订单】交易成功,卖家已释放托管，请耐心等候比特币到账',
    6: '【订单】有新交易评价',
    7: '客服介入申述',
    8: '已释放比特币，订单已完成，如有问题请联系客服热线400XXXXX',
    9: '订单已取消，如有问题请联系客服热线400XXXXX',
    10: '公告',
  },
};
