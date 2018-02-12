import mockjs from 'mockjs';
import {format, delay} from 'roadhog-api-doc';
import json2csv from 'json2csv';
import {getRule, postRule} from './mock/rule';
import {getUser, getUserDtl, getUserLog} from './mock/user';
import {getAd} from './mock/ad';
import {getTrade} from './mock/trade';
import {getTransfer} from './mock/transfer';
import {getActivities, getNotice, getFakeList} from './mock/api';
import {getFakeChartData} from './mock/chart';
import {imgMap} from './mock/utils';
import {getProfileBasicData} from './mock/profile';
import {getProfileAdvancedData} from './mock/profile';
import {getNotices} from './mock/notices';
import CONFIG from './src/utils/config'


// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  'GET /api/login/getCaptcha': (req, res) => {
    console.log(req, res);
    res.send({image: 'http://47.52.250.12:9090/get_captcha?r=' + req.query.r});
  },
  'GET /api/user': getUser,
  'GET /btcm/users': getUser,
  'GET /btcm/users/auth_count': (req, res) => {
    res.json(
    {
      code: 0,
      data: {auth_count: 8},
      msg: '',
    });
  },
  'GET /api/ad': getAd,
  'GET /api/trade': getTrade,
  'GET /api/transfer': getTransfer,
  'GET /api/getPendingTransferCount': (req, res) => {
    res.json({count: 16});
  },
  'GET /api/transferExportToCSV': getTransfer,
  /*'GET /api/transferExportToCSV': (req, res) => {
    const fields = ['carModel', 'price', 'colors'];
    const myCars = [
      {
        "carModel": "Audi",
        "price": 0,
        "colors": ["blue","green","yellow"]
      }, {
        "carModel": "BMW",
        "price": 15000,
        "colors": ["red","blue"]
      }, {
        "carModel": "Mercedes",
        "price": 20000,
        "colors": "yellow"
      }, {
        "carModel": "Porsche",
        "price": 30000,
        "colors": ["green","teal","aqua"]
      }
    ];
    const csv = json2csv(myCars, { fields, unwind: 'colors' });
    res.attachment('filename.csv');
    res.status(200).send(csv);
  },*/
  'GET /api/userDtl': getUserDtl,
  'GET /api/userLog': getUserLog,
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({message: 'Ok'});
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /btcm/admin/login': (req, res) => {
    const {password, userName, type} = req.body;
    if (password === '666666' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      code: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({status: 'ok', currentAuthority: 'user'});
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      'timestamp': 1513932555104,
      'status': 500,
      'error': 'error',
      'message': 'error',
      'path': '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      'timestamp': 1513932643431,
      'status': 404,
      'error': 'Not Found',
      'message': 'No message available',
      'path': '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      'timestamp': 1513932555104,
      'status': 403,
      'error': 'Unauthorized',
      'message': 'Unauthorized',
      'path': '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      'timestamp': 1513932555104,
      'status': 401,
      'error': 'Unauthorized',
      'message': 'Unauthorized',
      'path': '/base/category/list',
    });
  },
};
console.log(noProxy)

export default noProxy ? {
  //'GET /btcm/(.*)': CONFIG.base_url,
  '/btcm/users': CONFIG.base_url,
  'POST /btcm/admin/login': CONFIG.base_url,
  //"/*": CONFIG.base_url
} : delay(proxy, 1000);
