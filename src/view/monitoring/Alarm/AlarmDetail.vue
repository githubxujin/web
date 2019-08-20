<template>
  <div>
    <div class="header">
      <navBar title="报警详情"></navBar>
    </div>
    <div class="alarm-detail">
      <div class="detail">
        <div class="alarm-title">报警信息</div>
        <p>
          <span class="desc">报警编号:</span>
          <span>{{alarmInfo.alarmConditionId}}</span>
        </p>
        <p>
          <span class="desc">报警名称:</span>
          <span>{{alarmInfo.alarmName}}</span>
        </p>
        <p>
          <span class="desc">报警设备:</span>
          <span>{{alarmInfo.deviceName}}</span>
        </p>
        <p>
          <span class="desc">报警位置:</span>
          <span>{{alarmInfo.alarmLocation}}</span>
        </p>
        <p>
          <span class="desc">报警级别:</span>
          <span
            v-html="alarmInfo.alarmLevel==1?'一级':(alarmInfo.alarmLevel==2?'二级':(alarmInfo.alarmLevel==3?'三级':(alarmInfo.alarmLevel==4?'四级':'五级')))"
          ></span>
        </p>
        <p>
          <span class="desc">报警系统:</span>
          <span v-show="alarmInfo.alarmType==1">供配电系统</span>
          <span v-show="alarmInfo.alarmType==2">给排水系统</span>
          <span v-show="alarmInfo.alarmType==3">能耗系统</span>
          <span v-show="alarmInfo.alarmType==4">电梯系统</span>
          <span v-show="alarmInfo.alarmType==5">空调系统</span>
        </p>
        <p>
          <span class="desc">报警时间:</span>
          <span>{{alarmInfo.alarmTime}}</span>
        </p>
        <p>
          <span class="desc">报警状态:</span>
          <span v-show="alarmInfo.status==0" style="color:#cc0000">待确认</span>
          <span v-show="alarmInfo.status==2">处理中</span>
          <span v-show="alarmInfo.status==3">已恢复</span>
          <span v-show="alarmInfo.status==1">已忽略</span>
        </p>
      </div>
    </div>
    <div class="handle-process box-size" v-show="alarmInfo.status==0&&$store.getters.getUserInfo.roleType==1">
      <span @click="ignore">忽略</span>
      <span @click="turnOrder">转工单</span>
    </div>
    <!-- 选派人员弹框 -->
    <van-popup v-model="showList" position="bottom" :style="{ height: '80%',width:'100%'}">
      <div class="listContain">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell clickable @click="checkPersonnel">
              <div class="List">
                <span>杨周</span>
                <span>空闲</span>
                <span>维修部</span>
              </div>
              <van-radio slot="right-icon" name="1" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { getAlarmDetail, delAlarm } from '@/services/monitoring'
import navBar from '@/components/common/NavBar.vue'
export default {
  components: { navBar },
  data() {
    return {
      alarmInfo: {},
      id: '',
      showList: false,
      radio: ''
    }
  },
  mounted() {
    this.getAlarmDetail();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getAlarmDetail() {
      this.id = this.$route.params.id;
      getAlarmDetail({ alarmId: this.id }).then(res => {
        if (res.code == 200) {
          this.alarmInfo = res.data
        } else {
          this.$toast(res.msg)
        }
      })
    },
    // 忽略工单
    ignore() {
      delAlarm({ id: this.id, status: 1 }).then(res => {
        if (res.code == 200) {
          this.$toast('忽略工单成功');
          this.$router.push({ name: 'alarmManagement' })
        }
      })
    },
    // 转工单
    turnOrder() {
      this.showList = true;
    },
    checkPersonnel() {
      this.radio = '1';
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom:10px;
  i,
  span {
    font-size: 18px;
  }
}
.alarm-detail {
  width: 100%;
  height: 100%;
  .detail {
    width: 100%;
    padding: 0px 15px;
    color:$titleColor;
    background-color: #fff;
    box-sizing: border-box;
    .alarm-title {
      height:36px;
      line-height:36px;
      font-weight:600;
      font-size:15px;
      border-bottom:1px solid $bgGrayColor;
    }
    p {
      line-height: 40px;
      font-size:14px;
      .desc {
        margin-right: 20px;
      }
    }
  }
}
.handle-process {
  width: 100%;
  position: fixed;
  bottom: 0px;
  height: 64px;
  line-height: 64px;
  padding:0px 16px;
  font-size:16px;
  text-align: center;
  background-color: #fff;
  span {
    display: inline-block;
    &:first-child {
      width:30%;
      color:$primaryColor;
    }
    &:last-child {
      width: 70%;
      height:43px;
      line-height:43px;
      background-color: $primaryColor;
      border-radius:4px;
      color: #fff;
    }
  }
}
.List {
  width: 100%;
  span {
    display: inline-block;
    width: 20%;
  }
}
</style>

