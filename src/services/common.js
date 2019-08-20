import request from '../api/ajax.js';
/**
 * 上传图片
 * @param : 文件信息
 */
export function uploadByBase64(params) {
  return request.postJson('/api/system-setting/uploadByBase64', params);
}

/**
 * 完工
 * @param : 文件信息
 */
export function finishBill(params) {
  return request.postJson('/api/maintainManage/repairBill/finish', params);
}
