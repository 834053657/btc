import { getUrlParams } from './utils';

// mock adListDataSource
let adListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  adListDataSource.push({
    key: i,
    adNo: `ad0000${i}`,
    tradeType: '买入',
    price: Math.ceil(Math.random() * 100),
    status: Math.floor(Math.random() * 10) % 3,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

export function getAd(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...adListDataSource];

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

export function postAd(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      adListDataSource = adListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      // const i = Math.ceil(Math.random() * 10000);
      // tableListDataSource.unshift({
      //   key: i,
      //   href: 'https://ant.design',
      //   avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
      //   no: `TradeCode ${i}`,
      //   title: `一个任务名称 ${i}`,
      //   owner: '曲丽丽',
      //   description,
      //   callNo: Math.floor(Math.random() * 1000),
      //   status: Math.floor(Math.random() * 10) % 2,
      //   updatedAt: new Date(),
      //   createdAt: new Date(),
      //   progress: Math.ceil(Math.random() * 100),
      // });
      break;
    default:
      break;
  }

  const result = {
    list: adListDataSource,
    pagination: {
      total: adListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getAd,
  postAd,
};
