import request from '../api/ajax.js'
/**
 * 工单列表请求
 * @param : 分页
 */
export function getRepairList(params) {
  return request.post('/api/maintainManage/repairBill/getRepairList', params)
}
