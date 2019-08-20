<template>
  <div style="background-color:#F0F0F0 ">
    <van-nav-bar title="设置" left-arrow @click-left="onClickBack" />

    <div class="pt10">
      <div class="van-cell van-cell--clickable van-coupon-cell">
        <div class="van-cell__title">
          <span>帐号与安全</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </div>

    <div class="pt10">
      <div class="van-cell van-cell--clickable van-coupon-cell">
        <div class="van-cell__title">
          <span>新消息提醒</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable van-coupon-cell">
        <div class="van-cell__title">
          <span>帮助与反馈</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </div>

    <div class="pt10">
      <div class="van-cell van-cell--clickable van-coupon-cell">
        <div class="van-cell__title">
          <span>关于智维通</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </div>
    <div class="pt10">
      <div class="van-cell van-cell--clickable van-coupon-cell" @click="logLout">
        <div class="van-cell__title center">
          <span>退出账号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import Storage from '@/utils/storages.js';
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
};
export default {
  props: {},
  data() {
    return {
      name: '你好哈',
      enabledtitle: 12,
      items: [
        {
          name: '工作状态',
          pathname: 'workstate',
          icon: 'icon-daqiakaoqin'
        },
        {
          name: '排班表',
          pathname: 'dutyManagement',
          icon: 'icon-zhibanguanli1'
        },
        {
          name: '任务记录',
          pathname: 'dutySettings',
          icon: 'icon-zhibanshezhi1'
        },
        {
          name: '任务统计',
          pathname: 'personalRating',
          icon: 'icon-dengji'
        },
        {
          name: '通讯录',
          pathname: 'integral',
          icon: ' icon-jifen-copy'
        },
        {
          name: '设置',
          pathname: 'callCenter',
          icon: 'icon-kefu'
        }
      ]
    };
  },
  computed: {},
  created() {

  },
  mounted() {

  },
  watch: {},
  methods: {
    topath(path) {
      console.log(path);
      if (path) {
        this.$router.push({ path: path });
      }
    },
    onClickBack() {
      this.$router.go(-1)
    },
    // 退出登录
    logLout() {
      Dialog.confirm({
        title: '确认退出该账号？',
        message: ''
      }).then(() => {
        console.log('退出登录 :');
        Storage.removeStorage();
        this.$router.push({
          name: 'login'
        });
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.van-cell--center {
  height: 100px;
}
.van-cell--clickable {
  height: 50px;
  font-size: 17px;
}

.mine_content .mine_list:nth-child(4) {
  margin-bottom: 10px;
  border: none;
}

.mine_content .mine_list:nth-child(6) {
  margin-bottom: 10px;
  border: none;
}

.mine_content .mine_list:nth-child(9) {
  margin-bottom: 10px;
  border: none;
}

.mine_content .mine_list:nth-child(13) {
  margin-bottom: 10px;
  border: none;
}

.mine_content {
  padding-bottom: 70px;
}
.van-cell__title,
.van-cell__value {
  line-height: 29.8px;
}
</style>
