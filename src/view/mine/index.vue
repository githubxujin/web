<template>
  <div>
    <div
      class="van-cell van-cell--center van-cell--borderless van-contact-card van-contact-card--edit"
    >
      <i>
      <div class="van-image van-image--round" style="width:52px; height: 52px;">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img" style="object-fit: cover;overflow: hidden;
    border-radius: 50%;"></div>
    </i>
      <div class="van-cell__value van-cell__value--alone van-contact-card__value">
        <div style="font-size: 20px;height:30px;">张三&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<van-tag round type="primary">空闲</van-tag></div>
        <div>帐号：13000000000</div>
      </div>
      <!--<van-button type="default">打卡</van-button>-->
      <i class="van-icon van-icon-arrow van-cell__right-icon" @click="topath('personalinfo')"></i>
    </div>
<div style=" height:10px; background-color:#F3F4F8"></div>
    <div
      class="van-cell van-cell--clickable van-coupon-cell"
      v-for="(item,index) in items"
      :key="index"
      @click="topath(item.pathname)"
    ><i :class="'iconfont '+item.icon" :style="'color:'+item.color"></i>&nbsp;&nbsp;
      <div class="van-cell__title">
        <span>{{item.name}}</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon" ></i>
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
          icon: 'iconiconpaibanbiao',
            color:'#F29659'
        },
          {
              name: '值班考勤',
              pathname: 'attendance',
              icon: 'iconiconkaoqinzhiban',
              color:'#F29659'
          },
        {
          name: '排班表',
          pathname: 'duty-management',
          icon: 'icon-zhibanguanli1',
            icon: 'iconiconpaibanbiao',
            color:'#F29659'
        },
        {
          name: '任务记录',
          pathname: 'taskrecord',
          icon: 'iconiconrenwujilu',
            color:'#56C4A5'
        },
        {
          name: '任务统计',
          pathname: 'task-statistics',
            icon: 'iconiconrenwutongji',
            color:'#82D679'
        },
        {
          name: '通讯录',
          pathname: 'addressbook',
          icon: 'iconicontongxunlu',
            color:'#6BB5FF'
        },
        {
          name: '设置',
          pathname: 'setting',
          icon: 'iconiconshezhi',
            color:'#56C4A5'
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
     // if (path && path != 'workstate') {
        this.$router.push({ path: path });
     // }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.van-cell--center {
  height: 127px;
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
.normal-btn {
  display: inline-block;
  width: 50px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.van-contact-card::before {
  display: none;
}
</style>
