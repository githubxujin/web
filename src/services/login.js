import request from '../api/ajax.js';

/**
 * 登录
 * @param : 用户信息
 */
export function login(params) {
  return request.postJson('/api/system-setting/index/login', params);
}
/**
 * 获取验证码
 * @param : 用户信息
 */
export function getVcode(params) {
  return request.post('/api/web/index/sendSms', params);
}
/**
 * 提交验证码
 * @param : 用户信息
 */
export function sendVcode(params) {
  return request.post('/api/web/index/sendSms', params);
}

