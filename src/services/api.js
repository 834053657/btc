import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeSubmitFormMsg(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function queryConfigs(params) {
  return request(`/btcm/admin/defines?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/btcm/admin/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function fakeForget(params) {
  return request('/api/forget', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getCaptcha(params) {
  return request(`/btcm/admin/captcha?${stringify(params)}`);
  // return request(`http://47.52.250.12:9090/get_captcha?r=${stringify(params)}`);
}

export async function queryUser2(params) {
  return request(`/api/user?${stringify(params)}`);
}

export async function queryUser(params) {
  return request(`/btcm/users?${stringify(params)}`);
}

export async function queryPendingUserCount(params) {
  return request(`/btcm/users/auth_count?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params) {
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryAd(params) {
  return request(`/btcm/ads?${stringify(params)}`);
}

export async function queryAdDtl(params) {
  return request(`/btcm/ads/${params.id}`);
}

export async function queryAdOrders(params) {
  return request(`/btcm/ads/${params.id}/orders`);
}

export async function cancelAd(params) {
  return request(`/btcm/ads/${params.id}/status`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryTrade(params) {
  return request(`/btcm/trades?${stringify(params)}`);
}

export async function exportTrade(params) {
  return `/btcm/trades/export?${stringify(params)}`;
}

export async function removeTrade(params) {
  return request('/api/trade', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTrade(params) {
  return request('/api/trade', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryTransfer(params) {
  return request(`/btcm/transfers?${stringify(params)}`);
}

export async function exportTransfer(params) {
  return `/btcm/transfers/export?${stringify(params)}`;
}

export async function removeTransfer(params) {
  return request('/api/transfer', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTransfer(params) {
  return request('/api/transfers', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryUserDtl(params) {
  return request(`/btcm/users/${params.id}`);
}

export async function fakeIDNo(params) {
  return request(`/btcm/users/${params.id}/citizen_id`, {
    method: 'POST',
    body: params,
  });
}

export async function fakeAuthResult(params) {
  return request(`/btcm/users/${params.id}/auth`, {
    method: 'POST',
    body: params,
  });
}

export async function queryUserLog(params) {
  return request(`/api/userLog?${stringify(params)}`);
}
