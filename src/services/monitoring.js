import request from '../api/ajax.js'

// 报警管理
/**
 *加载报警信息
 * @param : 文件信息
 */
export function getAlarmList(params) {
  return request.postJson('/api/safeManage/appAlarm/getAlarmList', params)
}
/**
 *根据报警id获取报警详情
 * @param : 文件信息
 */
export function getAlarmDetail(params) {
  return request.get('/api/safeManage/alarm/getAlarmDetail', params)
}
/**
 *忽略报警工单
 * @param : 文件信息
 */
export function delAlarm(params) {
  return request.postJson('/api/safeManage/alarm/editAlarm', params);
}
/**
 *转工单
 * @param : 文件信息
 */
export function autoBill(params) {
  return request.postJson('/api/safeManage/alarm/autoBill', params)
}

// 电梯监控
/**
 *获取电梯示意图和运行数据
 * @param : 文件信息
 */
export function sketchMap(params) {
  return request.get('/api/safeManage/elevator/sketchMap' + '/' + params)
}
/**
 *获取电梯摄像头视频
 * @param : 文件信息
 */
export function getVideoUrl(params) {
  return request.get('/api/video/elevator/getVideoUrlByM3u8', params)
}
/**
 *获取电梯详情
 * @param : 文件信息
 */
export function getDetail(params) {
  return request.get('/api/safeManage/elevator/getDetail', params)
}
/**
 *获取视频监控设备列表
 * @param : 设备类型(1:供配电,2:给排水,3:空调)
 */
export function videoMonitorArray(params) {
  return request.basePost('/api/system-setting/videoMonitor/getArray', params)
}
/**
 * 视频监控地址
 * @param {*} params
 */
export function videoMonitorUrl(params) {
  return request.get('/api/video/push/getM3u8VideoUrl', params)
}
