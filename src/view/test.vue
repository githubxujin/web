<template>
  <div>
    <van-button type="default">创建表</van-button>
  </div>
</template>

<script>
import { Button } from 'vant';
import request from '../api/ajax.js';
import { AddRepairBill } from '../mock/mock-data'
export default {
  name: 'TestVue',
  data() {
    return {};
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const params = `{\"STATE\":\"A\",\"FAULT_INFO\":\"桌子坏了\",\"FAULT_TYPE\":\"GZDT01\",\"BUILD_ID\":\"440300A002\",\"BUILD_NAME\":\"深圳投资大厦\",\"ADDRESS\":\"深圳市福田区深南大道  [4009]号\",\"REPORT_USER_NAME\":\"报修人A\",\"PHONE\":\"15243641131\",
 \"ORG_CODE\":\"4403Z01\",\"REPORT_USER_ID\":\"4403010\",\"DEPT_CODE\":\"WXB\",\"CREATE_USER_ID\":\"4403010\",\"REPORT_USER_CODE\":\"4403010\",\"REPORT_ROLE_ID\":\"U011\",\"IS_URGENCY\":0,\"REPORT_TIME\":\"2018-10-11 17:01:35\"}`;
      const res = AddRepairBill(params);
      console.log('res1 :', res);
    }
  }
};
</script>

<style scoped></style>
