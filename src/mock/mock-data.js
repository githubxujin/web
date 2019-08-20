import SmpWebSql from '@/utils/websql.js';
import { async } from 'q';

var _database = new SmpWebSql();

// 生成一个GUID（取16位）伪随机数
function newGuid() {
  var guid = '';
  for (var i = 1; i <= 16; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if (i == 8 || i == 12) guid += '-';
  }
  return guid;
}
// 报修 AddRepairBill tb_repairbill_g
// {\"STATE\":\"A\",\"FAULT_INFO\":\"桌子坏了\",\"FAULT_TYPE\":\"GZDT01\",\"BUILD_ID\":\"440300A002\",\"BUILD_NAME\":\"深圳投资大厦\",\"ADDRESS\":\"深圳市福田区深南大道  [4009]号\",\"REPORT_USER_NAME\":\"报修人A\",\"PHONE\":\"15243641131\",
// \"ORG_CODE\":\"4403Z01\",\"REPORT_USER_ID\":\"4403010\",\"DEPT_CODE\":\"WXB\",\"CREATE_USER_ID\":\"4403010\",\"REPORT_USER_CODE\":\"4403010\",\"REPORT_ROLE_ID\":\"U011\",\"IS_URGENCY\":0,\"REPORT_TIME\":\"2018-10-11 17:01:35\"}"
var AddRepairBill = async function(options) {
  console.log('options :', options);
  var _body = JSON.parse(options);
  var no = newGuid();
  console.log('no:' + no);
  const obj = {
    NO: no,
    ORG_CODE: _body.ORG_CODE,
    EQT_WORK_ID: '0',
    IS_URGENCY: _body.IS_URGENCY,
    STATE: _body.STATE,
    REPORT_USER_CODE: _body.REPORT_USER_CODE,
    CREATE_USER_ID: _body.CREATE_USER_ID,
    REPORT_USER_NAME: _body.REPORT_USER_NAME,
    REPORT_ROLE_ID: _body.REPORT_ROLE_ID,
    PHONE: _body.PHONE,
    DEPT_CODE: _body.DEPT_CODE,
    FAULT_INFO: _body.FAULT_INFO,
    ADDRESS: _body.ADDRESS,
    SOURCE: 'C',
    FAULT_TYPE: _body.FAULT_TYPE,
    LABOR_COST: 0,
    PART_COST: 0,
    SUMMARY: null,
    RECEIVE_TYPE: 0,
    BOOK_TIME: null,
    EQ_ID: null,
    EQP_NAME: null,
    ACCEPT_USER_ID: '1',
    SIGN_TIME: null,
    ACCEPT_TIME: null,
    DISPATCH_USER_ID: null,
    FINISH_SIGN: null,
    FINISH_TIME: null,
    FINISH_INFO: null,
    DISPATCH_TIME: null,
    NEED_HELP: false,
    NEED_DISPATCH: false,
    HELP_SEND_USER_ID: null,
    HELP_SEND_TIME: null,
    CONFIRM_USER_ID: null,
    CONFIRM_TIME: null,
    CONFIRM_STATUS: 0,
    CONFIRM_SIGN: null,
    REPORT_TIME: _body.REPORT_TIME,
    PRESS_NUM: 0,
    PRESS_FIRST_TIME: '2018-10-11T15:40:40',
    PRESS_LAST_TIME: '2018-10-11T15:40:40',
    MEMO: null,
    DEPT_CODE_NAME: '',
    FAULT_NAME: 'cc',
    REPAIR_USER_NAME: null,
    REPAIR_DEPT_NAME: null,
    MONEY: 2,
    HOURS: 1,
    IS_WAITING: 0,
    OTHER_DEV_NAME: null,
    BUILD_ID: _body.BUILD_ID,
    LIMIT_TIME: _body.LIMIT_TIME || null,
    BUILD_NAME: _body.BUILD_NAME,
    DIST_ID: '440303',
    IsOverTime: 0,
    sys_updatetime: new Date().toLocaleString()
  };
  console.log('obj:' + JSON.stringify(obj));
  const my = await _database.add('tb_repairbill_g', [obj]);
  console.log('my :', my);
  // _database.add('tb_repairbill_g', [obj]).then(res => {
  //   console.log('res :', res);
  // });
};
export { AddRepairBill };
