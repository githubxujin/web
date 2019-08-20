<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickBack" />
    <div class="van-cell van-cell--clickable van-coupon-cell" style="height:70px">
      <div class="van-cell__title" style="font-size: 25px; margin-top:15px">
        <span>头像</span>
      </div>   <div class="van-image van-image--round" style="width:52px; height: 52px;">
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img" style="object-fit: cover;overflow: hidden;
    border-radius: 50%;"></div>
      <i class="van-icon van-icon-arrow van-cell__right-icon" style="padding-top:15px">


      </i>
    </div>

    <div class="van-cell van-cell--clickable van-coupon-cell">
      <div class="van-cell__title">
        <span>姓名</span>
      </div>MR.yang
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>
    <div class="van-cell van-cell--clickable van-coupon-cell">
      <div class="van-cell__title">
        <span>电话</span>
      </div>15999534339
      <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
    </div>

    <div class="van-cell van-cell--clickable van-coupon-cell">
      <div class="van-cell__title">
        <span>门店</span>
      </div>
      <i class="van-icon van-cell__right-icon">深圳民治天虹商场</i>
    </div>

    <div class="van-cell van-cell--clickable van-coupon-cell">
      <div class="van-cell__title">
        <span>职位</span>
      </div>
      <i class="van-icon van-cell__right-icon">机电维修工</i>
    </div>

    <div class="van-cell van-cell--clickable van-coupon-cell">
      <div class="van-cell__title">
        <span>部门</span>
      </div>
      <i class="van-icon van-cell__right-icon">电工班</i>
    </div>
  </div>
</template>

<script>
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
</style>
