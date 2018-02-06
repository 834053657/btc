import { getUrlParams } from './utils';

// mock userListDataSource
let userListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  userListDataSource.push({
    key: i,
    id: i,
    userId: `uid ${i}`,
    email: 'test@gmail.com',
    country: '中国',
    userName: '曲丽丽',
    remark: 'C1认证通过',
    mobile: '13900000087',
    status: Math.floor(Math.random() * 10) % 4,
    createdDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updatedDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
  /*userListDataSource.push({
    id: i,
    userNo: `uid ${i}`,
    title: `一个任务名称 ${i}`,
    email: 'test@gmail.com',
    country: '中国',
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 3,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });*/
}

// mock userLogListDataSource
let userLogListDataSource = [];
for (let i = 0; i < 6; i += 1) {
  userLogListDataSource.push({
    id: i,
    reason: '---',
    remark: 'passsssss',
    updatedDate: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    updatedBy: 'admin',
  });
}

export function getUser(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...userListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getUserDtl(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...userListDataSource];

  if (params.id) {
    dataSource = dataSource.filter(data => (data.id == params.id));
  }
  let result = [];
  if(dataSource.length > 0)
    result = dataSource[0];

  result = {
    user_id: 'U000001',
    user_name: '张三',
    country: '中国',
    language: '中文',
    timezone: '+8',
    mobile: '13900000008',
    email: 'zhangsan@xxx.com',
    trade_volume: '10 BT',
    trade_completed_count: 18,
    trade_partner_count: 15,
    praise_rate: '80%',
    trusted_number: 10,
    shielded_number: 3,
    first_trade_datetime: '2017-07-06 11:30:09',
    created_datetime: '2017-06-06 11:30:09',
    updated_datetime: '2017-09-06 08:23:08',
    last_login_datetime: '2018-02-06 08:02:11',
    portrait_url: 'http://p.3761.com/pic/17431406596747.jpg',
    id_image_1: "http://upload.mnw.cn/2017/0122/1485050987244.jpg",
    id_image_2: "https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=db7e343dcd8065386fe7ac41f6b4ca21/8694a4c27d1ed21b46999f96aa6eddc451da3f74.jpg"
    //id_image_2: "https://t12.baidu.com/it/u=1660230893,551764805&fm=170&s=16A2D2001C52CDC85EA989DB030000B3&w=500&h=297&img.JPEG"
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function getUserLog(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...userLogListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postUser(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      userListDataSource = userListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        id: i,
        href: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: userListDataSource,
    pagination: {
      total: userListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getUser,
  getUserDtl,
  getUserLog,
  postUser,
};
